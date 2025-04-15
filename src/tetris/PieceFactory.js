import {Piece} from "./Piece";

export class PieceFactory {
  constructor() {}

  createPiece({id, name, color, matrix, position}) {
    return new Piece({
      id,
      name,
      color,
      matrix,
      position,
    });
  }
}
