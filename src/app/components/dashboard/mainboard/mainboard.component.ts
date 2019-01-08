import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { Store } from 'redux';

import { FriendViewModel } from '../../../models/friend.viewmodel';
import { AccountViewModel } from '../../../models/account.viewmodel';
import { MessageViewModel } from '../../../models/message.viewmodel';
import { UserService } from '../../../services/user.service';
import { RouteService } from '../../../services/route.service';
import { MessageBoxService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { AppStore } from '../../../redux/app.store';
import { IAppState } from '../../../redux/app.state';

@Component({
    selector: 'app-mainboard',
    templateUrl: './mainboard.component.html',
    styleUrls: ['./mainboard.component.css']
})
export class MainBoardComponent implements OnInit {
    @Output() onload: EventEmitter<any> = new EventEmitter<any>();
    public messages: MessageViewModel[] = [];
    public user: AccountViewModel = null;

    constructor(private userService: UserService, private routeService: RouteService, 
        private msgService: MessageBoxService, private authService: AuthService,
        @Inject(AppStore) private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.subscribe(() => {
            let changedProperty: string = this.store.getState().changedProperty;
            if (changedProperty == 'selectedFriend') {
                this.messages = this.store.getState().messages['1'];
            }
        });
    }

    public loadMessages(friend: FriendViewModel): void {
        this.userService.getMessages().subscribe((messages: MessageViewModel[]) => {
            this.messages = messages;
        }, (err: any) => {
        });
    }
}