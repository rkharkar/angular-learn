import { UsersState } from "./user/users.reducer";

export interface AppState {
  users: UsersState;
  threads: Threads
}
