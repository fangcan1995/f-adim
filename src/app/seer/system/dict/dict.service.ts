import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import {
  BaseService,
  BASE_URL,
  TEST_URL,
  API
} from '../../../theme/services/base.service';
import { HttpInterceptorService, ResModel } from '../../../theme/services/http-interceptor.service';
import { DictModel } from './DictModel';

@Injectable()
export class DictService extends BaseService<DictModel> {
  constructor(
    protected _httpInterceptorService: HttpInterceptorService,
    ) {
    super(_httpInterceptorService);
    this.setApi(API['DICTS']);
  }

  getDictList(params): Promise<ResModel> {
    return this._httpInterceptorService.request(
        'GET',
        `${TEST_URL}/${API['DICTS']}`,
        params
    ).toPromise();
  }

}
