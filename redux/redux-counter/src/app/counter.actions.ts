import { createAction } from '@reduxjs/toolkit';

const incrementAction = createAction("INCREMENT");
const decrementAction = createAction("DECREMENT");

export { incrementAction, decrementAction }
