import React from "react";
import Cell from "./Cell";

/**
 * PUBLIC_INTERFACE
 * Board renders the 3x3 grid for Tic Tac Toe.
 * @param {Object} props
 * @param {(string|null)[]} props.squares - Array of 9 values: "X", "O", or null.
 * @param {(index:number)=>void} props.onCellClick - Click handler for a given cell.
 * @param {number[]|null} props.winningLine - Optional indices of the winning line.
 */
export default function Board({ squares, onCellClick, winningLine }) {
  const winningSet = new Set(winningLine ?? []);

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Cell
          key={idx}
          value={value}
          onClick={() => onCellClick(idx)}
          highlight={winningSet.has(idx)}
          index={idx}
        />
      ))}
    </div>
  );
}
