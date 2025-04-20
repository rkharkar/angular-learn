import * as Redux from 'redux';
import {
  addMessage,
  addThread,
  AppState,
  getAllMessages,
  selectThread,
  setCurrentUser
} from '../app.reducer';
import { uuid } from '../util/uuid';
import moment from 'moment';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

/**
 * ChatExampleData sets up the initial data for our chats as well as
 * configuring the "bots".
 */

// the person using the app is Juliet
const me: User = {
  id: uuid(),
  isClient: true, // <-- notice we're specifying the client as this User
  name: 'Juliet',
  avatarSrc: 'assets/images/avatars/female-avatar-1.png'
};

const ladycap: User = {
  id: uuid(),
  name: 'Lady Capulet',
  avatarSrc: 'assets/images/avatars/female-avatar-2.png'
};

const echo: User = {
  id: uuid(),
  name: 'Echo Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-1.png'
};

const rev: User = {
  id: uuid(),
  name: 'Reverse Bot',
  avatarSrc: 'assets/images/avatars/female-avatar-4.png'
};

const wait: User = {
  id: uuid(),
  name: 'Waiting Bot',
  avatarSrc: 'assets/images/avatars/male-avatar-2.png'
};

const tLadycap: Thread = {
  id: 'tLadycap',
  name: ladycap.name,
  avatarSrc: ladycap.avatarSrc,
  messages: []
};

const tEcho: Thread = {
  id: 'tEcho',
  name: echo.name,
  avatarSrc: echo.avatarSrc,
  messages: []
};

const tRev: Thread = {
  id: 'tRev',
  name: rev.name,
  avatarSrc: rev.avatarSrc,
  messages: []
};

const tWait: Thread = {
  id: 'tWait',
  name: wait.name,
  avatarSrc: wait.avatarSrc,
  messages: []
};

export function ChatExampleData(store: Redux.Store<AppState>) {

  // set the current User
  store.dispatch(setCurrentUser(me));

  // create a new thread and add messages
  store.dispatch(addThread(tLadycap));
  store.dispatch(addMessage({
    thread: tLadycap,
    message: {
      author: me,
      sentAt: moment().subtract(45, 'minutes').toString(),
      text: 'Yet let me weep for such a feeling loss.',
      thread: tLadycap
    }
  }));
  store.dispatch(addMessage({
    thread: tLadycap,
    message: {
      author: ladycap,
      sentAt: moment().subtract(20, 'minutes').toString(),
      text: 'So shall you feel the loss, but not the friend which you weep for.',
      thread: tLadycap
    }
  }));

  // create a few more threads
  store.dispatch(addThread(tEcho));
  store.dispatch(addMessage({
    thread: tEcho,
    message:{
      author: echo,
      sentAt: moment().subtract(1, 'minutes').toString(),
      text: 'I\'ll echo whatever you send me',
      thread: tEcho
    }
  }));

  store.dispatch(addThread(tRev));
  store.dispatch(addMessage({
    thread: tRev,
    message: {
      author: rev,
      sentAt: moment().subtract(3, 'minutes').toString(),
      text: 'I\'ll reverse whatever you send me',
      thread: tRev
    }
  }));

  store.dispatch(addThread(tWait));
  store.dispatch(addMessage({
    thread: tWait,
    message: {
      author: wait,
      sentAt: moment().subtract(4, 'minutes').toString(),
      text: `I\'ll wait however many seconds you send to me before responding.` +
        ` Try sending '3'`,
      thread: tWait
    }
  }));

  // select the first thread
  store.dispatch(selectThread(tLadycap));

  // Now we set up the "bots". We do this by watching for new messages and
  // depending on which thread the message was sent to, the bot will respond
  // in kind.

  const handledMessages: Record<string, boolean> = {};

  store.subscribe( () => {
    getAllMessages(store.getState())
      // bots only respond to messages sent by the user, so
      // only keep messages sent by the current user
      .filter(message => message.author!.id === me.id)
      .map(message => {

        // This is a bit of a hack and we're stretching the limits of a faux
        // chat app. Every time there is a new message, we only want to keep the
        // new ones. This is a case where some sort of queue would be a better
        // model
        if (!message.id) return;
        if (handledMessages.hasOwnProperty(message.id)) {
          return;
        }
        handledMessages[message.id] = true;

        switch (message.thread?.id) {
          case tEcho.id:
            // echo back the same message to the user
            store.dispatch(addMessage({
              thread: tEcho,
              message: {
                author: echo,
                text: message.text,
                thread: tEcho
              }
            }));

            break;
          case tRev.id:
            // echo back the message reveresed to the user
            store.dispatch(addMessage({
              thread: tRev,
              message: {
                author: rev,
                text: message.text.split('').reverse().join(''),
                thread: tRev
              }
            }));

            break;
          case tWait.id:
            let waitTime: number = parseInt(message.text, 10);
            let reply: string;

            if (isNaN(waitTime)) {
              waitTime = 0;
              reply = `I didn\'t understand "${message.text}". Try sending me a number`;
            } else {
              reply = `I waited ${waitTime} seconds to send you this.`;
            }

            setTimeout(
              () => {
                store.dispatch(addMessage({
                  thread: tWait,
                  message: {
                    author: wait,
                    text: reply,
                    thread: tWait
                  }
                }));
              },
              waitTime * 1000);

            break;
          default:
            break;
        }
      });
  });
}
