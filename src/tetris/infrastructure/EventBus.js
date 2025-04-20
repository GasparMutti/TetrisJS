export class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];

    this.events[event].push(callback);
  }

  emit(event, ...args) {
    if (!this.events || !this.events[event]) return;

    this.events[event].forEach((callback) => {
      callback(...args);
    });
  }

  off(event, callback) {
    if (!this.events || !this.events[event]) return;

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  clear(event) {
    if (!this.events || !this.events[event]) return;

    this.events[event] = [];
  }

  clearAll() {
    this.events = {};
  }
}
