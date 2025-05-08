import { createActionGroup, props } from "@ngrx/store";
import { User } from "./user.model";

export const UserActions = createActionGroup({
  source: "Chat app",
  events: {
    "Set Current User": props<{ user: User }>()
  }
});
