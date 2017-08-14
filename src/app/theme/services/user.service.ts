import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { getStorage } from '../libs/utils';
import {
  baseUrl,
  apis,
  HttpInterceptorService,
} from './http-interceptor.service';

@Injectable()
export class UserService {
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  getDataFromLocal(): Observable<any> {
    return Observable.create(observer => {
      observer.next(getStorage({ key: 'user' }))
    });
  }
  getDataFromServer(id: string | number): Observable<any> {
    return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['USER']}/${id}`)
  }
}