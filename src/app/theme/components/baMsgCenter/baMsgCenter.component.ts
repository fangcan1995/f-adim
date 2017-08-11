import {Component} from '@angular/core';

import {BaMsgCenterService} from './baMsgCenter.service';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  templateUrl: './baMsgCenter.html',
  styleUrls: ['./baMsgCenter.scss'],
})
export class BaMsgCenter {

  public notifications:Array<Object>;
  public messages:Array<Object>;

  constructor(private _baMsgCenterService:BaMsgCenterService) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }

}
