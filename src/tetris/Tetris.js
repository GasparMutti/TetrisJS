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
      ? this.eventBus.emit("tetris:lost")
      : this.eventBus.emit("piece:spawned");
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
      return this.eventBus.emit("piece:collision");
    }

    this.piece = newPiece;
    this.eventBus.emit("piece:moved");
  }

  dropPiece() {
    const newPiece = this.piece.clone();
    newPiece.move("down");

    if (this.board.hasCollision(newPiece)) {
      return this.mergePiece();
    }

    this.piece = newPiece;
    this.eventBus.emit("piece:moved");
  }

  mergePiece() {
    this.board.placePiece(this.piece);
    this.eventBus.emit("piece:merged");
    const completedRows = this.board.getCompletedRows();
    if (completedRows.length > 0) {
      this.eventBus.emit("rows:completed", completedRows);
    }
    this.spawnPiece();
  }

  rotatePiece() {
    const newPiece = this.piece.clone();
    newPiece.rotate();

    if (this.board.hasCollision(newPiece)) {
      return this.eventBus.emit("piece:collision");
    }

    this.piece = newPiece;
    this.eventBus.emit("piece:moved");
  }

  reset() {
    this.board.reset();
    this.piecesBag.fillBag();
    this.spawnPiece();
    this.eventBus.emit("tetris:reset");
  }
}
