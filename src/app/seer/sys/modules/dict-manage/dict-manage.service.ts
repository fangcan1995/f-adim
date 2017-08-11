import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {SERVER} from "../../../const";


@Injectable()
export class DictManageService {

  private getAllDictsUrl = SERVER + '/sys/dict';
  private addDictUrl = SERVER + '/sys/dict';
  private getDictByKeyIdUrl = SERVER + '/sys/dict/key/';

  private updateDictUrl = SERVER + '/sys/dict';
  private deleteByIdUrl = SERVER + '/sys/dict/';
  private deleteSelectedDictUrl = SERVER + '/sys/dict/deleteSelected';

  constructor(private http: Http) {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
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

  getDicts(): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.getAllDictsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDictByKeyId(key): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.getDictByKeyIdUrl + key, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addDict(dict: Object): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.addDictUrl, dict, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateDict(dict: Object): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.updateDictUrl, dict, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeDict(id): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.delete(this.deleteByIdUrl + "/" + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedDicts(ids: Array<String>): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.deleteSelectedDictUrl, ids, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


