type Subscriber = (now: number) => void;

export default class Timer {
  subscriber: Subscriber | undefined;
  loopId: number | null = null;
  lastTick: number | undefined;

  loop = (time?: number) => {
    if (this.loopId) {
      if (this.subscriber) {
        if (time && this.lastTick) {
          this.subscriber(time - this.lastTick);
        }

        this.lastTick = time;
      }
    }

    this.loopId = requestAnimationFrame(this.loop);
  };

  start() {
    if (!this.loopId) {
      this.loop();
    }
  }

  stop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = null;
    }
  }

  subscribe(callback: Subscriber) {
    this.subscriber = callback;
  }

  unsubscribe(callback: Subscriber) {
    if (this.subscriber === callback) {
      this.subscriber = undefined;
    }
  }
}
