interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action?: Action): T
}

const reducer: Reducer<number> = (state: number) => state;

console.log(reducer(0));
