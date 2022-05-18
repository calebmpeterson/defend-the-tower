type Subscriber = (now: number) => void;

export default class Timer {
  subscribers: Subscriber[] = [];
  loopId: number | null = null;
  lastTick: number | undefined;

  loop = (time?: number) => {
    if (this.loopId) {
      this.subscribers.forEach((callback) => {
        if (time && this.lastTick) {
          callback(time - this.lastTick);
        }

        this.lastTick = time;
      });
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
    if (this.subscribers.indexOf(callback) === -1)
      this.subscribers.push(callback);
  }

  unsubscribe(callback: Subscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== callback);
  }
}
