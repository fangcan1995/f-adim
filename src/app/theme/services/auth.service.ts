import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { menuTree } from '../utils/json-tree';
import {
  HttpInterceptorService,
} from './http-interceptor.service';
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
    private _httpInterceptorService: HttpInterceptorService
    ) {}
  
  login(account: any, password: any): Observable<any> {
    let params = {
      username: account,
      password: password,
      client_id: 'member',
      client_secret: 'secret',
      grant_type: 'password',
    }
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API.LOGIN}`, params)
    .do(res => {
      if ( res && !res.error ) {
        this.isLoggedIn = true;
        setStorage({
          key: 'token',
          value: res,
        })
      }
    })
  }
  /*logout(): Observable<any> {
    return this.http.post(`${BASE_URL}/${API['LOGOUT']}`, {})
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
  }*/
}
