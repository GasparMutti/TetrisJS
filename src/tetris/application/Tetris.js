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
    this.eventBus.on(EVENTS.GAME_START, () => this.start.bind(this));
    this.eventBus.on(EVENTS.GAME_TICK, this.tick.bind(this));
    this.eventBus.on(EVENTS.INPUT_RIGHT, () =>
      this.handleMove(PIECE_DIRECTIONS.RIGHT)
    );
    this.eventBus.on(EVENTS.INPUT_DOWN, this.tick.bind(this));
    this.eventBus.on(EVENTS.INPUT_LEFT, () =>
      this.handleMove(PIECE_DIRECTIONS.LEFT)
    );
    this.eventBus.on(EVENTS.INPUT_ROTATE, () =>
      this.handleRotate(this.handleRotate())
    );
    this.eventBus.on(EVENTS.GAME_RESET, this.reset.bind(this));
  }

  tick() {
    const pieceMoved = this.game.movePiece(PIECE_DIRECTIONS.DOWN);
    if (!pieceMoved) {
      this.game.placePiece();
      const completedRows = this.game.board.getCompletedRows();
      if (completedRows.length > 0) {
        this.game.board.deleteRows(completedRows);
        const score = this.game.calculateScore(completedRows.length);
        this.game.setScore(this.game.getScore() + score);
        this.eventBus.emit(EVENTS.SCORE_UPDATED, this.game.getScore());
        this.eventBus.emit(EVENTS.BOARD_DELETED_ROWS, completedRows);
      }
      const newPiece = this.game.spawnPiece();
      if (!newPiece) {
        this.isGameOver = true;
        this.eventBus.emit(EVENTS.GAME_OVER, this.game.getState());
      }
      this.eventBus.emit(EVENTS.GAME_UPDATED, this.game.getState());
    }
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
