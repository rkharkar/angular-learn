/* tslint:disable no-switch-case-fall-through */
import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../app.reducer';
import { uuid } from '../util/uuid';

/**
 * This file describes the state concerning Threads, how to modify them through
 * the reducer, and how to query the state via selectors.
 *
 * ThreadsState stores the list of Threads indexed by id in `entities`, as well
 * as a complete list of the ids in `ids`.
 *
 * We also store the id of the current thread so that we know what the user is
 * currently looking at - this is valuable for the unread messages count, for
 * instance.
 *
 * In this app, we store the Messages in their respective Thread and we don't
 * store the Messages apart from that Thread. In your app you may find it useful
 * to separate Messages into their own Messages reducer and keep only a list
 * of Message ids in your Threads.
 */
export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
};

const initialState: ThreadsState = {
  ids: [],
  entities: {}
};

/**
 * Define interfaces for the different possible actions on threads
 */
interface AddMessageAction {
  thread: Thread;
  message: Message;
}

/**
 * The `ThreadsReducer` describes how to modify the `ThreadsState` given a
 * particular action.
 */
const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    addThread(state: ThreadsState, action: PayloadAction<Thread>) {
      const thread = action.payload;

      if (state.ids.includes(thread.id)) {
        return state;
      }

      return {
        ids: [...state.ids, thread.id],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: thread
        })
      };
    },
    addMessage(state: ThreadsState, action: PayloadAction<AddMessageAction>) {
      const thread = action.payload.thread;
      const message = action.payload.message;

      const isRead = message.thread!.id === state.currentThreadId ?
                      true : message.isRead;
      const newMessage = Object.assign({}, message, {
        isRead: isRead,
        id: uuid()
      });

      const oldThread = state.entities[thread.id];

      const newThread = Object.assign({}, oldThread, {
        messages: [...oldThread.messages, newMessage]
      });

      return {
        ids: state.ids, // unchanged
        currentThreadId: state.currentThreadId, // unchanged
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    },
    selectThread(state: ThreadsState, action: PayloadAction<Thread>) {
      const thread = action.payload;
      const oldThread = state.entities[thread.id];

      const newMessages = oldThread.messages.map(
        (message) => Object.assign({}, message, { isRead: true }));

      const newThread = Object.assign({}, oldThread, {
        messages: newMessages
      });

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }
  },
  selectors: {
    getThreadsEntities: (state) => state.entities,
    getAllThreads: (state): Thread[] => {
      const entities = threadsSlice.getSelectors().getThreadsEntities(state);
      return Object.keys(entities)
        .map(threadId => entities[threadId]);
    },
    getUnreadMessagesCount: (state): number => {
      const threads = threadsSlice.getSelectors().getAllThreads(state);
      return threads.reduce(
        (unreadCount: number, thread: Thread) => {
          thread.messages.forEach((message: Message) => {
            if (!message.isRead) {
              ++unreadCount;
            }
          });
          return unreadCount;
        },
        0
      )
    },
    getCurrentThread: (state): Thread => {
      const entities = threadsSlice.getSelectors().getThreadsEntities(state);
      return entities[state.currentThreadId!];
    },
    getAllMessages: (state): Message[] => {
      const threads = threadsSlice.getSelectors().getAllThreads(state);
      return threads
        .reduce(
          (messages: Message[], thread) => [...messages, ...thread.messages],
          []
        )
        .sort((m1, m2) =>
          m1.sentAt && m2.sentAt ?
          new Date(m1.sentAt).getTime() - new Date(m2.sentAt).getTime() :
          0);
    }
  }
});

export const { addThread, addMessage, selectThread } = threadsSlice.actions;

export default threadsSlice.reducer;

export const {
  getThreadsEntities,
  getAllThreads,
  getUnreadMessagesCount,
  getCurrentThread,
  getAllMessages
} = threadsSlice.getSelectors((state: AppState) => state.threads);
