import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SERVER} from '../../../const';


@Injectable()
export class contractService {
  //contract
  private getAllcontractsUrl = SERVER+'/basic/contract/getAll';
  private addcontractUrl = SERVER+'/basic/contract/addcontract';
  private getcontractById = SERVER+'/basic/contract/';

  private updatecontractUrl = SERVER+'/basic/contract/updatecontract';
  private deleteByIdUrl = SERVER+'/basic/contract/deletecontract';
  private deleteSelectedcontractUrl = SERVER+'/basic/contract/deleteSelectedcontract';

  private getcontractsbytypeandsupplierUrl = SERVER+'/basic/contract/getcontractsbytypeandsupplier';
  //brand
  private getAllContractBrandUrl = SERVER+'/basic/contractBrand/getAll';
  private updatecontractBrandUrl = SERVER+'/basic/contractBrand/updateContractBrand';

  //rebate
  private getRebateByBrandIdUrl = SERVER+'/basic/rebate/getById';
  private updateRebateUrl = SERVER+'/basic/rebate/updateContractBrand';

  //attach
  private getAttachByBuzxIdUrl = SERVER+'/basic/attach/getByBuzId';
  private updateAttachUrl = SERVER+'/basic/attach/update';
  private updateAttacFilehUrl = SERVER+'/basic/attach/uploadFile';
  private deleteByBuzIdUrl = SERVER+'/basic/attach/deleteByBuzId/';

  private searchUrl = SERVER+'/basic/contract/search';

  constructor (private http: Http) {}

  getContractAttach (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAttachByBuzxIdUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteByBuzId(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteByBuzIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchContract (obj): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.searchUrl,obj,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  //通过合同类型和乙方ID查合同列表
  getcontractsbytypeandsupplier (obj): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getcontractsbytypeandsupplierUrl,obj,options)
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

  updateAttachFile (fd): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateAttacFilehUrl,fd)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getcontracts (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllcontractsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //通过合同ID去品牌LIST
  getContractBrand (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllContractBrandUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //通过品牌ID取返利LIST
  getRebateByBrandId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getRebateByBrandIdUrl+"/"+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateContractBrand (list:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updatecontractBrandUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateRebate (list:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateRebateUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  addcontract (contract:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(contract)
    return this.http.post(this.addcontractUrl,contract,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  updatecontract (contract:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updatecontractUrl,contract,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removecontract(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedcontracts (ids:String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.deleteSelectedcontractUrl+"/"+ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

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
}


