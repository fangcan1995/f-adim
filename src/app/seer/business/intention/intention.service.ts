import { Injectable } from '@angular/core';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";

@Injectable()
export class IntentionService extends BaseService<any>{

  mockData = [
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "1111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
  ];

  //意向
  private intentionUrl = SERVER + '/intentions';

  //会员
  private memberUrl = SERVER + '/members';


  // 意向列表(分页)
  public getIntentionList(params?): any {

    return this.mockData;
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
