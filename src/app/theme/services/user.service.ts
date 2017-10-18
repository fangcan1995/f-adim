import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { getStorage } from '../libs/utils';
import {
  HttpInterceptorService,
} from './http-interceptor.service';
import {
  BASE_URL,
  API,
  BaseService,
} from './base.service';
@Injectable()
export class UserService extends BaseService<any> {
  
}