import { createFeature, createReducer, on } from "@ngrx/store";
import { UserActions } from "./users.action";
import { User } from "./user.model";

export interface UsersState {
  currentUser: User | null;
}

const initialState: UsersState = {
  currentUser: null
};

const usersReducer = createReducer(
  initialState,
  on(UserActions.setCurrentUser, (_state, { user }) => ({ currentUser: user }))
);

export const usersFeature = createFeature({
  name: "users",
  reducer: usersReducer
});

export const {
  name,
  reducer,
  selectUsersState,
  selectCurrentUser
} = usersFeature;
