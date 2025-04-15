import {Board} from "./tetris/Board";
import {COLUMNS, EMPTY_VALUE, PIECES, ROWS} from "./tetris/constants";
import {PieceFactory} from "./tetris/PieceFactory";
import {PiecesBag} from "./tetris/PiecesBag";
import {Tetris} from "./tetris/Tetris";

const board = new Board({
  columns: COLUMNS,
  rows: ROWS,
  emptyValue: EMPTY_VALUE,
});
const pieceFactory = new PieceFactory();
const piecesBag = new PiecesBag(PIECES);
const eventBus = new EventBus();
const tetris = new Tetris({board, piecesBag, pieceFactory, eventBus});

console.log(tetris);
