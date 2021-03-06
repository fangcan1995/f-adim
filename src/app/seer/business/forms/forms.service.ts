///<reference path="../../../../../node_modules/@angular/http/src/base_request_options.d.ts"/>
import { Injectable } from '@angular/core';

import {BASE_URL, TEST_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {
  Http, Headers, Request, RequestMethod, Response, RequestOptions, URLSearchParams,
  ResponseContentType
} from '@angular/http';

import {ActivatedRoute, Router} from "@angular/router";
import {getStorage} from "../../../theme/libs/utils";
import {ResModel} from "../../../theme/services";


@Injectable()
export class FormsService extends BaseService<any>{
   //审核流程
   projectProgres:any = [
    {text:"补填资料"},
    {text:"信用审核"},
    {text:"风控审核"},
    {text:"标的发布"},
     {text:"投资中"},
    {text:"满标审核"},
     {text:"还款中"},
     {text:"已结清"},
  ];
  //债转流程
  transferProgres:any = [
    {text:"债转审核/发布"},
    {text:"转让中"},
    {text:"满标审核"},
    {text:"还款中"},
    {text:"已结清"}
  ];
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    protected _httpInterceptorService: HttpInterceptorService,
    private _http: Http) {
    super(_httpInterceptorService);
    //this.setApi('/forms');
  }

  //查询借款会员信息（包括基本信息、信用、车辆、房屋等信息）
  public getLoanMember(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/loans/${loanApplyId}/member`, false).toPromise();
  }

  //查询征信信息
  getCreditByType(memberId, type): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',BASE_URL+`/members/${memberId}/credits/${type}`).toPromise();
  }

  //查询借款会员信息 == 查询借款会员信息
  public getProjectMember(projectId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/projects/${projectId}/member`, false).toPromise();
  }

  //查询借款申请信息（包括基本信息、抵押物、上传资料、房屋等信息）
  public getLoanApply(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/loans/${loanApplyId}/base`, false).toPromise();
  }

  //查询项目信息 == 借款申请信息
  public getProjectDetail(projectId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/projects/${projectId}/detail`, false).toPromise();
  }




  //查询投资记录
  public getLoanInvestRecords(projectId: string): Promise<any> {
    console.log('projectId='+projectId);
    return this._httpInterceptorService.request('GET', BASE_URL + `/projects/${projectId}/investment`, false).toPromise();
  }



  //查询借款审批记录
  public getLoanAuditRecords(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET',  BASE_URL+ `/loans/${loanApplyId}/audit`, false).toPromise();
  }


  //查询标的审批记录
  public getProjectAuditRecords(projectId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/projects/${projectId}/audit`, false).toPromise();
  }

  //更新借款会员信息
  public updateMember(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', BASE_URL + `/members/${memberId}/personBaseInfo`,params).toPromise();
  }

  //更新借款信息(补全资料)
  public updateLoanApply(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', BASE_URL + `/loans/${loanApplyId}`,params).toPromise();
  }
  //更新借款信息(满标审核)
  public updateLoanProject(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', BASE_URL + `/loans/audit/${loanApplyId}`,params).toPromise();
  }
  //新增会员车辆信息
  public addVehicle(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/members/${memberId}/car`,params).toPromise();
  }

  //新增会员房屋信息
  public addHouse(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/members/${memberId}/house`,params).toPromise();
  }

  //设置抵押车辆
  public pawnVehicle(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/loans/${loanApplyId}/pawnVehicle`,params).toPromise();
  }

  //设置抵押房产
  public pawnHouse(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/loans/${loanApplyId}/pawnHouse`,params).toPromise();
  }

  //删除审批资料
  public deleteFile(loanApplyId: string, fileId: string): Promise<any> {
    return this._httpInterceptorService.request('DELETE', BASE_URL + `/loans/${loanApplyId}/material/${fileId}`).toPromise();
  }

  //借款申请
  public loanApply(param: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', BASE_URL + `/loans/apply`, param).toPromise();
  }

  //借款审核
  public loanApplyAudit(loanApplyId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/loans/${loanApplyId}/audit`, param,false, 60000).toPromise();
  }

  //项目审核
  public projectAudit(projectId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL + `/projects/${projectId}/audit`, param, false, 60000).toPromise();
  }


  //下载审批资料
  public downloadFile(loanApplyId: string, fileId: string): Promise<any> {
    let headers = new Headers();
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    headers.set('Authorization', `${tokenType} ${accessToken}`);
    let options = new RequestOptions({headers, method: RequestMethod.Get, responseType:ResponseContentType.Blob});
    return this._http.get(BASE_URL + `/loans/${loanApplyId}/material/${fileId}/download`, options).toPromise();

  }

  //模糊查询用户列表（姓名字段，）
  public fuzzySearch(params): Promise<any> {
    return this._httpInterceptorService.request('GET',BASE_URL + `/members` ,params).toPromise();
  }
  /*
  edit by lily
  */
  //查询债转项目信息
  public getTransferDetail(projectId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL+`/transfer/full/info`,{id: projectId}).toPromise();
  }
  //查询债权转让审批记录
  public getTransferProjectAuditRecords(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL+`/transfer/${loanApplyId}/audit`, false).toPromise();
  }
  //债转审核/发布  满标划转审核
  public transferAudit(transferId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL+`/transfer/${transferId}/audit`, param, false, 60000).toPromise();
  }
  //债转手动流标审核
  public transferHandleFailAudit(transferId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL+`/transfer/${transferId}/audit`, param, false, 60000).toPromise();
  }
  //债转自动流标审核
  public transferAutoFailAudit(transferId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL+`/transfer/${transferId}/audit`, param, false, 60000).toPromise();
  }
  //查询提前还款信息
  public getRepaymentDetail(projectId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL+`/repayment/ahead/detail`,{projectId: projectId}).toPromise();
  }
  //提前还款审核
  public repaymentAudit(projectId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', BASE_URL+`/repayment/ahead/${projectId}/audit`, param, false, 60000).toPromise();
  }
  //查询还款记录
  public getLoanRepaymentRecords(projectId: string,memberId:string): Promise<any> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/loans/repayments`, {projectId: projectId,memberId:memberId}).toPromise();
  }
  /*
    end
    */

}
