import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {NewStaffDto} from "./NewStaffDto";
import {SearchStaffDto} from "./SearchStaffDto";
import {SERVER} from "../../const";



@Injectable()
export class StaffManageService {

  private getAllRolesUrl = SERVER+'/sys/role';

  private getAllStaffsUrl = SERVER+'/basic/staff/all';
  private addStaffUrl = SERVER+'/basic/staff/ins';
  private getStaffByTermsUrl = SERVER+'/basic/staff/terms';

  private updateStaffUrl = SERVER+'/basic/staff/upd';
  private deleteByIdUrl = SERVER+'/basic/staff/';
  private getStaffByIdUrl = SERVER+'/basic/staff/';
  private deleteSelectedStaffUrl = SERVER+'/basic/staff/deleteSelected';
  private getOrgByIdUrl = SERVER+'/basicinfo/organization';

  private excelExport = SERVER + '/sys/excel/download';

  constructor (private http: Http) {}

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getCurrentRoles(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllRolesUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffs (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllStaffsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getOrgById(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrgByIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffByTerms(searchStaffDto: SearchStaffDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getStaffByTermsUrl,searchStaffDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addStaff (newStaffDto:NewStaffDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addStaffUrl,newStaffDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStaff (staff:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateStaffUrl,staff,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeStaff(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffById(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStaffByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedStaffs (ids:Array<String>): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.deleteSelectedStaffUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // //导出模板Excel
  // exportExcel(data :any): Promise<any> {
  //   return this.baseService.exportExcel(data);
  // }

  //导出Excel
  exportExcel(data: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.excelExport,data,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

// //导出模板Excel
//   importExcel(fd): Promise<any> {
//     return this.baseService.importExcelByTemplate(fd);
//   }

  importExcel (fd): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(SERVER + "/system/excel/importExcel",fd)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


