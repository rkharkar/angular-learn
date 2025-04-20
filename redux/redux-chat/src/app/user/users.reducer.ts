/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AppState } from '../app.reducer';
import { User } from './user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * This file describes the state concerning Users, how to modify it through
 * the reducer, and the selectors.
 */
export interface UsersState {
  currentUser: User | null;
};

const initialState: UsersState = {
  currentUser: null
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser(state: UsersState, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    }
  },
  selectors: {
    getCurrentUser: (state) => state.currentUser
  }
});

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;

export const { getCurrentUser } = usersSlice.getSelectors((state: AppState) => state.users);
