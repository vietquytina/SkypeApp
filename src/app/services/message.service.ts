import { Injectable } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { MessageBoxComponent } from './message/message.component';

@Injectable()
export class MessageBoxService {
    constructor(private mdlService: BsModalService) {
    }

    public loading(): void {
    }

    public alert(message: string, title?: string, onOk?: () => void): void {
        let mdlRef = this.mdlService.show(MessageBoxComponent, {
            backdrop: 'static', initialState: { message: message, title: title, type: 'alert' }
        });
        mdlRef.content.OnResult.subscribe((next: any) => {
            this.call(onOk);
        }, (err: any) => {
            this.call(onOk);
        });
    }

    public confirm(message: string, title?: string, onOk?: () => void, onCancel?: () => void): void {
        let mdlRef = this.mdlService.show(MessageBoxComponent, {
            backdrop: 'static', initialState: { message: message, title: title, type: 'confirm' }
        });
        mdlRef.content.OnResult.subscribe((next: any) => {
            this.call(next == 'OK'? onOk : onCancel);
        }, (err: any) => {
            this.call(onCancel);
        });
    }

    private call(onOk?: () => void) : void {
        if (onOk != null) {
            onOk();
        }
    }
}