import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../const";



@Injectable()
export class companyService {

  private getAllUrl = SERVER+'/sys/company/getAll';
  private addCompanyUrl = SERVER+'/sys/company/add';
  private updateCompanyUrl = SERVER+'/sys/company/update';

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

  getAll (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  addCompany (company): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addCompanyUrl,company,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCompany (company): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateCompanyUrl,company,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

}



