import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {BaseService} from "../../../base.service";
import {SERVER} from "../../../const";
/*import Any = jasmine.Any;*/
import {Result} from "../../../model/result.class";
import {Storage} from "../../../model/basic_info/Storage";
import {StorageArea} from "../../../model/basic_info/StorageArea";


@Injectable()
export class OrgManageService {

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
    let url = `${this.orgManageUrl}/organizations`;
    return this.baseService.getAll(url);
  }

  /*
   * 根据组织id获取员工
   * */
  getStaffsByOrgId(orgId): Promise<Result> {
    let url = `${this.orgManageUrl}/organization/staffs/${orgId}`;
    return this.baseService.getAll(url);
  }

  operationRecord(data) {
    let url = `${this.orgManageUrl}/organization/operation`;
    return this.baseService.update(url,data);
  }

  updateStaffOrgId(data) {
    let url = `${this.orgManageUrl}/organization/staff`;
    return this.baseService.update(url,data);
  }

  addOrganization(data) {
    let url = `${this.orgManageUrl}/organization`;
    return this.baseService.create(url,data);
  }

  editOrganization(data) {
    let url = `${this.orgManageUrl}/organization`;
    return this.baseService.update(url, data);
  }

  delOrganization(orgId) {
    let url = `${this.orgManageUrl}/organization/${orgId}`;
    return this.baseService.delete(url);
  }



}


