export class PiecesBag {
  constructor(pieces) {
    this.pieces = pieces;
    this.piecesBag = [];
  }

  getPiece() {
    if (this.piecesBag.length === 0) this.fillBag();
    return this.piecesBag.pop();
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
}
