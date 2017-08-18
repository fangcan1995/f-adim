import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SeerMessageService } from '../../services/seer-message.service';

@Component({
  selector: 'seer-message',
  templateUrl: './seer-message.component.html',
  styleUrls: ['./seer-message.component.scss'],
  animations: [
      trigger('messageInOut', [
        state('in', style({
          opacity: 1,
          transform: 'translateY(0)'
        })),
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-50%)'
          }),
          animate(100)
        ]),
        transition(':leave', [
          animate(100, style({
            opacity: 0,
            transform: 'translateY(-50%)'
          }))
        ])
      ])
    ]
})
export class SeerMessageComponent implements OnInit {
  public isDirty: boolean = false;
  public messageNotices: Array<any> = [];
  public messageInOut: string;
  constructor(private _messageService: SeerMessageService) {}
  ngOnInit() {
    this._messageService.onOpen()
    .subscribe(messageNotices => {
      if ( !this.isDirty ) {
        this.isDirty = true;
      }
      this.messageNotices = messageNotices;
    });
    this._messageService.onClose()
    .subscribe(messageNotices => {
      this.messageNotices = messageNotices;
    });
  }

}