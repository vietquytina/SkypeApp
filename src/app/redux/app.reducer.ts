import { Reducer } from 'redux';

import { IAppState } from './app.state';
import { QUERY_FRIENDS, QUERY_MESSAGES, SAVE_CURRENT_USER, SELECTED_FRIEND_CHANGED } from '../constants/app.action';

const initialState: IAppState = { messages: { }, friends: [], user: null, selectedFriend: null, changedProperty: '' };

export const reducerProcessing: Reducer<IAppState> = (state: IAppState = initialState, action) => {
    switch (action.type) {
        case QUERY_FRIENDS:
            state.friends = action.data;
            state.changedProperty = 'friends';
            break;
        case QUERY_MESSAGES:
            state.messages['1'] = action.data;
            state.changedProperty = 'messages';
            break;
        case SAVE_CURRENT_USER:
            state.user = action.data;
            state.changedProperty = 'user';
            break;
        case SELECTED_FRIEND_CHANGED:
            state.selectedFriend = action.data;
            state.changedProperty = 'selectedFriend';
            break;
    }
    return state;
}