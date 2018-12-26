import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'msg-box',
    templateUrl: './message.component.html'
})
export class MessageBoxComponent {
    public title: string;
    public message: string;
    public type: string;
    public OnResult: EventEmitter<any> = new EventEmitter<any>();

    constructor(public mdlRef: BsModalRef) {
    }

    public ok(): void {
        this.mdlRef.hide();
        this.OnResult.emit('OK');
    }

    public close(): void {
        this.mdlRef.hide();
        this.OnResult.emit('Cancel');
    }
}