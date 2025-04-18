export const ROWS = 20;
export const COLUMNS = 10;
export const EMPTY_VALUE = 0;
export const PIECES = [
  {
    id: 1,
    name: "Smashboy",
    color: "yellow",
    matrix: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    id: 2,
    name: "Hero",
    color: "cyan",
    matrix: [[1], [1], [1], [1]],
  },
  {
    id: 3,
    name: "Teewee",
    color: "purple",
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    id: 4,
    name: "Orange Ricky",
    color: "orange",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  {
    id: 5,
    name: "Blue Ricky",
    color: "blue",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
  {
    id: 6,
    name: "Rhode Island Z",
    color: "green",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    id: 7,
    name: "Cleveland Z",
    color: "red",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
];
export const PIECES_COLORS = PIECES.reduce((acc, piece) => {
  acc[piece.id] = piece.color;
  return acc;
}, {});
