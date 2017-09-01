import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

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
}


