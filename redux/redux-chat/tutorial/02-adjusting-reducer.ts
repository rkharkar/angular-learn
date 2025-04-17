interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T
}

const incrementAction: Action = { type: "INCREMENT" };
const decrementAction: Action = { type: "DECREMENT" };

const reducer: Reducer<number> = (state: number, action: Action) => {
  if (action.type === "INCREMENT") {
    return state + 1;
  }
  if (action.type === "DECREMENT") {
    return state - 1;
  }
  return state;
}

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));

console.log(reducer(100, decrementAction));
