import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Thread } from "./thread.model";
import { ThreadActions } from "./threads.action";
import { uuid } from "../util/uuid";
import { Message } from "../message/message.model";

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId: string | null;
}

const initialState: ThreadsState = {
  ids: [],
  entities: {},
  currentThreadId: null
};

const threadsReducer = createReducer(
  initialState,
  on(ThreadActions.addThread, (state, { thread }) => {
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
  }),
  on(ThreadActions.addMessage, (state, { addMessage }) => {
    const { thread, message } = addMessage;

    const isRead = message.thread?.id === state.currentThreadId ?
      true : message.isRead;
    const newMessage = Object.assign({}, message, {
      isRead,
      id: uuid()
    });

    const oldThread = state.entities[thread.id];

    const newThread = Object.assign({}, oldThread, {
      messages: [...oldThread.messages, newMessage]
    });

    return {
      ids: state.ids,
      currentThreadId: state.currentThreadId,
      entities: Object.assign({}, state.entities, {
        [thread.id]: newThread
      })
    }
  }),
  on(ThreadActions.selectThread, (state, { thread }) => {
    const oldThread = state.entities[thread.id];

    const newMessages = oldThread.messages.map(
      (message) => Object.assign({}, message, { isRead: true })
    );

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
  })
);

export const threadsFeature = createFeature({
  name: "threads",
  reducer: threadsReducer,
  extraSelectors: ({ selectCurrentThreadId, selectEntities }) => {
    const selectAllThreads = createSelector(
      selectEntities,
      (entities) => {
        return Object.keys(entities)
          .map(threadId => entities[threadId]);
      }
    );

    const selectUnreadMessageCount = createSelector(
      selectAllThreads,
      (threads) => {
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
        );
      }
    );

    const selectCurrentThread = createSelector(
      selectCurrentThreadId,
      selectEntities,
      (threadId, entities) => entities[threadId!]
    );

    const selectAllMessages = createSelector(
      selectAllThreads,
      (threads) => {
        return threads
          .reduce(
            (messages: Message[], thread) => [...messages, ...thread.messages],
            []
          )
          .sort(
            (m1, m2) => m1.sentAt && m2.sentAt ?
              new Date(m1.sentAt).getTime() - new Date(m2.sentAt).getTime() :
              0
          );
      }
    );

    return {
      selectAllThreads,
      selectUnreadMessageCount,
      selectCurrentThread,
      selectAllMessages
    };
  }
});

export const {
  name,
  reducer,
  selectThreadsState,
  selectCurrentThreadId,
  selectIds,
  selectEntities,
  selectAllThreads,
  selectUnreadMessageCount,
  selectCurrentThread,
  selectAllMessages
} = threadsFeature;
