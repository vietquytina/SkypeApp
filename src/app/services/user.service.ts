import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataService } from './data.service';
import { AccountViewModel } from '../models/account.viewmodel';
import { FriendViewModel } from '../models/friend.viewmodel';
import { combine, BASE_URL, LOGIN } from '../constants/app.constant';

@Injectable()
export class UserService {
    constructor(private dataService: DataService) {
    }

    public login(loginModel: any) {
        return this.dataService.post(combine(BASE_URL, LOGIN), loginModel).pipe(map((res) => {
            let accountModel: AccountViewModel = new AccountViewModel();
            accountModel.UserId = res.UserId;
            accountModel.Name = res.Name;
            accountModel.DisplayName = res.DisplayName;
            accountModel.Token = res.Token;
            accountModel.Expires = res.Expires;
            return accountModel;
        }));
    }

    public getFriends() {
        return this.dataService.get('/assets/friends.json').pipe(map((res) => {
            let friends: FriendViewModel[] = [];
            res.forEach((f: FriendViewModel, index: number) => {
                let friend: FriendViewModel = new FriendViewModel();
                friend.ChannelId = f.ChannelId;
                friend.Name = f.Name;
                friend.LastMessage = f.LastMessage;
                friend.Slogan = f.Slogan;
                friends.push(friend);
            });
            return friends;
        }));
    }
}