export const PIECE_DIRECTIONS = {
  RIGHT: "right",
  DOWN: "down",
  LEFT: "left",
};

export class Piece {
  constructor({id, name, color, matrix, position}) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.matrix = matrix;
    this.position = position;
  }

  move(direction) {
    switch (direction) {
      case PIECE_DIRECTIONS.RIGHT:
        this.position.x += 1;
        break;
      case PIECE_DIRECTIONS.DOWN:
        this.position.y += 1;
        break;
      case PIECE_DIRECTIONS.LEFT:
        this.position.x -= 1;
        break;
    }
  }

  rotate() {
    this.matrix = this.getRotatedMatrix(this.matrix);
  }

  getRotatedMatrix(matrix) {
    const rotatedMatrix = [];
    const matrixColumns = matrix[0]?.length;
    const matrixRows = matrix.length - 1;

    for (let indexColumn = 0; indexColumn < matrixColumns; indexColumn++) {
      const newRow = [];

      for (let indexRow = matrixRows; indexRow >= 0; indexRow--) {
        newRow.push(matrix[indexRow][indexColumn]);
      }

      rotatedMatrix.push(newRow);
    }

    return rotatedMatrix;
  }

  clone() {
    return new Piece({
      id: this.id,
      name: this.name,
      color: this.color,
      matrix: this.matrix.map((row) => [...row]),
      position: {...this.position},
    });
  }
}
