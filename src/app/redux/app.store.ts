import { InjectionToken } from '@angular/core';

import { createStore, Store, compose, StoreEnhancer } from 'redux';

import { IAppState } from './app.state';
import { reducerProcessing } from './app.reducer';

export const AppStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<IAppState> = window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

export function createAppStore(): Store<IAppState> {
    return createStore(reducerProcessing, compose(devtools));
}

export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];