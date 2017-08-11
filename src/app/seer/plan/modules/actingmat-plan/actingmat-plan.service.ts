import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../const";
import {ActingAndBudgetDto} from "./ActingAndBudgetDto";
import {SearchActingDto} from "./SearchActingDto";
import {DeleteDto} from "./components/attachDetail/DeleteDto";



@Injectable()
export class ActingmatPlanService {

  private getAllActingsUrl = SERVER+'/plan/acting';
  private addActingUrl = SERVER+'/plan/acting';
  private getActingByIdUrl = SERVER+'/plan/acting';
  private getBudgetByActingMatIdUrl = SERVER+'/plan/acting/budgets';
  private getBudgetByIdUrl = SERVER+'/plan/acting/budget';
  private getSupplierListUrl = SERVER+'/basicInfo/supplier';
  private getBrandListUrl = SERVER+'/sys/brand/search';
  private getStoreTreeDataUrl = SERVER+'/basic/target/getStoreList';
  private getStoreTreeUrl = SERVER+'/basic/target/getStoreTree';
  private getOrganizationsUrl = SERVER+'/basicinfo/organizations';
  private getStaffsByStaffOrgIdUrl = SERVER+'/basic/staff/org';
  private getActingByTermsUrl = SERVER+'/plan/acting/terms';
  private getStoreNamesByIdsUrl = SERVER+'/sys/customer/storeNames';

  private getActingByIdsUrl = SERVER+'/plan/acting/getActingByIds';

  private updateActingUrl = SERVER+'/plan/acting';
  private deleteByIdUrl = SERVER+'/plan/acting';
  private deleteSelectedActingsUrl = SERVER+'/plan/acting/deleteSelected';

  //上传附件相关
  private getAttachByBuzxIdUrl = SERVER+'/basic/attach/getByBuzId';
  private updateAttachUrl = SERVER+'/basic/attach/update';
  private updateAttacFilehUrl = SERVER+'/basic/attach/uploadFile';
  private deleteByBuzIdAndTypeUrl = SERVER+'/basic/attach/deleteByBuzIdAndType';


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

  getActings (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllActingsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActingByTerms (searchActingDto:SearchActingDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getActingByTermsUrl,searchActingDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActingById (id :string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getActingByIdUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActingByIds (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getActingByIdsUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBudgetByActingMatId (id :string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getBudgetByActingMatIdUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSupplierList(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getSupplierListUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBrandList (supplierId :string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getBrandListUrl+"?supplierId="+supplierId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addActing (actingAndBudgetDto:ActingAndBudgetDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addActingUrl,actingAndBudgetDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateActing (actingAndBudgetDto:ActingAndBudgetDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.updateActingUrl,actingAndBudgetDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeActing(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeAllSelectedActings (ids:Array<String>): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.deleteSelectedActingsUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoreTreeData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStoreTreeDataUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //上传附件相关
  updateAttachFile (fd): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateAttacFilehUrl,fd)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getContractAttach (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAttachByBuzxIdUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAttach (list:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateAttachUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteByBuzIdAndType(deleteDto:DeleteDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.deleteByBuzIdAndTypeUrl,deleteDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffs(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrganizationsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStaffsByStaffOrgId(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStaffsByStaffOrgIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoreTree(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStoreTreeUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoreNamesByIds (ids:Array<String>): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getStoreNamesByIdsUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}


