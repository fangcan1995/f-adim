import { Injectable } from '@angular/core';

import {BASE_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";

@Injectable()
export class LoanBasicService extends BaseService<any>{

  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
    this.setApi('/intentions/loan');
  }

  //更新会员信息
  public updateMember(params: any): Promise<any> {
    let url = BASE_URL + `/member/members/${params["memberId"]}/baseInfo`;
    return this._httpInterceptorService.request('POST', url, params, false).toPromise();
  }

  //更新借款信息
  public updateLoan(params?): Promise<any> {
    let intentions_loan_url = 'subject/intentions/loan';
    return this._httpInterceptorService.request('PUT', BASE_URL + `/${intentions_loan_url}`, params, false).toPromise();
  }

  //设置抵押车辆
  public pawnVehicle(vehicleId: string, projectId: string): Promise<any> {
    let url = 'intentions';
    return this._httpInterceptorService.request('POST', BASE_URL + `/subject/${url}/${projectId}/pawnCar/${vehicleId}`, {}, false).toPromise();
  }

  //设置抵押房产
  public pawnHouse(houseId: string, projectId: string): Promise<any> {
    let url = 'intentions';
    return this._httpInterceptorService.request('POST', BASE_URL + `/subject/${url}/${projectId}/pawnHouse/${houseId}`, {}, false).toPromise();
  }

  //新增车辆
  public addVehicle(memberId: string, param: any): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/vehicleInfo`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //新增房产
  public addHouse(memberId: string, param: any): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/houseInfo`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }



}
