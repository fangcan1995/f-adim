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
    return this.getList(params);
  }

  //get one
  public getIntentionById(id): Promise<any> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${this.intention_url}/fill/${id}`,).toPromise();
  }

  /*
    //补填借款信息
    public updateLoanInfo(params?): Promise<any> {
      const url = `${this.intentionUrl}/loan`;
      return this.update(url, params);
    }

    //新增抵押物
    public createPawn(params?): Promise<any> {
      const url = `${this.intentionUrl}/${params.intentionId}/pawn`;
      return this.update(url, params);
    }

    //移除抵押物
    public removePawn(intentionId?): Promise<any> {
      const url = `${this.intentionUrl}/${intentionId}/pawn`;
      return this.delete(url);
    }

    //提交审核
    public submitAudit(params?): Promise<any> {

      return this.create(this.intentionUrl, params);
    }

    //补填会员信息
    public updateMember(params?): Promise<any> {
      const url = `${this.memberUrl}`;
      return this.create(url, params);
    }*/





}
