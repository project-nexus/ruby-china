
class PubSub {

  private _key: number;
  private _subscribers: {[name: string]: Function};

  constructor() {
    this._key = 0;
    this._subscribers = {};
  }

  subscribe(subscriber: Function) {
    this._subscribers[this._key] = subscriber;
    return this._key++;
  }

  unsubscribe(key: number) {
    delete this._subscribers[key];
  }

  unsubscribeAll() {
    this._subscribers = {};
  }

  publish(args: any) {
    for (const key in this._subscribers) {
      try {
        this._subscribers[key](args);
      } catch (e) {
        console.log("[PubSub] error: ", e);
      }
    }
  }
}