export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer<T> {
  (state: T, action: Action): T;
}

export interface ListenerCallback {
  (): void;
}

export interface UnsubscribeCallback {
  (): void;
}

export class Store<T> {
  private _state: T;
  private _listeners: ListenerCallback[] = [];

  constructor(private reducer: Reducer<T>, initialState: T) {
    this._state = initialState;
  }

  getState() {
    return this._state;
  }

  dispatch(action: Action) {
    this._state = this.reducer(this._state, action);
    this._listeners.forEach(listener => listener());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    }
  }
}
