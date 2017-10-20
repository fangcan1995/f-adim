import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { getStorage, setStorage } from '../libs/utils';
import {
  HttpInterceptorService,
} from './http-interceptor.service';
import {
  BASE_URL,
  API,
  BaseService,
} from './base.service';
@Injectable()
export class UserService extends BaseService<any> {
  public getDataFromServer() {
    return Observable.forkJoin(
      Observable.fromPromise(this.getUserFromServer()),
      Observable.fromPromise(this.getResourcesFromServer({pageSize: 10000})),
      Observable.fromPromise(this.getDictsFromServer({pageSize: 10000}))
      )
  }
  public setResourcesToLocal(resources) {
    setStorage({
      key: 'resources',
      value: resources,
    })
  }

}