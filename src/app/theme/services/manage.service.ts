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
import * as _ from 'lodash';
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
    return this.getUserFromServer();
  }
  public setResourcesToLocal(resources) {
    resources = _.map(resources, r => _.set(r, 'fullPath', this.getFullPath(r, resources)));
    setStorage({
      key: 'resources',
      value: resources,
    }, false);
  }
  public setUserToLocal(user) {
    setStorage({
      key: 'user',
      value: user,
    }, false)
  }
  getFullPath(r, resources) {
    let parent = _.find(resources, t => t['menuId'] == r['menuPid'])
    if ( parent ) {
      let parentPath = this.getFullPath(parent, resources);
      return parentPath + '/' + r.hrefUrl;
    }
    return '/' + r.hrefUrl;
  }

}