import { FriendViewModel } from '../models/friend.viewmodel';
import { MessageViewModel } from '../models/message.viewmodel';
import { AccountViewModel } from '../models/account.viewmodel';

export interface IAppState {
    friends: FriendViewModel[];
    selectedFriend: FriendViewModel;
    messages: { [key: string] : MessageViewModel[]; }
    user: AccountViewModel;
    changedProperty: string;
}