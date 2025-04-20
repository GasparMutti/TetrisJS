import PlacementService from "../../domain/services/PlacementService";

export class PiecePlacer extends PlacementService {
  constructor() {
    super();
  }

  placePiece({board, piece}) {
    piece.matrix.forEach((row, rowIndex) => {
      row.forEach((block, colIndex) => {
        const position = {
          x: piece.position.x + colIndex,
          y: piece.position.y + rowIndex,
        };
        if (board.isInsideBoard(position) && block !== board.emptyValue) {
          board.matrix[position.y][position.x] = piece.id;
        }
      });
    });
    return board;
  }
}
