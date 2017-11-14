import { Injectable } from '@angular/core';

import {BASE_URL, BaseService} from "../../../theme/services/base.service";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service";
import {Http, RequestOptions, ResponseContentType} from "@angular/http";
import {
  COMPLETION, DETAIL, FILLAUDIT, FIRSTAUDIT, PREPAYAUDIT, RELEASE, SECONDAUDIT
} from "./workflow-action";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class CommonService extends BaseService<any>{

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    protected _httpInterceptorService: HttpInterceptorService,
    private _http: Http) {
    super(_httpInterceptorService);
    this.setApi('/intentions/loan');
  }

  //新增意向申请
  public createIntention(params): Promise<any> {
    let url = BASE_URL + '/subject/intentions/apply';
    return this._httpInterceptorService.request('POST', url, params, false).toPromise();
  }

  //模糊查询用户列表（姓名字段，）
  public fuzzySearch(params): Promise<any> {
    let url = BASE_URL + '/member/members/';
    return this._httpInterceptorService.request('GET', url, params, false).toPromise();
  }

  //获取标的详情
  public getProjectById(id): Promise<any> {
    let url = BASE_URL + `/subject/intentions/fill/${id}`;
    return this._httpInterceptorService.request('GET', url).toPromise();
  }

  //更新会员信息
  public updateMember(params: any): Promise<any> {
    let url = BASE_URL + `/member/members/${params["memberId"]}/baseInfo`;
    return this._httpInterceptorService.request('PUT', url, params, false).toPromise();
  }

  //查询会员信用信息（第一次获取会员信用信息）
  public getMemberCredit(memberId: string, creditType: string): Promise<any> {
    let url = BASE_URL + `/member/members/${memberId}/credits?creditType=${creditType}`;
    return this._httpInterceptorService.request('GET', url, false).toPromise();
  }

  //更新借款信息
  public updateLoan(params?): Promise<any> {
    let url = BASE_URL + '/subject/intentions/loan';
    return this._httpInterceptorService.request('PUT', url, params, false).toPromise();
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

  //下载
  public downloadFile(param: any): Promise<any> {
    let url = BASE_URL + `/tool/files/download?id=${param.id}`
    return this._http.get(url, new RequestOptions({
      responseType: ResponseContentType.Blob
    })).toPromise();
  }

  //删除
  public deleteFile(id: string): Promise<any> {
    let url = BASE_URL + `/tool/files/${id}`
    return this._httpInterceptorService.request('DELETE', url, false).toPromise();
  }

  //补填资料
  public completion(param: any): Promise<any> {
    let url = BASE_URL + `/subject/intentions/${param.id}`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //审核
  public audit(param: any): Promise<any> {
    let url = BASE_URL + `/subject/projects/audit`
    return this._httpInterceptorService.request('POST', url, param, false).toPromise();
  }

  //设置动作按钮
  public setAction(status) : any {

    let actions;
    switch (status) {

      //待补填资料
      case "10":
        actions = [DETAIL, COMPLETION]; break;

      //待初审
      case "20":
        actions = [DETAIL, FIRSTAUDIT]; break;

      //待复审
      case "30":
        actions = [DETAIL, SECONDAUDIT]; break;

      //待标的发布
      case "40":
        actions = [DETAIL, RELEASE]; break;

      //投资中
      case "50":
        actions = [DETAIL]; break;

      //待满标审核
      case "60":
        actions = [DETAIL, FILLAUDIT]; break;

      //还款中
      case "70":
        actions = [DETAIL]; break;

      //提前还款申请
      case "80":
        actions = [DETAIL, PREPAYAUDIT]; break;

      //待提前还款
      case "81":
        actions = [DETAIL]; break;

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

  public loadForm(formType, param) {

    let url = `/business/forms/`;
    switch (formType) {

      //新增
      case 'create':
        this._router.navigate([url + 'create'],{relativeTo: this.route}); break;

      //补填资料
      case 'completion':
        this._router.navigate([url + 'completion', param.id],{relativeTo: this.route}); break;

      //初审
      case 'firstAudit':
        this._router.navigate([url + 'firstAudit', param.id],{relativeTo: this.route}); break;

      //复审
      case 'secondAudit':
        this._router.navigate([url + 'secondAudit', param.id],{relativeTo: this.route}); break;

      //发布
      case 'release':
        this._router.navigate([url + 'release', param.id],{relativeTo: this.route}); break;

      //满标
      case 'fillAudit':
        this._router.navigate([url + 'fillAudit', param.id],{relativeTo: this.route}); break;

      //提前还款审核
      case 'prepayAudit':
        this._router.navigate([url + 'fillAudit', param.id],{relativeTo: this.route}); break;

      //详情
      case 'preview':
        this._router.navigate([url + 'detail', param.id],{relativeTo: this.route}); break;
    }
  }
}
