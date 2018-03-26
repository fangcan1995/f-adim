import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { getStorage, setStorage } from '../libs/utils';
import {
  HttpInterceptorService,
  ResModel,
} from './http-interceptor.service';
import {
  BASE_URL,
  API,
  BaseService,
} from './base.service';
import * as _ from 'lodash';
import { AuthService } from './auth.service';
import { GlobalState } from '../../global.state';
@Injectable()
export class ManageService extends BaseService<any> {
  constructor(
    protected _httpInterceptorService:HttpInterceptorService,
    private _authService:AuthService,
    private _state:GlobalState,
    ) {
    super(_httpInterceptorService)
  }
  // public getDataFromServer(): Promise<ResModel> {
  //   return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['USER']}`).toPromise()
  // }
  public getDataFromServer(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['USER']}?systemType=loan`).toPromise()
  }
  public refreshLocalDataAndNotify() {
    return this.getDataFromServer()
    .then(res => {
      let data = res.data || {};
      let { menus:resources = null, roles = null, ...user } = data;
      this.setUserToLocal(user);
      this.setRolesToLocal(roles);
      this.setResourcesToLocal(resources);
      this._state.notify('menu.changed', resources);
      this._state.notify('user.changed', user);
      this._state.notify('roles.changed', roles);
      return null;
    })
    
  }
  public setResourcesToLocal(resources) {
    resources = _.map(resources, r => _.set(r, 'fullPath', this._getFullPath(r, resources)));
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
  public setRolesToLocal(roles) {
    setStorage({
      key: 'roles',
      value: roles,
    }, false)
  }
  // 从本地存储里获取用户信息
  public getUserFromLocal() {
    return getStorage({ key: 'user' });
  }
  // 从本地获取用户可显示的菜单
  public getResourcesFromLocal() {
    return getStorage({ key: 'resources' });
  }
  // 从本地获取用户角色
  public getRolesFromLocal() {
    return getStorage({ key: 'roles' });
  }
  private _getFullPath(r, resources) {
    let parent = _.find(resources, t => t['menuId'] == r['menuPid'])
    if ( parent ) {
      let parentPath = this._getFullPath(parent, resources);
      return parentPath + '/' + r.hrefUrl;
    }
    return '/' + r.hrefUrl;
  }

  public changePassword(params?) {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['USERS']}/password`, params).toPromise();
  }



}