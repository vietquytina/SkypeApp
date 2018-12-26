import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service';
import { MessageBoxService } from '../../services/message.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    providers: [UserService, MessageBoxService]
})
export class DashboardComponent implements OnInit {
    constructor(private authService: AuthService, private userService: UserService,
                private routeService: RouteService, private msgService: MessageBoxService) {
    }

    ngOnInit() {
        let loading = this.msgService.loading();
    }
}