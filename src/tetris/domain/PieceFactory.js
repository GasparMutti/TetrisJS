import {Piece} from "./entities/Piece";

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
