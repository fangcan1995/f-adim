import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { parseJson2URL, getStorage } from '../libs/utils';
export class ResModel {
  code: number;
  msg?: string;
  message?: string;
  data?: any;
  extras?: any;
}
@Injectable()
export class HttpInterceptorService {
  constructor(private _http: Http) { }
  public request(method: string, url: string, params?: any, ignoreAuth?: boolean, timeout?: number) {
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

    console.log('__request__: ', params);
    /*let _search = new URLSearchParams();
    _(params).each((t, i) => {
      if ( t instanceof Object ) {
        t = JSON.stringify(t)
      }
      _search.set(i, t);
    })*/
    let headers = new Headers();
    // headers.set('Content-Type', 'application/json')
    if ( !ignoreAuth ) {
      const token = getStorage({ key: 'token' })
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
        search: parseJson2URL(params),

      });
    } else {
      options = new RequestOptions({
        headers,
        method: _method,
        url: url,
        body: '?' + parseJson2URL(params),
        search: parseJson2URL(params)
      });
    }
    let req = new Request(options)
    return this._http.request(req)
    .timeout(timeout || 3000)
    .map(this.extractData)
    .do(res => {
      console.log('__response__: ', res);
    })
    .mergeMap(res => {
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
    .catch(this.handleError);

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
