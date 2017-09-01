import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
interface dialogOptsModel {
  content: string,
  actions: Array<any>,
}

@Injectable()
export class SeerDialogService {
  private _onChange$: Subject<any> = new Subject();
  private _onAction$: Subject<any> = new Subject();
  public show(options) {
    this._onChange$.next({
    	...options,
    	isShown: true,
    })
    return this;
  };
  public hide() {
  	this._onChange$.next({
  		content: '',
  		isShown: false,
  	})
    return this;
  }
  public onChange() {
  	return this._onChange$;
  }
  public triggerAction(action) {
    this._onAction$.next(action);
  }
  public onAction() {
    return this._onAction$;
  }
  public alert(msg) {
    this.show({
      content: msg,
      actions: [
        {
          type: 1,
          text: '确定',
        }
      ]
    })
    return this.onAction()
    .do(res => {
      this.hide();
    })
    .map(res => {
      return res.type;
    })
  }
  public confirm(msg) {
    this.show({
      content: msg,
      actions: [
        {
          type: 1,
          text: '确定',
        },
        {
          type: 0,
          text: '取消',
        }
      ]
    })
    return this.onAction()
    .do(res => {
      this.hide();
    })
    .map(res => {
      return res.type
    })
  }
}


