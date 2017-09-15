import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

interface ResModel {
  code: number,
  msg: string,
  data?: any,
  extras?: any,
}

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

@Injectable()
export class HttpInterceptorService {
  constructor(private _http: Http) { }
  public request(method: string, url: string, params?: object) {
    method = method.toUpperCase();
    let _method = null;
    switch (method) {
      case 'GET':
        _method = RequestMethod.Get;
        break;
      case 'POST':
        _method = RequestMethod.Post;
        break;
      case 'PUT':
        _method = RequestMethod.Put;
        break;
      case 'PATCH':
        _method = RequestMethod.Patch;
        break;
      case 'DELETE':
        _method = RequestMethod.Delete;
        break;
      default:
        return Observable.throw('请求方法已被禁用');
    }
    let _search = new URLSearchParams();
    console.log('__request__: ', params);
    _(params).each((t, i) => {
      if ( t instanceof Object ) {
        t = JSON.stringify(t)
      }
      _search.set(i, t);
    })

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options;
    if ( method === 'GET' ) {
      options = new RequestOptions({
        headers,
        method: _method,
        url: url,
        search: _search,

      });
    } else {
      options = new RequestOptions({
        headers,
        method: _method,
        url: url,
        body: params
      });
    }
    let req = new Request(options)
    return this._http.request(req)
    .map(this.extractData)
    .do(res => {
      console.log('__response__: ', res);
    })
    .catch(this.handleError);
    /*.mergeMap(res => {
      if ( res.code === 0 ) {
        return Observable.of(res);
      } else {
        // 将错误放到错误回调中统一处理
        return Observable.throw(res);
      }
    })*/
    
  }
  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw({
      code: -1,
      msg: errMsg,
    });
  }
}