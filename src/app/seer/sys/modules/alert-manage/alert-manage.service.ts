import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SERVER} from '../../../const';


@Injectable()
export class alertService {

  private getAllAlertsUrl = SERVER+'/sys/alert/getAll';
  private addAlertUrl = SERVER+'/sys/alert/addAlert';
  private getAlertById = SERVER+'/sys/alert/';

  private updateAlertUrl = SERVER+'/sys/alert/updateAlert';
  private deleteByIdUrl = SERVER+'/sys/alert/deleteAlert';
  private deleteSelectedAlertUrl = SERVER+'/sys/alert/deleteSelectedAlert';

  private getAlertConfigUrl = SERVER+'/sys/alert/getAlertConfig';
  private addAlertConfigUrl = SERVER+'/sys/alert/addAlertConfig';
  private getAlertsByIdsUrl = SERVER+'/sys/alert/getAlertsByIds';

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

  getAlertsByIds(ids:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getAlertsByIdsUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addAlertConfig(config:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addAlertConfigUrl,config,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAlertConfig (config): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getAlertConfigUrl,config,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getAlerts (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllAlertsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addAlert (alert:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addAlertUrl,alert,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAlert (alert:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateAlertUrl,alert,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeAlert(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedAlerts (ids:String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.deleteSelectedAlertUrl+"/"+ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


