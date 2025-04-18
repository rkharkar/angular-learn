import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from './app.store';
import { AppState } from './app.state';
import { decrementAction, incrementAction } from './counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  counter: number;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;
    this.counter = state.counter;
  }

  increment() {
    this.store.dispatch(incrementAction());
  }

  decrement() {
    this.store.dispatch(decrementAction());
  }
}
