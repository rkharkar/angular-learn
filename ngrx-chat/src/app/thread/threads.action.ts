import { createActionGroup, props } from "@ngrx/store";
import { Message } from "../message/message.model";
import { Thread } from "./thread.model";

interface AddMessageAction {
  thread: Thread;
  message: Message;
}

export const ThreadActions = createActionGroup({
  source: "Chat app",
  events: {
    "Add Thread": props<{ thread: Thread }>(),
    "Add Message": props<{ addMessage: AddMessageAction }>(),
    "Select Thread": props<{ thread: Thread }>()
  }
})
