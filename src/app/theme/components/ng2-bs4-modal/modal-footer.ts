import { Component, Input } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'modal-footer',
    template: `
        <div class="modal-footer">
            <ng-content></ng-content>
        </div>
    `
})
export class ModalFooterComponent {
    constructor() { }
}
