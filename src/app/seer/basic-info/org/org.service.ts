import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {
	BaseService,
	HttpInterceptorService,
	API,
	BASE_URL,
	ResModel,
	TEST_URL
} from "../../../theme/services";
import { SERVER } from "../../const";

// let url = 'http://172.16.1.252'
@Injectable()
export class OrgService extends BaseService<any>{

	constructor(
		protected _httpInterceptorService: HttpInterceptorService
	) {
		super(_httpInterceptorService);
		this.setApi(API['ORG']);
	}

	/* private orgManageUrl = SERVER + '/basicinfo';
	private headers = new Headers({ 'Content-Type': 'application/json' });


	private handleError(error: any): Promise<any> {
		console.error('出错啦', error); // for demo purposes only
		return Promise.reject(error.message || error);
	} */

	/*
	 * 查询全部库房
	 * */
	getOrganizations(): Promise<ResModel> {
		return this._httpInterceptorService.request('GET', `${TEST_URL}/organizations/all`, {}, false).toPromise();
	}


	deleteOne(id): Promise<ResModel> {
		return this._httpInterceptorService.request('DELETE', `${TEST_URL}/organizations/staffs/${id}?`, {}, false).toPromise();
	}

	// 表格数据
	getData(params): Promise<any> {
		return this._httpInterceptorService.request('GET', `${TEST_URL}/organizations`, params, false).toPromise();
	}


	/* 根据组织id获取员工
	* */

	getOrganizationsById(orgId): Promise<ResModel> {
		return this._httpInterceptorService.request('GET', `${TEST_URL}/organizations/${orgId}?departmentId=${orgId}`, {}, false).toPromise();
	}

	getStaffsByOrgId(orgId): Promise<ResModel> {
		return this._httpInterceptorService.request('GET', `${TEST_URL}/organizations/staffs/${orgId}`, {}, false).toPromise();
	}

	operationRecord(data): Promise<ResModel> {
		return this._httpInterceptorService.request('GET', `${TEST_URL}/organizations/operation`, data).toPromise();
	}



	updateStaffOrgId(data): Promise<ResModel> {
		return this._httpInterceptorService.request('PUT', `${TEST_URL}/organizations/staff`, data).toPromise();
	}


	addOrganization(data): Promise<ResModel> {
		let url = `${TEST_URL}/organizations`;   //测试用地址
		console.log(data);
		return this._httpInterceptorService.request('POST', url, data).toPromise();
	}



	editOrganization(data): Promise<ResModel> {
		let url = `${TEST_URL}/organizations`;   //测试用地址
		console.log(data);
		return this._httpInterceptorService.request('PUT', url, data).toPromise();
	}


	delOrganization(orgId): Promise<ResModel> {
		let url = `${TEST_URL}/organizations/${orgId}`;   //测试用地址
		return this._httpInterceptorService.request('DELETE', url, {}).toPromise();
	}

	/*设置员工为组织机构的负责人*/
	configDepartLeader(params): Promise<ResModel> {
		let url = `${TEST_URL}/organizations/department/employerChangeLeader`;
		return this._httpInterceptorService.request('PUT', url, params).toPromise();//测试用地址
	}

	/* 通过组织id 和员工 id获取员工的信息 */
	getStaffInfo(id): Promise<ResModel> {
		let url = `${TEST_URL}/staffs/${id}`;
		return this._httpInterceptorService.request('GET', url, {}).toPromise();
	}

	//批量调换员工部门
	putDepartment(id, ids): Promise<ResModel> {
		let url = `${TEST_URL}/organizations/${id}/batchStaffs/${ids}`;
		return this._httpInterceptorService.request('PUT', url, {}).toPromise();
	}
}


