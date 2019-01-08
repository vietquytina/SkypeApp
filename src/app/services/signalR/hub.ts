import { Injectable } from '@angular/core';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

import { IMessageSender } from './IMessageSender';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessageHub implements IMessageSender {
    private hub: HubConnection;

    constructor(private authService: AuthService) {
    }

    public start(url: string): Promise<void> {
        this.hub = new HubConnectionBuilder().withUrl(url, { accessTokenFactory: () => this.authService.getToken() }).build();
        return this.hub.start();
    }

    public setOnRecvMessageListener(onRecvMessage: (message: string, data: any) => void): void {
        this.hub.on('recv', (msg: string, msgData: any) => {
            if (onRecvMessage != null && onRecvMessage != undefined) {
                onRecvMessage(msg, msgData);
            }
        });
    }

    public sendMessage(message: string, data: any): Promise<void> {
        return this.hub.send('SendMessage', message, data);
    }
}