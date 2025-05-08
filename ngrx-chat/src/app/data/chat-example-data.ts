import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";
import moment from "moment";
import { uuid } from "../util/uuid";
import { Store } from "@ngrx/store";
import { UserActions } from "../user/users.action";
import { ThreadActions } from "../thread/threads.action";
import { Injectable } from "@angular/core";
import { selectAllMessages } from "../thread/threads.reducer";
import { delay, distinctUntilChanged, map, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatExampleDataService {
  private handledMessages: Record<string, boolean> = {};
  private me: User = {
    id: uuid(),
    isClient: true,
    name: 'Juliet',
    avatarSrc: 'images/avatars/female-avatar-1.png'
  };

  private ladycap: User = {
    id: uuid(),
    name: 'Lady Capulet',
    avatarSrc: 'images/avatars/female-avatar-2.png'
  };

  private echo: User = {
    id: uuid(),
    name: 'Echo Bot',
    avatarSrc: 'images/avatars/male-avatar-1.png'
  };

  private rev: User = {
    id: uuid(),
    name: 'Reverse Bot',
    avatarSrc: 'images/avatars/female-avatar-4.png'
  };

  private wait: User = {
    id: uuid(),
    name: 'Waiting Bot',
    avatarSrc: 'images/avatars/male-avatar-2.png'
  };

  private tLadycap: Thread = {
    id: 'tLadycap',
    name: this.ladycap.name,
    avatarSrc: this.ladycap.avatarSrc,
    messages: []
  };

  private tEcho: Thread = {
    id: 'tEcho',
    name: this.echo.name,
    avatarSrc: this.echo.avatarSrc,
    messages: []
  };

  private tRev: Thread = {
    id: 'tRev',
    name: this.rev.name,
    avatarSrc: this.rev.avatarSrc,
    messages: []
  };

  private tWait: Thread = {
    id: 'tWait',
    name: this.wait.name,
    avatarSrc: this.wait.avatarSrc,
    messages: []
  };

  constructor(private store: Store) {}

  public initializeData(): void {
    this.store.dispatch(UserActions.setCurrentUser({ user: this.me }));

    this.store.dispatch(ThreadActions.addThread({ thread: this.tLadycap }));
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.tLadycap,
        message: {
          author: this.me,
          sentAt: moment().subtract(45, 'minutes').toString(),
          text: 'Yet let me weep for such a feeling loss.',
          thread: this.tLadycap
        }
      }
    }));
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.tLadycap,
        message: {
          author: this.ladycap,
          sentAt: moment().subtract(20, 'minutes').toString(),
          text: 'So shall you feel the loss, but not the friend which you weep for.',
          thread: this.tLadycap
        }
      }
    }));

    this.store.dispatch(ThreadActions.addThread({ thread: this.tEcho }));
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.tEcho,
        message: {
          author: this.echo,
          sentAt: moment().subtract(1, 'minutes').toString(),
          text: 'I\'ll echo whatever you send me',
          thread: this.tEcho
        }
      }
    }));

    this.store.dispatch(ThreadActions.addThread({ thread: this.tRev }));
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.tRev,
        message: {
          author: this.rev,
          sentAt: moment().subtract(3, 'minutes').toString(),
          text: 'I\'ll reverse whatever you send me',
          thread: this.tRev
        }
      }
    }));

    this.store.dispatch(ThreadActions.addThread({ thread: this.tWait }));
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.tWait,
        message: {
          author: this.wait,
          sentAt: moment().subtract(4, 'minutes').toString(),
          text: `I\'ll wait however many seconds you send to me before responding.` +
            ` Try sending '3'`,
          thread: this.tWait
        }
      }
    }));

    this.store.dispatch(ThreadActions.selectThread({ thread: this.tLadycap }));
    this.setupBots();
  }

  private setupBots(): void {
    this.store.select(selectAllMessages)
      .pipe(
        map(messages => messages.filter(message => message.author?.id === this.me.id)),
        distinctUntilChanged((prev, curr) => {
          return prev.length === curr.length &&
            prev.every(m => curr.some(cm => cm.id === m.id))
        })
      )
      .subscribe(messages => {
        messages.forEach(message => {
          if (!message.id || this.handledMessages[message.id]) return;
          this.handledMessages[message.id] = true;

          switch (message.thread?.id) {
            case this.tEcho.id:
              this.store.dispatch(ThreadActions.addMessage({
                addMessage: {
                  thread: this.tEcho,
                  message: {
                    author: this.echo,
                    text: message.text,
                    thread: this.tEcho
                  }
                }
              }));
              break;

            case this.tRev.id:
              this.store.dispatch(ThreadActions.addMessage({
                addMessage: {
                  thread: this.tRev,
                  message: {
                    author: this.rev,
                    text: message.text.split('').reverse().join(''),
                    thread: this.tRev
                  }
                }
              }));
              break;

            case this.tWait.id:
              const waitTime = parseInt(message.text, 10);
              let reply: string;

              if (isNaN(waitTime)) {
                reply = `I didn\'t understand "${message.text}". Try sending me a number`;
              } else {
                reply = `I waited ${waitTime} seconds to send you this.`;
              }

              of(reply).pipe(
                delay(isNaN(waitTime) ? 0 : waitTime)
              ).subscribe(() => {
                this.store.dispatch(ThreadActions.addMessage({
                  addMessage: {
                    thread: this.tWait,
                    message: {
                      author: this.wait,
                      text: reply,
                      thread: this.tWait
                    }
                  }
                }));
              });
              break;
          }
        })
      });
  }
}
