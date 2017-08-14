import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  baseUrl,
  apis,
  HttpInterceptorService,
} from './http-interceptor.service';
import { setStorage, delStorage } from '../libs/utils';
@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public redirectSearch: any;
  public redirectFragment: string;

  constructor(private http: Http) {}
  
  login(account: any, password: any): Observable<any> {
    return this.http.post(`${baseUrl}/${apis['LOGIN']}`, { account, password })
    .map(this.extractData)
    .do(res => {
      if ( res.code === 0 ) {
        this.isLoggedIn = true;
        let data = res.data || {};
        setStorage({
          key: 'user',
          value: data.user,
        })
        setStorage({
          key: 'token',
          value: data.token,
        })
      }
    })
    .catch(this.handleError);
  }
  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/${apis['LOGOUT']}`, {})
    .map(this.extractData)
    .do(res => {
      if ( res.code === 0 ) {
        this.isLoggedIn = false;
        delStorage({
          key: 'user',
        })
        delStorage({
          key: 'token',
        })
      }
    })
    .catch(this.handleError);
  }
  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  
}
