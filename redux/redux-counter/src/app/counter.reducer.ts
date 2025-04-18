import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "./app.state";
import { decrementAction, incrementAction } from "./counter.actions";

const initialState = { counter: 0 } satisfies AppState as AppState;

const counterReducer = createReducer<AppState>(initialState, builder => {
  builder
    .addCase(incrementAction, (state: AppState) => {
      return { counter: state.counter + 1 };
    })
    .addCase(decrementAction, (state: AppState) => {
      return { counter: state.counter - 1};
    })
    .addDefaultCase((state: AppState) => {
      return { counter: state.counter };
    });
})

export { counterReducer }
