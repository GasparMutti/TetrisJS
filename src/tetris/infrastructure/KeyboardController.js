import {EVENTS} from "../domain/events/events";

export class KeyboardController {
  constructor({eventsMap, eventBus}) {
    this.eventsMap = eventsMap ?? this.getDefaultEventsMap();
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
    return this.eventsMap[key] ?? null;
  }

  getDefaultEventsMap() {
    return {
      arrowup: EVENTS.INPUT_ROTATE,
      arrowright: EVENTS.INPUT_RIGHT,
      arrowdown: EVENTS.INPUT_DOWN,
      arrowleft: EVENTS.INPUT_LEFT,
      p: EVENTS.INPUT_PAUSE,
    };
  }
}
