///<reference path="../../../../../node_modules/@angular/http/src/base_request_options.d.ts"/>
import { Injectable } from '@angular/core';

import {BASE_URL, TEST_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {
  Http, Headers, Request, RequestMethod, Response, RequestOptions, URLSearchParams,
  ResponseContentType
} from '@angular/http';
import {
  COMPLETION, DETAIL, FILLAUDIT, FIRSTAUDIT, PREPAYAUDIT, RELEASE, SECONDAUDIT, TEST
} from "./form-type";
import {ActivatedRoute, Router} from "@angular/router";
import {getStorage} from "../../../theme/libs/utils";

@Injectable()
export class FormsService extends BaseService<any>{

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
    return this._httpInterceptorService.request('GET', TEST_URL + `/loans/${loanApplyId}/member`, false).toPromise();
  }

  //查询借款申请信息（包括基本信息、抵押物、上传资料、房屋等信息）
  public getLoanApply(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', TEST_URL + `/loans/${loanApplyId}/base`, false).toPromise();
  }

  //查询投资记录
  public getLoanInvestRecords(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', TEST_URL + `/loans/${loanApplyId}/investment`, false).toPromise();
  }

  //查询审批记录
  public getLoanAuditRecords(loanApplyId: string): Promise<any> {
    return this._httpInterceptorService.request('GET', TEST_URL + `/loans/${loanApplyId}/audit`, false).toPromise();
  }

  //更新借款会员信息
  public updateMember(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', TEST_URL + `/members/${memberId}/personBaseInfo`,params).toPromise();
  }

  //更新借款信息
  public updateLoanApply(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', TEST_URL + `/loans/${loanApplyId}`,params).toPromise();
  }

  //新增会员车辆信息
  public addVehicle(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', TEST_URL + `/members/${memberId}/car`,params).toPromise();
  }

  //新增会员房屋信息
  public addHouse(memberId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', TEST_URL + `/members/${memberId}/house`,params).toPromise();
  }

  //设置抵押车辆
  public pawnVehicle(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', TEST_URL + `/loans/${loanApplyId}/pawnVehicle`,params).toPromise();
  }

  //设置抵押房产
  public pawnHouse(loanApplyId: string, params: any): Promise<any> {
    return this._httpInterceptorService.request('POST', TEST_URL + `/loans/${loanApplyId}/pawnHouse`,params).toPromise();
  }

  //删除审批资料
  public deleteFile(loanApplyId: string, fileId: string): Promise<any> {
    return this._httpInterceptorService.request('DELETE', TEST_URL + `/loans/${loanApplyId}/material/${fileId}`).toPromise();
  }

  //借款申请
  public loanApply(param: any): Promise<any> {
    return this._httpInterceptorService.request('PUT', TEST_URL + `/loans/apply`, param).toPromise();
  }

  //借款审核
  public loanApplyAudit(loanApplyId: string, param: any): Promise<any> {
    return this._httpInterceptorService.request('POST', TEST_URL + `/loans/${loanApplyId}/audit`, param).toPromise();
  }




  //下载审批资料
  public downloadFile(loanApplyId: string, fileId: string): Promise<any> {
    let headers = new Headers();
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    headers.set('Authorization', `${tokenType} ${accessToken}`);
    let options = new RequestOptions({headers, method: RequestMethod.Get, responseType:ResponseContentType.Blob});
    //return this._http.get(TEST_URL + `/loans/${loanApplyId}/material/${fileId}/download`, options).toPromise();
    return this._http.get("http://172.16.1.234:9080/messages/test?access_token=a7ae3fb8-db52-488e-a983-033d2ce4620f", options).toPromise();

  }

  //模糊查询用户列表（姓名字段，）
  public fuzzySearch(params): Promise<any> {
    return this._httpInterceptorService.request('GET',TEST_URL + `/members` ,params).toPromise();
  }










  //设置动作按钮
  public setAction(status) : any {

    let actions;
    switch (status) {

      //待补填资料
      case "10":
        //actions = [DETAIL, COMPLETION]; break;
        actions = [DETAIL]; break;

      //待初审
      case "20":
        //actions = [DETAIL, FIRSTAUDIT]; break;
        actions = [DETAIL]; break;

      //待复审
      case "30":
        //actions = [DETAIL, SECONDAUDIT]; break;
        actions = [DETAIL]; break;

      //待标的发布
      case "40":
        //actions = [DETAIL, RELEASE]; break;
        actions = [DETAIL]; break;

      //投资中
      case "50":
        //actions = [DETAIL, TEST]; break;
        actions = [DETAIL]; break;

      //待满标审核
      case "60":
        //actions = [DETAIL, FILLAUDIT]; break;
        actions = [DETAIL]; break;

      //还款中
      case "70":
        actions = [DETAIL, TEST]; break;

      //提前还款申请
      case "80":
        //actions = [DETAIL, PREPAYAUDIT]; break;
        actions = [DETAIL]; break;

      //待提前还款
      case "81":
        actions = [DETAIL, TEST]; break;

      //已流标
      case "90":
        actions = [DETAIL]; break;

      //已结清
      case "100":
        actions = [DETAIL]; break;

      //default
      default:
        actions = [DETAIL]; break;
    }
    return actions;
  }

  public loadForm(formType,id) {

    let url = `/business/forms/`;
    switch (formType) {

      //新增
      case 'create':
        this._router.navigate([url + 'create'],{relativeTo: this.route}); break;

      //补填资料
      case 'completion':
        this._router.navigate([url + 'completion', id],{relativeTo: this.route}); break;

      //初审
      case 'firstAudit':
        this._router.navigate([url + 'firstAudit', id],{relativeTo: this.route}); break;

      //复审
      case 'secondAudit':
        this._router.navigate([url + 'secondAudit', id],{relativeTo: this.route}); break;

      //发布
      case 'release':
        this._router.navigate([url + 'release', id],{relativeTo: this.route}); break;

      //满标
      case 'fillAudit':
        this._router.navigate([url + 'fillAudit', id],{relativeTo: this.route}); break;

      //提前还款审核
      case 'prepayAudit':
        this._router.navigate([url + 'fillAudit', id],{relativeTo: this.route}); break;

      //详情
      case 'preview':
        this._router.navigate([url + 'detail', id],{relativeTo: this.route}); break;

      //测试页面
      case 'test':
        this._router.navigate([url + 'fillAudit', id],{relativeTo: this.route}); break;

    }
  }


  createIntention(loan: any) {

  }
}
