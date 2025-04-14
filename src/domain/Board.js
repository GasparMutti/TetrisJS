export class Board {
  constructor({rows, columns, emptyValue}) {
    this.rows = rows;
    this.columns = columns;
    this.emptyValue = emptyValue;
    this.matrix = this.createEmptyMatrix();
  }

  createEmptyMatrix() {
    const matrix = Array.from(
      {length: this.rows},
      this.createRow(this.emptyValue)
    );
    return matrix;
  }

  createRow(fillValue) {
    return Array(this.columns).fill(fillValue);
  }

  getCompletedRows() {
    const completedRows = [];

    this.matrix.forEach((row, rowIndex) => {
      if (this.isCompletedRow(row)) completedRows.push(rowIndex);
    });

    return completedRows.reverse();
  }

  isCompletedRow(row) {
    return row.every((block) => block !== this.emptyValue);
  }

  deleteCompletedRows(indexList) {
    indexList.forEach((indexRow, offset) => {
      this.matrix.splice(indexRow + offset, 1);
      this.matrix.unshift(this.createRow(this.emptyValue));
    });
  }

  hasCollision(piece) {
    return piece.matrix.some((row, rowIndex) => {
      return row.some((block, colIndex) => {
        if (block === this.emptyValue) return false;
        const position = {
          x: piece.position.x + colIndex,
          y: piece.position.y + rowIndex,
        };
        return !this.isInsideBoard(position) || !this.isEmptyBlock(position);
      });
    });
  }

  isInsideBoard(position) {
    return (
      position.y >= 0 &&
      position.y < this.rows &&
      position.x >= 0 &&
      position.x < this.columns
    );
  }

  isEmptyBlock(position) {
    return this.matrix[position.y]?.[position.x] === this.emptyValue;
  }

  placePiece(piece) {
    piece.matrix.forEach((row, rowIndex) => {
      row.forEach((block, colIndex) => {
        const position = {
          x: piece.position.x + colIndex,
          y: piece.position.y + rowIndex,
        };
        if (this.isInsideBoard(position) && block !== this.emptyValue) {
          this.matrix[position.y][position.x] = block;
        }
      });
    });
  }

  resetBoard() {
    this.matrix = this.createEmptyMatrix();
  }
}
