import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
  HttpInterceptorService,
  
} from './http-interceptor.service';
import { parseJson2URL } from '../libs/utils';
import {
  BASE_URL,
  API,
} from './base.service';
import { setStorage, delStorage } from '../libs/utils';
@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public redirectSearch: any;
  public redirectFragment: string;

  constructor(
    private _http: Http
    ) {}
  
  login(account: any, password: any): Observable<any> {
    let params = {
      username: account,
      password: password,
      client_id: 'system',
      client_secret: 'secret',
      grant_type: 'password',
    }
    let reqOpts = new RequestOptions({
      search: parseJson2URL(params)
    });
    return this._http.post(`${BASE_URL}/${API.LOGIN}`, '?' + parseJson2URL(params), reqOpts)
    .map(this.extractData)
    .do(res => {
      if ( res && !res.error ) {
        this.isLoggedIn = true;
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
  logout(): Observable<any> {
    /*return this._http.post(`${BASE_URL}/${API['LOGOUT']}`, {})
    .map(this.extractData)
    .do(res => {
      if ( res.code == 0 ) {
        this.isLoggedIn = false;
        delStorage({
          key: 'user',
        })
        delStorage({
          key: 'token',
        })
        delStorage({
          key: 'resources',
        })
        delStorage({
          key: 'dicts',
        })
      }
    })
    .catch(this.handleError);*/

    return Observable.create(subscriber => {
      this.isLoggedIn = false;
      delStorage({
        key: 'user',
      })
      delStorage({
        key: 'token',
      })
      delStorage({
        key: 'resources',
      })
      delStorage({
        key: 'dicts',
      })
      subscriber.next();
    })
  }
}
