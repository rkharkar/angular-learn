/* tslint:disable:typedef */
import UsersReducer, {
  UsersState
} from './user/users.reducer';
export * from './user/users.reducer';
import ThreadsReducer, {
  ThreadsState
} from './thread/threads.reducer';
export * from './thread/threads.reducer';

export interface AppState {
 users: UsersState;
 threads: ThreadsState;
}

const rootReducer = {
 users: UsersReducer,
 threads: ThreadsReducer
};

export default rootReducer;
