import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SearchAllocationRepertoryDto} from "./SearchAllocationRepertoryDto";
import {SERVER} from "../../../../../const";
import {UpdateAllocationRepertorysDto} from "./UpdateAllocationRepertorysDto";


@Injectable()
export class AllocationRepertoryCheckService {


  private getAllRepertorysUrl = SERVER+'/inventory/repertory';
  private getRepertoryByTermsUrl = SERVER+'/inventory/repertory/allocation/terms';
  private updateRepertoryUrl = SERVER+'/inventory/repertory/upd';
  private updateSelectedRepertorysUrl = SERVER+'/inventory/repertory/updateSelected';

  private getSuppliersUrl = SERVER+'/basicInfo/supplier';

  private getBrandsByIdUrl = SERVER+'/sys/brand/search';

  private getStoragesUrl = SERVER+'/basicinfo/storages';

  private getStoragesByIdUrl = SERVER+'/basicinfo/storage';

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

  getRepertorys (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllRepertorysUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllocationRepertoryByTerms(searchAllocationRepertoryDto: SearchAllocationRepertoryDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getRepertoryByTermsUrl,searchAllocationRepertoryDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateRepertoryCheck (repertory:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateRepertoryUrl,repertory,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBrandsById(supplierId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getBrandsByIdUrl+"/?supplierId="+supplierId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllSuppliers(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getSuppliersUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoragesById(storageId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStoragesByIdUrl+"/"+storageId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllStorages(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStoragesUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSelectedRepertorys (updateAllocationRepertorysDto:UpdateAllocationRepertorysDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateSelectedRepertorysUrl,updateAllocationRepertorysDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


