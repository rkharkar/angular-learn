import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

/**
 * Message represents one message being sent in a Thread
 */
export interface Message {
  id?: string;
  sentAt?: string;
  isRead?: boolean;
  thread?: Thread;
  author: User | null;
  text: string;
}
