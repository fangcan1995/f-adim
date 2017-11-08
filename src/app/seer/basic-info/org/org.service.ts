import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
} from "../../../theme/services";
import {SERVER} from "../../const";


@Injectable()
export class OrgService extends BaseService<any>{

  constructor(
    protected _httpInterceptorService:HttpInterceptorService
  ) {
    super(_httpInterceptorService);
    this.setApi(API['ORG']);
  }

  private orgManageUrl = SERVER + '/basicinfo';
  private headers = new Headers({'Content-Type': 'application/json'});


  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*
   * 查询全部库房
   * */
  getOrganizations(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET','http://172.16.7.4:8020/permission/organizations/all',{}, true).toPromise();
  }


  deleteOne (id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `http://172.16.7.4:8020/permission/organizations/staffs/staffid?employerId=${id}`, {}, true).toPromise();
  }

  // 表格假数据
 getData(params): Promise<any>{
   return this._httpInterceptorService.request('GET', `http://172.16.7.4:8020/permission/organizations`, params, true).toPromise();
 }


   /* 根据组织id获取员工
   * */

  getOrganizationsById (orgId): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.7.4:8020/permission/organizations/${orgId}?departmentId=${orgId}`, {}, true).toPromise();
  }

  getStaffsByOrgId(orgId): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`http://172.16.7.4:8020/permission/organizations/staffs/${orgId}`,{}, true).toPromise();
  }

  operationRecord(data): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`http://172.16.7.4:8020/permission/organizations/operation`, data).toPromise();
  }

  /*updateStaffOrgId(data) {
    //let url = `${this.orgManageUrl}/organization/staff`;
    let url = `http://172.16.4.62:8090/organizations/staff`;   //测试用地址
    return this.baseService.update(url,data);
  }*/

  updateStaffOrgId(data): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT',`http://172.16.7.4:8020/permission/organizations/staff`, data).toPromise();
  }

  /*addOrganization(data) {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this.baseService.create(url,data);
  }*/

  addOrganization(data): Promise<ResModel> {
    let url = `http://172.16.7.4:8020/permission/organizations`;   //测试用地址
    console.log(data);
    return this._httpInterceptorService.request('POST', url, data, true).toPromise();
  }

  /*editOrganization(data) {
    let url = `http://172.16.7.4:8020/permission/organizations/`;   //测试用地址
    return this.baseService.update(url, data);
  }*/

  editOrganization(data): Promise<ResModel> {
    let url = `http://172.16.7.4:8020/permission/organizations/`;   //测试用地址
    return this._httpInterceptorService.request('PUT', url, data, true).toPromise();
  }

  /*delOrganization(orgId) {
    //let url = `${this.orgManageUrl}/organization/${orgId}`;
    let url = `http://172.16.4.62:8090/organizations/${orgId}`;   //测试用地址
    return this.baseService.delete(url);
  }*/

  delOrganization(orgId): Promise<ResModel> {
    let url = `http://172.16.7.4:8020/permission/organizations/${orgId}`;   //测试用地址
    return this._httpInterceptorService.request('DELETE', url,{}, true).toPromise();
  }

  /*设置员工为组织机构的负责人*/
  configDepartLeader(params): Promise<ResModel> {
    let url = `http://172.16.7.4:8020/permission/organizations/${params.departmentId}/staffs/${params.id}`;
    return this._httpInterceptorService.request('PUT', url, {}, true).toPromise();//测试用地址
  }


}


