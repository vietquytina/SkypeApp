import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

import { Store } from 'redux';

import { UserService } from '../../../services/user.service';
import { RouteService } from '../../../services/route.service';
import { MessageBoxService } from '../../../services/message.service';
import { FriendViewModel } from '../../../models/friend.viewmodel';
import { AccountViewModel } from '../../../models/account.viewmodel';
import { AppStore } from '../../../redux/app.store';
import { IAppState } from '../../../redux/app.state';
import { SELECTED_FRIEND_CHANGED } from 'src/app/constants/app.action';

@Component({
    selector: 'app-friendlist',
    templateUrl: './friendlist.component.html',
    styleUrls: ['./friendlist.component.css'],
    providers: [UserService, MessageBoxService]
})
export class FriendListComponent implements OnInit {
    public user: AccountViewModel = null;
    public friends: FriendViewModel[] = [];
    public selectedFriend: FriendViewModel;
    @Output() onFriendChange: EventEmitter<FriendViewModel> = new EventEmitter<FriendViewModel>();
    @Output() onload: EventEmitter<any> = new EventEmitter<any>();

    constructor(private userService: UserService, private routeService: RouteService, 
        private msgService: MessageBoxService,
        @Inject(AppStore) private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.user = this.store.getState().user;
        this.store.subscribe(() => {
            this.friends = this.store.getState().friends;
        });
    }

    public select(friend: FriendViewModel, $event: any): void {
        if (friend != this.selectedFriend) {
            //----Active link--------------
            this.selectedFriend = friend;
            var selectedFriendLinks = document.getElementsByClassName('active');
            for(var i = 0; i < selectedFriendLinks.length; i++) {
                var ele = selectedFriendLinks[i] as any;
                ele.className = selectedFriendLinks[i].className.replace(' active', '');
                ele.style.backgroundColor = '';
            }
            $event.target.className += ' active';
            $event.target.style.backgroundColor = '#ffffff';
            this.store.dispatch({ type: SELECTED_FRIEND_CHANGED, data: this.selectedFriend });
            //-----------------------------
            //----Load message-------------
            //-----------------------------
        }
    }

    public showUserContextMenu($event: any): void {
        $event.preventDefault();
    }

    public showCurrentUserInfo(): void {
        if (this.user != null) {
            
        }
    }
}