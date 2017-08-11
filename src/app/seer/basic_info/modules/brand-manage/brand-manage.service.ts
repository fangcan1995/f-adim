import {Injectable} from '@angular/core';
import {SERVER} from "../../../const";
import {Headers, Http, RequestOptions, Response} from "@angular/http";



import {BrandModel} from "./brand-model.class";


import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {Observable} from "rxjs";


@Injectable()
export class BrandManageService {

  private brandManageUrl = SERVER+'/sys/brand';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<BrandModel>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getBrand(): Promise<Result> {
    return this.baseService.getAll(this.brandManageUrl);
  }

  createBrand(resource: BrandModel): Promise<Result> {
    const url = `${this.brandManageUrl}/`;
    return this.baseService.create(url,resource);
  }

  getBrandById(resourceId: string): Promise<Result> {
    const url = `${this.brandManageUrl}/${resourceId}`;
    return this.baseService.getById(url);
  }

  updateBrand(resource: BrandModel): Promise<Result> {
    const url = `${this.brandManageUrl}/`;
    return this.baseService.update(url,resource);
  }

  deleteBrand(resourceId: string): Promise<Result> {
    const url = `${this.brandManageUrl}/${resourceId}`;
    return this.baseService.delete(url);
  }

  searchBrand(param:any): Promise<Result> {
    const url = `${this.brandManageUrl}/search`;
    return this.baseService.search(url,param);
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
