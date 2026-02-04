import React from "react";

/**
 * PUBLIC_INTERFACE
 * Cell is a single clickable square on the board.
 * @param {Object} props
 * @param {"X"|"O"|null} props.value - Current marker.
 * @param {()=>void} props.onClick - Click handler.
 * @param {boolean} props.highlight - Whether this cell is part of a winning line.
 * @param {number} props.index - Cell index (0..8) for aria-label.
 */
export default function Cell({ value, onClick, highlight, index }) {
  const isEmpty = value === null;

  return (
    <button
      type="button"
      className={`cell ${highlight ? "cell--highlight" : ""} ${!isEmpty ? "cell--filled" : ""}`}
      onClick={onClick}
      role="gridcell"
      aria-label={`Cell ${index + 1}${value ? `: ${value}` : ""}`}
    >
      <span className={`cellMark ${value === "X" ? "cellMark--x" : value === "O" ? "cellMark--o" : ""}`}>
        {value}
      </span>
    </button>
  );
}
