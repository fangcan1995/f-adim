import { Injectable } from '@angular/core';

import {SERVER} from "../../const";
import {BASE_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";

@Injectable()
export class LoanBasicService extends BaseService<any>{

  //会员
  private memberUrl = SERVER + '/members';


  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
    this.setApi('/intentions/loan');
  }

  //更新会员信息
  public updateMember(params?): Promise<any> {
    const url = `${this.memberUrl}`;
    //return this.create(url, params);
    return null;
  }

  //更新借款信息
  public updateLoan(params?): Promise<any> {
    let intentions_loan_url = SERVER + '/intentions/loan';
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${intentions_loan_url}`, params, false).toPromise();
  }



}
