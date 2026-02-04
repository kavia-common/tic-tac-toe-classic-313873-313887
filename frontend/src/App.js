import React, { useMemo, useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";

/**
 * PUBLIC_INTERFACE
 * App is the top-level component for the Tic Tac Toe game.
 * It owns game state (board, current player), computes win/draw status,
 * and renders the Board and controls.
 */
export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;

  const isBoardFull = squares.every((s) => s !== null);
  const isDraw = !winner && isBoardFull;
  const isGameOver = Boolean(winner) || isDraw;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "Draw — no winner";
    return `Current player: ${xIsNext ? "X" : "O"}`;
  }, [winner, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  function handleCellClick(index) {
    /** Handles a cell click, enforcing rules (no overwrite, lock after end). */
    if (isGameOver) return;
    if (squares[index] !== null) return;

    const next = squares.slice();
    next[index] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext((v) => !v);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /** Resets board and player turn to initial state (X starts). */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="app">
      <div className="appShell">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className={`status ${winner ? "status--winner" : isDraw ? "status--draw" : ""}`}>
            {statusText}
          </p>
        </header>

        <main className="main">
          <Board squares={squares} onCellClick={handleCellClick} winningLine={winningLine} />
        </main>

        <footer className="footer">
          <button className="button" type="button" onClick={handleRestart}>
            Restart
          </button>
        </footer>
      </div>
    </div>
  );
}
