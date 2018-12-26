import { Component, OnInit, EventEmitter, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { RouteService } from '../../../services/route.service';
import { FriendViewModel } from '../../../models/friend.viewmodel';

@Component({
    selector: 'app-friendlist',
    templateUrl: './friendlist.component.html',
    styleUrls: ['./friendlist.component.css'],
    providers: [UserService]
})
export class FriendListComponent implements OnInit {
    public friends: FriendViewModel[] = [];
    public selectedFriend: FriendViewModel;
    public onFriendChange: EventEmitter<FriendViewModel> = new EventEmitter<FriendViewModel>();
    public onload: EventEmitter<any> = new EventEmitter<any>();

    constructor(private authService: AuthService, private userService: UserService,
                private routeService: RouteService) {
    }

    ngOnInit() {
        this.userService.getFriends().subscribe((friends: FriendViewModel[]) => {
            this.friends = friends;
            this.onload.emit();
        }, (err: any) => {
            if (err.status === 401) {
                this.routeService.navigateToLogin();
            }
        });
    }

    public select(friend: FriendViewModel, $event): void {
        if (friend != this.selectedFriend) {
            //----Active link--------------
            this.selectedFriend = friend;
            var selectedFriendLinks = document.getElementsByClassName('active');
            for(var i = 0; i < selectedFriendLinks.length; i++) {
                selectedFriendLinks[i].className = selectedFriendLinks[i].className.replace(' active', '');
            }
            $event.target.className += ' active';
            console.log($event);
            //-----------------------------
            //----Load message-------------
            //-----------------------------
        }
    }
}