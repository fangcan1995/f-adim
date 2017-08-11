import { Component } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'modal-body',
    template: `
        <div class="modal-body row">
            <ng-content></ng-content>
        </div>
    `
})
export class ModalBodyComponent {
    constructor() { }
}
