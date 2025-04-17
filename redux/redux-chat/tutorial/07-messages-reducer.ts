import {
  Action,
  Reducer,
  Store
} from "./lib/miniRedux"

interface AppState {
  messages: String[];
}

interface AddMessageAction extends Action {
  message: string;
}

interface DeleteMessageAction extends Action {
  index: number;
}

let reducer: Reducer<AppState> = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        messages: state.messages.concat(
          (<AddMessageAction>action).message
        )
      };
    case "DELETE_MESSAGE":
      const index = (<DeleteMessageAction>action).index;
      return {
        messages: [
          ...state.messages.slice(0, index),
          ...state.messages.slice(index + 1, state.messages.length)
        ]
      };
    default:
      return state;
  }
};

let store = new Store<AppState>(reducer, { messages: [] });
console.log(store.getState()); // -> { messages: [] }

store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Would you say the fringe was made of silk?'
} as AddMessageAction);

store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Wouldnt have no other kind but silk'
} as AddMessageAction);

store.dispatch({
  type: 'ADD_MESSAGE',
  message: 'Has it really got a team of snow white horses?'
} as AddMessageAction);

console.log(store.getState());

store.dispatch({
  type: 'DELETE_MESSAGE',
  index: 1
} as DeleteMessageAction);

console.log(store.getState());

store.dispatch({
  type: 'DELETE_MESSAGE',
  index: 0
} as DeleteMessageAction);

console.log(store.getState());
