import { Component, Inject, OnInit } from '@angular/core';

import { Store } from 'redux';

import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service';
import { MessageBoxService } from '../../services/message.service';
import { AppStore } from '../../redux/app.store';
import { IAppState } from '../../redux/app.state';
import { FriendViewModel } from '../../models/friend.viewmodel';
import { QUERY_FRIENDS, QUERY_MESSAGES } from '../../constants/app.action';
import { MessageViewModel } from 'src/app/models/message.viewmodel';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [UserService, MessageBoxService]
})
export class DashboardComponent implements OnInit {
    constructor(private userService: UserService, private routeService: RouteService, 
        private msgService: MessageBoxService, @Inject(AppStore) private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.userService.getFriends().subscribe((friends: FriendViewModel[]) => {
            this.store.dispatch({ type: QUERY_FRIENDS, data: friends });
            this.userService.getMessages().subscribe((messages: MessageViewModel[]) => {
                this.store.dispatch({ type: QUERY_MESSAGES, data: messages });
            }, (err: any) => {
                this.onError(err);
            });
        }, (err: any) => {
            this.onError(err);
        });
    }

    private onError(err: any): void {
        if (err.status === 401) {
            this.msgService.alert('Bạn chưa thực hiện đăng nhập', 'Lỗi', () => {
                this.routeService.navigateToLogin();
            });
        }
    }
}