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
    return this._httpInterceptorService.request('GET','http://172.16.4.62:8090/organizations/all',{}, true).toPromise();
  }


  // 表格假数据
 getData(): Promise<any>{
   return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
              {"name":"xxxx","place":"王大崔","tel":"1333333333"},
              {"name":"xxxx","place":"王大崔","tel":"1333333333"},
              {"name":"xxxx","place":"王大崔","tel":"1333333333"},
            ]
        }
      )
    })
 }


   /* 根据组织id获取员工
   * */
  getStaffsByOrgId(orgId): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`http://172.16.4.62:8090/organizations/staffs/${orgId}`).toPromise();
  }

  operationRecord(data): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`http://172.16.4.62:8090/organizations/operation`, data).toPromise();
  }

  /*updateStaffOrgId(data) {
    //let url = `${this.orgManageUrl}/organization/staff`;
    let url = `http://172.16.4.62:8090/organizations/staff`;   //测试用地址
    return this.baseService.update(url,data);
  }*/

  updateStaffOrgId(data): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT',`http://172.16.4.62:8090/organizations/staff`, data).toPromise();
  }

  /*addOrganization(data) {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this.baseService.create(url,data);
  }*/

  addOrganization(data): Promise<ResModel> {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this._httpInterceptorService.request('POST', url, data).toPromise();
  }

  /*editOrganization(data) {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this.baseService.update(url, data);
  }*/

  editOrganization(data): Promise<ResModel> {
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this._httpInterceptorService.request('PUT', url, data).toPromise();
  }

  /*delOrganization(orgId) {
    //let url = `${this.orgManageUrl}/organization/${orgId}`;
    let url = `http://172.16.4.62:8090/organizations/${orgId}`;   //测试用地址
    return this.baseService.delete(url);
  }*/

  delOrganization(orgId): Promise<ResModel> {
    //let url = `${this.orgManageUrl}/organization/${orgId}`;
    let url = `http://172.16.4.62:8090/organizations/${orgId}`;   //测试用地址
    return this._httpInterceptorService.request('DELETE', url).toPromise();
  }



}


