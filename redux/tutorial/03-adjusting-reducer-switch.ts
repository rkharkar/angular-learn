interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T
}

const incrementAction: Action = { type: "INCREMENT" };
const decrementAction: Action = { type: "DECREMENT" };
const unknownAction: Action = { type: "UNKNOWN" };

const reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));

console.log(reducer(100, decrementAction));

console.log(reducer(100, unknownAction));
