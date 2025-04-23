import {PIECE_DIRECTIONS} from "../domain/entities/Piece";
import {EVENTS} from "../domain/events/events";

export class Tetris {
  constructor({game, eventBus}) {
    this.game = game;
    this.eventBus = eventBus;
    this.isGameOver = false;
    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(EVENTS.INPUT_RIGHT, () =>
      this.handleMove(PIECE_DIRECTIONS.RIGHT)
    );
    this.eventBus.on(EVENTS.INPUT_DOWN, this.dropPiece.bind(this));
    this.eventBus.on(EVENTS.INPUT_LEFT, () =>
      this.handleMove(PIECE_DIRECTIONS.LEFT)
    );
    this.eventBus.on(EVENTS.INPUT_ROTATE, () => this.handleRotate());
    this.eventBus.on(EVENTS.GAME_RESET, this.reset.bind(this));
  }

  dropPiece() {
    const pieceMoved = this.game.movePiece(PIECE_DIRECTIONS.DOWN);
    if (!pieceMoved) {
      this.game.placePiece();
      const completedRows = this.game.getCompletedRows();

      if (completedRows.length) {
        const beforeState = this.game.getState();
        this.game.board.deleteRows(completedRows);
        this.eventBus.emit(EVENTS.BOARD_DELETED_ROWS, {
          beforeState,
          afterState: this.game.getState(),
          completedRows,
        });
      }

      const pieceSpawned = this.game.spawnPiece();
      if (!pieceSpawned) {
        this.isGameOver = true;
        return this.eventBus.emit(EVENTS.GAME_OVER, this.game.getState());
      }
    }

    return this.eventBus.emit(EVENTS.GAME_UPDATED, this.game.getState());
  }

  handleMove(direction) {
    const pieceMoved = this.game.movePiece(direction);
    if (!pieceMoved) {
      return this.eventBus.emit(EVENTS.PIECE_COLLISION);
    }
    this.eventBus.emit(EVENTS.GAME_UPDATED, this.game.getState());
  }

  handleRotate() {
    const pieceRotated = this.game.rotatePiece();
    if (!pieceRotated) {
      return this.eventBus.emit(EVENTS.PIECE_COLLISION);
    }
    this.eventBus.emit(EVENTS.GAME_UPDATED, this.game.getState());
  }

  reset() {
    this.game.reset();
  }
}
