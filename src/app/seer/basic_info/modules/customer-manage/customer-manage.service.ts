import {Injectable} from '@angular/core';
import {SERVER} from "../../../const";
import {Headers, Http, RequestOptions, Response} from "@angular/http";



import {CustomerModel} from "./customer-model.class";


import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {Observable} from "rxjs";



@Injectable()
export class CustomerManageService {

  private brandManageUrl = SERVER+'/sys/customer';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<CustomerModel>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCustomer(): Promise<Result> {
    return this.baseService.getAll(this.brandManageUrl);
  }

  createCustomer(resource: CustomerModel): Promise<Result> {
    const url = `${this.brandManageUrl}/`;
    return this.baseService.create(url,resource);
  }

  getCustomerById(resourceId: string): Promise<Result> {
    const url = `${this.brandManageUrl}/${resourceId}`;
    return this.baseService.getById(url);
  }

  updateCustomer(resource: CustomerModel): Promise<Result> {
    const url = `${this.brandManageUrl}/`;
    return this.baseService.update(url,resource);
  }

  deleteCustomer(resourceId: string): Promise<Result> {
    const url = `${this.brandManageUrl}/${resourceId}`;
    return this.baseService.delete(url);
  }

  searchCustomer(param:any): Promise<Result> {
    const url = `${this.brandManageUrl}/search`;
    return this.baseService.search(url,param);
  }


  getDictByKey(dictKeyId: string): Promise<Result> {
    return this.baseService.getDictByKey(dictKeyId);
  }


  //导出模板Excel
  exportExcel(data :any): Promise<any> {
    return this.baseService.exportExcel(data);
  }

// //导出模板Excel
//   importExcel(fd): Promise<any> {
//     return this.baseService.importExcelByTemplate(fd);
//   }

  importExcel (fd): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(SERVER + "/sys/excel/importExcel",fd)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }


}
