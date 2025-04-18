import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';

interface AppState {
  messages: string[];
}

const addMessage = createAction<string>("ADD_MESSAGE");
const deleteMessage = createAction<number>("DELETE_MESSAGE");

const initialState = { messages: [] } satisfies AppState as AppState;

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      return {
        messages: state.messages.concat(action.payload)
      };
    })
    .addCase(deleteMessage, (state, action) => {
      let idx = (action.payload);
      return {
        messages: [
          ...state.messages.slice(0, idx),
          ...state.messages.slice(idx + 1, state.messages.length)
        ]
      }
    })
});

let store = configureStore({reducer});
console.log(store.getState());

store.dispatch(addMessage("Would you say the fringe was made of silk?"));
store.dispatch(addMessage("Wouldnt have no other kind but silk"));
store.dispatch(addMessage("Has it really got a team of snow white horses?"));
console.log(store.getState());

store.dispatch(deleteMessage(1));
console.log(store.getState());

store.dispatch(deleteMessage(0));
console.log(store.getState());
