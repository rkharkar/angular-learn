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

class MessageActions {
  static addMessage(message: string): AddMessageAction {
    return {
      type: "ADD_MESSAGE",
      message
    };
  }

  static deleteMessage(index: number): DeleteMessageAction {
    return {
      type: "DELETE_MESSAGE",
      index
    };
  }
}

let store = new Store<AppState>(reducer, { messages: [] });
console.log(store.getState()); // -> { messages: [] }

store.dispatch(
  MessageActions.addMessage("Would you say the fringe was made of silk?")
);

store.dispatch(
  MessageActions.addMessage("Wouldnt have no other kind but silk")
);

store.dispatch(
  MessageActions.addMessage("Has it really got a team of snow white horses?")
);

console.log(store.getState());

store.dispatch(
  MessageActions.deleteMessage(1)
);

console.log(store.getState());

store.dispatch(
  MessageActions.deleteMessage(0)
);

console.log(store.getState());
