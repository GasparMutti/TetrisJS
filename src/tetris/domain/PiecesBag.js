export class PiecesBag {
  constructor({board, pieces, pieceFactory}) {
    this.board = board;
    this.pieces = pieces;
    this.pieceFactory = pieceFactory;
    this.piecesBag = [];
  }

  getPiece() {
    if (this.piecesBag.length === 0) this.fillBag();
    const piece = this.piecesBag.pop();
    const position = this.getStartPosition(piece.matrix);
    return this.pieceFactory.create({...piece, position});
  }

  fillBag() {
    this.piecesBag = [...this.shuffle([...this.pieces])];
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getStartPosition(matrix) {
    const x = Math.floor((this.board.columns - matrix[0].length) / 2);
    const y = 0;
    return {x, y};
  }
}
