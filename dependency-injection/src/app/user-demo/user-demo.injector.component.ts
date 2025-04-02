import { Component, Injector } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-injector-demo',
    templateUrl: './user-demo.component.html',
    styleUrls: ['./user-demo.component.css'],
    standalone: false
})
export class UserDemoInjectorComponent {
  userName: string;
  userService: UserService;

  constructor() {
    const injector: any = Injector.create({
      providers: [
        { provide: UserService, useClass: UserService }
      ]
    });

    this.userService = injector.get(UserService);
  }

  signIn(): void {
    this.userService.setUser({
      name: 'Nate Murray'
    });

    this.userName = this.userService.getUser().name;
    console.log('User name is: ', this.userName);
  }
}
