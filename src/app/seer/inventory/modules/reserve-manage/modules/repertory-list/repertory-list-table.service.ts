import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SearchRepertoryDto} from "./SearchRepertoryDto";
import {SERVER} from "../../../../../const";
import {UpdateRepertorysDto} from "./UpdateRepertorysDto";


@Injectable()
export class RepertoryListTableService {


  private getAllRepertorysUrl = SERVER+'/inventory/repertory';
  private getRepertoryByTermsUrl = SERVER+'/inventory/repertory/terms';
  private getAllRepertoryListUrl = SERVER+'/inventory/repertory/list';
  private GetRepertoryListByTermsUrl = SERVER+'/inventory/repertory/repertoryList';
  private updateRepertoryUrl = SERVER+'/inventory/repertory/upd';
  private deleteRepertoryUrl = SERVER+'/inventory/repertory';
  private updateSelectedRepertorysUrl = SERVER+'/inventory/repertory/updateSelected';

  private getStoragesUrl = SERVER+'/basicinfo/storages';

  private getStorageAreasByIdUrl = SERVER+'/basicinfo/storageAreas/storageId';

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

  getRepertoryByTerms(searchRepertoryDto: SearchRepertoryDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getRepertoryByTermsUrl,searchRepertoryDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRepertoryList (): Observable<any> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.getAllRepertoryListUrl,options)
        .map(this.extractData)
        .catch(this.handleError);
    }

  getRepertoryListByTerms(searchRepertoryDto: SearchRepertoryDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.GetRepertoryListByTermsUrl,searchRepertoryDto,options)
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

  deleteRepertoryCheck (id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteRepertoryUrl+'/'+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStorageAreasById(storageId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStorageAreasByIdUrl+"/"+storageId,options)
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


  updateSelectedRepertorys (updateRepertorysDto:UpdateRepertorysDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateSelectedRepertorysUrl,updateRepertorysDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


