import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
interface optionsModel {
  message: string,
  icon?: string,
  position?: string,
  autoHideDuration?: number,
}

class MessageNotice {
  public key: number;
  public timer: any = null;
  public onClose$ = new Subject();
  constructor(
    public icon: string,
    public message: string | number,
    ) {}
  onClose() {
    return this.onClose$;
  }
}

@Injectable()
export class SeerMessageService {
  private _onOpen$: Subject<any> = new Subject();
  private _onClose$: Subject<any> = new Subject();
  public messageNotices = [];
  public open(options: optionsModel) {
    let messageNotice = new MessageNotice(options.icon, options.message);
    let key = this.messageNotices.push(messageNotice);
    messageNotice.key = key;
    this._onOpen$.next(this.messageNotices);
    if ( options.autoHideDuration ) {
      messageNotice.timer = setTimeout(() => {
        this.close(messageNotice);
      }, +options.autoHideDuration);
    }
    return messageNotice
  };
  public close(messageNotice) {
    clearTimeout(messageNotice.timer);
    messageNotice.timer = null;
    _.remove(this.messageNotices, t => t.key === messageNotice.key);
    messageNotice.onClose().next()
    this._onClose$.next(this.messageNotices);
  }
  public onOpen() {
    return this._onOpen$;
  }
  public onClose() {
    return this._onClose$;
  }
}


