import {EVENTS} from "../domain/events/events";

export class KeyboardController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.registerEvents();
  }

  registerEvents() {
    document.addEventListener("keydown", ({key}) => {
      const event = this.getEventByKey(key.toLowerCase());
      if (event) {
        this.eventBus.emit(event);
      }
    });
  }

  getEventByKey(key) {
    const eventsMap = {
      arrowup: EVENTS.INPUT_ROTATE,
      arrowright: EVENTS.INPUT_RIGHT,
      arrowdown: EVENTS.INPUT_DOWN,
      arrowleft: EVENTS.INPUT_LEFT,
      p: EVENTS.INPUT_PAUSE,
    };
    return eventsMap[key] ?? null;
  }
}
