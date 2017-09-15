import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import * as _ from 'lodash';

import {
  ResModel,
  HttpInterceptorService,
} from './http-interceptor.service';

import { getStorage } from '../libs/utils';

const castDict2Translate = (dicts: any[] = [], map: Map<string, string>) => {
  let translate = {};
  map.forEach((dictKeyId, field) => {
    for (let i = 0; i < dicts.length; i++ ) {
      let dict = dicts[i];
      if (dict.dictKeyId == dictKeyId ) {
        if ( !translate[field] ) translate[field] = [];
        translate[field].push(dict);
      }
    }
  });
  return translate;
};

const baseDomain = '42.202.130.200';
const basePort = 8080;
const baseServer = `${baseDomain}:${basePort}`;

// export const baseUrl = `http://${baseServer}/api`;
export const baseUrl = `http://${baseServer}`;
export const apis = {
  'LOGIN': 'login',
  'LOGOUT': 'logout',
  'SIGNUP': 'signup',
  'WORKBENCH': 'workbench',
  'MEMBERS': 'members',
}

// 此服务用于继承，请不要注入使用；如果想用更灵活的http服务请使用HttpInterceptorService，最灵活的是angular2自带的Http服务；
@Injectable()
export class BaseService<T> {
  private _api: string;
  constructor(
    protected _httpInterceptorService: HttpInterceptorService,
    ) {}
  // 当子类继承时，请在构造函数里调用一次设置接口名
  public setApi(api: string) {
    this._api = api;
  }
  // 获取列表
  public getList(params?: any): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${baseUrl}/${this._api}`, params).toPromise();
  }
  // 获取一条记录
  public getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${baseUrl}/${this._api}/${id}`).toPromise();
  }
  // 新增一条记录
  public PostOne(params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${baseUrl}/${this._api}`, params).toPromise();
  }
  // 修改一条记录，提供全部字段
  public putOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${baseUrl}/${this._api}/${id}`, params).toPromise();
  }
  // 修改一条记录，提供部分字段
  public patchOne(id: string | number, params: any): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${baseUrl}/${this._api}/${id}`, params).toPromise();
  }
  // 删除一条记录
  public deleteOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${baseUrl}/${this._api}/${id}`).toPromise();
  }
  // 从本地存储里获取用户信息
  public getUserFromLocal(): Promise<ResModel> {
    return new Promise(resolve => {
      resolve({
        code: 0,
        msg: '',
        data: getStorage({ key: 'user' })
      })
    });
  }
  // 从服务器端获取用户信息
  public getUserFromServer(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${baseUrl}/user`).toPromise();
  }
}