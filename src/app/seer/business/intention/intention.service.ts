import { Injectable } from '@angular/core';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";

@Injectable()
export class IntentionService extends BaseService<any>{

  //意向
  private intentionUrl = SERVER + 'subject/intentions';

  //会员
  private memberUrl = SERVER + '/members';

  public getIntentions(): Promise<any> {
    return this.getAll(this.intentionUrl);
  }




  //根据意向ID查询意向信息
  public getIntentionById(intentionId): Promise<any> {
    const url = `${this.intentionUrl}/${intentionId}`;
    return this.getById(url);
  }

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
  }





}
