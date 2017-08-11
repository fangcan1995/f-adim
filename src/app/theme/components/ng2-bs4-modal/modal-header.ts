import {Component, Input, Type} from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'modal-header',
    template: `
        <div class="seer-modal-header" [class.seer-modal-border-bottom]="borderBottom">
            <ng-content></ng-content>
        </div>
    `,
  styles:[
    `.seer-modal-header {
    padding: 10px 10px 5px;
}`,
    `
  .seer-modal-border-bottom {
    border-bottom: solid;
    border-color: #00abff;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }`]
})
export class ModalHeaderComponent {
    @Input() borderBottom = true;

    constructor() { }
}
