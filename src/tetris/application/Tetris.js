import {EVENTS} from "../domain/events/events.js";

export class Tetris {
  constructor({board, piecesBag, pieceFactory, eventBus}) {
    this.board = board;
    this.piecesBag = piecesBag;
    this.pieceFactory = pieceFactory;
    this.eventBus = eventBus;
    this.spawnPiece();
  }

  spawnPiece() {
    const piece = this.piecesBag.getPiece();
    const position = this.getStartPosition(piece.matrix);
    this.piece = this.pieceFactory.createPiece({
      ...piece,
      position,
    });

    this.board.hasCollision(this.piece)
      ? this.eventBus.emit(EVENTS.GAME_END)
      : this.eventBus.emit(EVENTS.PIECE_SPAWNED, this.getState());
  }

  getStartPosition(matrix) {
    const x = Math.floor(this.board.columns - matrix[0].length);
    const y = 0;
    return {x, y};
  }

  movePiece(direction) {
    if (direction === "down") {
      return this.dropPiece();
    }

    const newPiece = this.piece.clone();
    newPiece.move(direction);

    if (this.board.hasCollision(newPiece)) {
      return this.eventBus.emit(EVENTS.PIECE_COLLISION);
    }

    this.piece = newPiece;
    this.eventBus.emit(EVENTS.PIECE_MOVED, this.getState());
  }

  dropPiece() {
    const newPiece = this.piece.clone();
    newPiece.move("down");

    if (this.board.hasCollision(newPiece)) {
      return this.mergePiece();
    }

    this.piece = newPiece;
    this.eventBus.emit(EVENTS.PIECE_MOVED, this.getState());
  }

  mergePiece() {
    this.board.placePiece(this.piece);
    this.eventBus.emit(EVENTS.PIECE_MERGED, this.getState());
    const completedRows = this.board.getCompletedRows();
    if (completedRows.length > 0) {
      this.eventBus.emit(EVENTS.BOARD_COMPLETED_ROWS, completedRows);
    }
    this.spawnPiece();
  }

  rotatePiece() {
    const newPiece = this.piece.clone();
    newPiece.rotate();

    if (this.board.hasCollision(newPiece)) {
      return this.eventBus.emit(EVENTS.PIECE_COLLISION);
    }

    this.piece = newPiece;
    this.eventBus.emit(EVENTS.PIECE_MOVED);
  }

  reset() {
    this.board.reset();
    this.piecesBag.fillBag();
    this.spawnPiece();
    this.eventBus.emit(EVENTS.GAME_RESET);
  }
}
