import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../../../const";



@Injectable()
export class ExStorageService {

 // private addUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/add';
  private getListUrl = SERVER+'/inventory/reserve/outbound-orders';
  private getOrderDetailUrl =   SERVER+ '/inventory/reserve/outbound-order/';
  private getOrderDetaiListlUrl = SERVER+ '/inventory/reserve/outbound-order-goods';
  private getLinkOrderListlUrl = SERVER+  '/inventory/reserve/outbound-orders';

  private getMaterialOrGiftUrl = SERVER+ '/inventory/reserve/outbound-order-goods';


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
  getList (data): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getListUrl,data,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getOrderDetail (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getOrderDetailUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  getDetailList (data): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getOrderDetaiListlUrl,data,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMaterialOrGift (data): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getMaterialOrGiftUrl,data,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  getAssociatedOrderList (data): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getLinkOrderListlUrl,data,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



}


