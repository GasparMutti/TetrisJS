import {CollisionService} from "../../domain/services/CollisionService";

export class CollisionChecker extends CollisionService {
  constructor() {
    super();
  }

  hasCollision({board, piece}) {
    return piece.matrix.some((row, rowIndex) => {
      return row.some((block, colIndex) => {
        if (block === board.emptyValue) return false;
        const position = {
          x: piece.position.x + colIndex,
          y: piece.position.y + rowIndex,
        };
        return !board.isInsideBoard(position) || !board.isEmptyBlock(position);
      });
    });
  }
}
