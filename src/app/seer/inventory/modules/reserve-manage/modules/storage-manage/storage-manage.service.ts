import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../../../const";
import {BaseService} from "../../../../../base.service";
import {Goods} from "../../../../../model/basic_info/goods";
import {Result} from "../../../../../model/result.class";




@Injectable()
export class StorageService {

  private addUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/add';
  private goodsManageUrl = SERVER + '/basicInfo/goods';
  private storageManageUrl = SERVER + '/basicinfo';
  private addrepertoryurl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/addrepertory';

  private getSoGoodsByOrderIdUrl = SERVER+'/inventory/sales/saleOrder/saleGoods/number/';
  private updatepurchaseorderUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/updatepurchaseorder';
  private updatesaleorderUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/updatesaleorder';

  private addpurchaseorderUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/addpurchaseorder';
  private addpurchaseordergoodsUrl = SERVER+'/inventory/reserve/warehouse/inwarehouserecord/addpurchaseordergoods';

  //constructor (private http: Http) {}
  constructor(private http: Http, private baseService:BaseService<Goods>) {
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

  addpurchaseorder(order): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addpurchaseorderUrl,order,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addpurchaseordergoods(list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addpurchaseordergoodsUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatepurchaseorder(order): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updatepurchaseorderUrl,order,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatesaleorder(order): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updatesaleorderUrl,order,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSoGoodsByOrderId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getSoGoodsByOrderIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  add (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addrepertory (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addrepertoryurl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchGoods(param:any): Promise<Result> {
    const url = `${this.goodsManageUrl}`;
    return this.baseService.search(url, param);
  }


  getStorages(): Promise<Result> {
    let url = `${this.storageManageUrl}/storages`;
    return this.baseService.getAll(url);
  }




}


