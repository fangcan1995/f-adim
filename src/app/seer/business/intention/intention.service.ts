import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {BaseService, BASE_URL} from "../../../theme/services/base.service";

@Injectable()
export class IntentionService extends BaseService<any>{

  //意向
  private intention_url = 'subject/intentions';

  //会员
  private member_url =   + '/members';

  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
    this.setApi(this.intention_url);
  }

  // get list
  public getIntentions(params: any): Promise<any> {
  let url = BASE_URL + '/subject/intentions';
    return this._httpInterceptorService.request('GET', url, params).toPromise();
  }

  //get one
  public getIntentionById(id): Promise<any> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${this.intention_url}/fill/${id}`).toPromise();
  }

  //补填资料
  public completion(param: any): Promise<any> {
    let url = BASE_URL + `/intentions/${param.id}`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }





}
