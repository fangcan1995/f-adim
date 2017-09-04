import { Injectable } from '@angular/core';
import {BaseService} from "../../base.service";

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

  // 获取数据列表
  getList(params?): any {

    return this.mockData;
  }





}
