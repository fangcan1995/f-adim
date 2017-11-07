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
import { AuthService } from './auth.service'
@Injectable()
export class ManageService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService,
    private _authService:AuthService
    ) {
    super(_httpInterceptorService)
  }
  public getDataFromServer() {
    return Observable.forkJoin(
      Observable.fromPromise(this.getUserFromServer()),
      Observable.fromPromise(this.getResourcesFromServer({pageSize: 10000})),
      )
  }
  public setResourcesToLocal(resources) {
    setStorage({
      key: 'resources',
      value: resources,
    }, false);
  }

}