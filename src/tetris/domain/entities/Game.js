export class Game {
  constructor({piecesBag, board, piece, score = 0}) {
    this.piecesBag = piecesBag;
    this.board = board;
    this.piece = piece ?? this.spawnPiece();
    this.score = score;
  }

  getState() {
    return {
      piece: this.piece,
      board: this.board,
      score: this.score,
    };
  }

  spawnPiece() {
    this.piece = this.piecesBag.getPiece();
    if (this.board.hasCollision(this.piece)) return false;
    return true;
  }

  movePiece(direction) {
    const newPiece = this.piece.clone();
    newPiece.move(direction);

    if (this.board.hasCollision(newPiece)) return false;
    this.piece = newPiece;
    return true;
  }

  rotatePiece() {
    const newPiece = this.piece.clone();
    newPiece.rotate();

    if (this.board.hasCollision(newPiece)) return false;
    this.piece = newPiece;
    return true;
  }

  placePiece() {
    if (this.board.hasCollision(this.piece)) return false;
    this.board.placePiece(this.piece);
    return true;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  calculateScore(deletedRows) {
    const scorePerRow = {
      1: 100,
      2: 300,
      3: 500,
      4: 800,
    };
    return scorePerRow[deletedRows] ?? 0;
  }

  resetScore() {
    this.score = 0;
  }

  reset() {
    this.piecesBag.fillBag();
    this.board.reset();
    this.spawnPiece();
    this.resetScore();
  }
}
