import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";
/*import Any = jasmine.Any;*/
import {Result} from "../../model/result.class";


@Injectable()
export class OrgService {

  private orgManageUrl = SERVER + '/basicinfo';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<any>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*
   * 查询全部库房
   * */
  getOrganizations(): Promise<Result> {
    //let url = `${this.orgManageUrl}/organizations`;
    let url = 'http://172.16.4.62:8090/organizations/all';   //测试用地址
    return this.baseService.getAll(url);

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

  /*
   * 根据组织id获取员工
   * */
  getStaffsByOrgId(orgId): Promise<Result> {
    //let url = `${this.orgManageUrl}/organization/staffs/${orgId}`;
    let url = `http://172.16.4.62:8090/organizations/staffs/${orgId}`;   //测试用地址
    return this.baseService.getAll(url);
  }

  operationRecord(data) {
    //let url = `${this.orgManageUrl}/organization/operation`;
    let url = `http://172.16.4.62:8090/organizations/operation`;   //测试用地址
    return this.baseService.update(url,data);
  }z

  updateStaffOrgId(data) {
    //let url = `${this.orgManageUrl}/organization/staff`;
    let url = `http://172.16.4.62:8090/organizations/staff`;   //测试用地址
    return this.baseService.update(url,data);
  }

  addOrganization(data) {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this.baseService.create(url,data);
  }

  editOrganization(data) {
    //let url = `${this.orgManageUrl}/organization`;
    let url = `http://172.16.4.62:8090/organizations`;   //测试用地址
    return this.baseService.update(url, data);
  }

  delOrganization(orgId) {
    //let url = `${this.orgManageUrl}/organization/${orgId}`;
    let url = `http://172.16.4.62:8090/organizations/${orgId}`;   //测试用地址
    return this.baseService.delete(url);
  }



}


