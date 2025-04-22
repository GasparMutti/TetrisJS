export class Game {
  constructor({piecesBag, scoreService, board, piece}) {
    this.piecesBag = piecesBag;
    this.scoreService = scoreService;
    this.board = board;
    this.piece = piece ?? this.spawnPiece();
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

  reset() {
    this.piecesBag.fillBag();
    this.board.reset();
    this.spawnPiece();
    this.scoreService.resetScore();
  }
}
