/**
 * PUBLIC_INTERFACE
 * calculateWinner determines if there is a winner on the board.
 * @param {(string|null)[]} squares - Array of 9 values: "X", "O", or null.
 * @returns {{winner: "X"|"O", line: number[]} | null} Winner info or null if no winner.
 */
export function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }

  return null;
}
