import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserDemoModule } from './user-demo/user-demo.module';
import { UserDemoInjectorComponent } from './user-demo/user-demo.injector.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDemoComponent } from './user-demo/user-demo.component';

const route: Routes = [
  {path: '', component: UserDemoComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserDemoInjectorComponent,
    UserDemoComponent
  ],
  imports: [
    BrowserModule,
    UserDemoModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
