class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(listener);
  }

  emit(eventName, ...args) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  off(eventName, listener) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName);
      }
    }
  }
}

// export default EventEmitter;

// const emitter = new EventEmitter();

// const logData = (data) => console.log("Received:", data);
// emitter.on("data", logData);

// emitter.emit("data", { message: "Hello world!" });

// emitter.off("data", logData);
