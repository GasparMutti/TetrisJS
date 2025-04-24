export class GameLoop {
  constructor({intervalSpeed = 0, eventBus}) {
    this.intervalSpeed = intervalSpeed;
    this.intervalId = null;
    this.eventBus = eventBus;
    this.registerEvents();
  }

  registerEvents() {
    this.eventBus.on(EVENTS.GAME_START, this.start.bind(this));
    this.eventBus.on(EVENTS.INPUT_PAUSE, this.togglePause.bind(this));
    this.eventBus.on(EVENTS.GAME_OVER, this.stop.bind(this));
    this.eventBus.on(EVENTS.GAME_RESET, this.stop.bind(this));
  }

  start() {
    this.eventBus.emit(EVENTS.GAME_STARTED);
    this.intervalId = setInterval(() => {
      this.eventBus.emit(EVENTS.INPUT_DOWN);
    }, this.intervalSpeed);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.eventBus.emit(EVENTS.GAME_PAUSED);
  }

  isRunning() {
    return this.intervalId !== null;
  }

  getIntervalSpeed() {
    return this.intervalSpeed;
  }

  setIntervalSpeed(intervalSpeed) {
    this.intervalSpeed = intervalSpeed;
    if (this.isRunning()) {
      this.stop();
      this.start();
    }
  }
}
