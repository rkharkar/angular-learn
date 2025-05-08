import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

export interface Message {
  id?: string;
  sentAt?: string;
  isRead?: boolean;
  thread?: Thread;
  author: User | null;
  text: string;
}
