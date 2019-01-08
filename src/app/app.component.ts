import { Component, Inject } from '@angular/core';

import { Store } from 'redux';

import { AppStore } from './redux/app.store';
import { IAppState } from './redux/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AppStore) private store: Store<IAppState>) {
  }
}