import { Injectable } from '@angular/core';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";

@Injectable()
export class LoanBasicService extends BaseService<any>{

  //会员
  private memberUrl = SERVER + '/members';

  //更新会员信息
  public updateMember(params?): Promise<any> {
    const url = `${this.memberUrl}`;
    return this.create(url, params);
  }













  //贷款
  private loanUrl = SERVER + '/loan'




  //补填借款信息
  public updateLoanInfo(params?): Promise<any> {
    const url = `${this.loanUrl}/loan`;
    return this.update(url, params);
  }

  //新增抵押物
  public createPawn(params?): Promise<any> {
    const url = `${this.loanUrl}/${params.intentionId}/pawn`;
    return this.update(url, params);
  }

  //移除抵押物
  public removePawn(intentionId?): Promise<any> {
    const url = `${this.loanUrl}/${intentionId}/pawn`;
    return this.delete(url);
  }

  //提交审核
  public submitAudit(params?): Promise<any> {

    return this.create(this.loanUrl, params);
  }







}
