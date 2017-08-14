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

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
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
export class MessageComponent implements OnInit {
  public isDirty: boolean = false;
  public messageNotices: Array<any> = [];
  public messageInOut: string;
  constructor(private _messageService: MessageService) {}
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