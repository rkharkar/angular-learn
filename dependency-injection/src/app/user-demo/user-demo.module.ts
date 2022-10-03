import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserService } from "../services/user.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService
  ],
  declarations: []
})
export class UserDemoModule {}
