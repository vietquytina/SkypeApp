import { Component, OnInit } from '@angular/core';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    private hub: HubConnection;

    public name: string = '';
    public message: string = '';
    public totalMessage: string = '';

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.hub = new HubConnectionBuilder().withUrl('https://localhost:44318/message', { accessTokenFactory: () => this.authService.getToken() }).build();
        this.hub.on('recv', (name: string, message: string) => {
            this.totalMessage += '<p>' + name + ': ' + message + '</p>';
        });
        this.hub.start().catch((reason: any) => {
            console.log('Setup connection failed.');
            console.log(reason);
            console.log('------------------------');
        });
    }

    public sendMessage(): void {
        if (this.message == '') {
            return;
        }
        this.hub.invoke('SendMessage', this.name, this.message).catch((reason: any) => {
            console.log('Send message failed.');
            console.log(reason);
            console.log('------------------------');
        });
    }
}