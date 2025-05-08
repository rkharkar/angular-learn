import { Message } from "../message/message.model";

export interface Thread {
  id: string;
  name: string | undefined;
  avatarSrc: string | undefined;
  messages: Message[];
}
