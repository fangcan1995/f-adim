import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { parseJson2URL, getStorage } from '../libs/utils';
import { GlobalState } from '../../global.state'
export class ResModel {
  code: number;
  msg?: string;
  message?: string;
  data?: any;
  extras?: any;
}
@Injectable()
export class HttpInterceptorService {
  constructor(
    private _http:Http,
    private _state:GlobalState,
    ) { }
  public request(
    method:string,
    url:string,
    params?:any,
    ignoreAuth?:boolean,
    timeout:number = 10000,
    retry:number = 0,
    ) {
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

    let headers = new Headers();

    console.log('__request__: ', url, params);
    let queryParams = parseJson2URL(params);
    if ( !ignoreAuth ) {
      const token = getStorage({ key: 'token' }) || {};
      const tokenType = token.token_type;
      const accessToken = token.access_token;
      headers.set('Authorization', `${tokenType} ${accessToken}`)
    }
    
    let options;
    if ( method === 'GET' ) {
      options = new RequestOptions({
        headers,
        method: _method,
        url: url,
        search: queryParams,
        // withCredentials: true,
      });
    } else {
      headers.set('Content-Type', 'application/json');
      options = new RequestOptions({
        headers,
        method: _method,
        url: url,
        body: params,
        // search: queryParams,
        // withCredentials: true,
      });
    }
    let req = new Request(options)
    return this._http.request(req)
    .timeout(timeout)
    .retry(retry)
    .map(this.extractData)
    .do(res => {
      console.log('__response__: ', url, res);
    })
    .mergeMap((res:ResModel | any) => {
      if ( res.code == 0 ) {
        return Observable.of(res);
      } else {
        // 将错误放到错误回调中统一处理
        return Observable.throw({
          code: res.code,
          msg: res.message,
        });
      }
    })
    .catch(this.handleError.bind(this));

  }
  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      const status = error.status;
      const statusText = error.statusText;
      if ( status == 401 ) {
        this._state.notify('auth.loginTimeout', {});
      }
      return Observable.throw({
        code: status,
        msg: err,
      });
      
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Observable.throw({
        code: -1,
        msg: errMsg,
      });
    }
    
  }
}
