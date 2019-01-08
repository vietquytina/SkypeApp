import { Action, ActionCreator } from 'redux';

import { QUERY_FRIENDS, QUERY_MESSAGES } from '../constants/app.action';

export const queryFriends: ActionCreator<Action> = () => ({ type: QUERY_FRIENDS });
export const queryMessages: ActionCreator<Action> = () => ({ type: QUERY_MESSAGES });