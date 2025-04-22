export class Game {
  constructor({board, piecesBag}) {
    this.board = board;
    this.piecesBag = piecesBag;
    this.spawnPiece();
  }

  spawnPiece() {
    this.piece = this.piecesBag.getPiece();
    if (this.board.hasCollision(this.piece)) return false;
    return true;
  }

  movePieceRight() {
    const newPiece = this.piece.clone();
    newPiece.moveRight();

    if (this.board.hasCollision(newPiece)) return false;
    this.piece = newPiece;
    return true;
  }

  movePieceDown() {
    const newPiece = this.piece.clone();
    newPiece.moveDown();

    if (this.board.hasCollision(newPiece)) return false;
    this.piece = newPiece;
    return true;
  }

  movePieceLeft() {
    const newPiece = this.piece.clone();
    newPiece.moveLeft();

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

  reset() {
    this.board.reset();
    this.piecesBag.fillBag();
    this.spawnPiece();
  }
}
