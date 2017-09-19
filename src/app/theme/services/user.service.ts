import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { getStorage } from '../libs/utils';
import {
  HttpInterceptorService,
} from './http-interceptor.service';
import {
  BASE_URL,
  API,
} from './base.service';
@Injectable()
export class UserService {
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  getDataFromLocal(): Observable<any> {
    return Observable.create(observer => {
      observer.next(getStorage({ key: 'user' }))
    });
  }
  getDataFromServer(id: string | number): Observable<any> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['USER']}/${id}`)
  }
}