import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SearchTargetDto} from "./SearchTargetDto";
import {SERVER} from "../../../const";
import {BrandTreeDto} from "./BrandTreeDto";
import {StoreTreeDto} from "./StoreTreeDto";



@Injectable()
export class TargetManageService {

  private addTargetUrl = SERVER+'/basic/target/ins';
  private getTargetByTermsUrl = SERVER+'/basic/target/terms';
  private updateTargetUrl = SERVER+'/basic/target/upd';
  private deleteTargetByIdUrl = SERVER+'/basic/target';
  private deleteAllTargetUrl = SERVER+'/basic/target/deleteSelected';
  private getOrganizationsUrl = SERVER+'/basicinfo/organizations';
  private getStaffsByStaffOrgIdUrl = SERVER+'/basic/staff/org';
  //门店相关API
  private getBrandTreeDataUrl = SERVER+'/basic/target/getBrandTree';
  private getStoreTreeDataUrl = SERVER+'/basic/target/getStoreTree';
  private updateStoreUrl = SERVER+'/basic/target/updateStore';
  private updateBrandUrl = SERVER+'/basic/target/updateBrand';

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

  getStaffsByStaffOrgId(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStaffsByStaffOrgIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getOrganizations(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrganizationsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTargetByTerms(searchTargetDto: SearchTargetDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getTargetByTermsUrl,searchTargetDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addTarget (target:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addTargetUrl,target,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateTarget (target:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateTargetUrl,target,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBrandTreeData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getBrandTreeDataUrl, options)
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

  updateBrand (brandTreeDto:BrandTreeDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateBrandUrl,brandTreeDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStore (storeTreeDto:StoreTreeDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateStoreUrl,storeTreeDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeTarget(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteTargetByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedTargets (ids:Array<String>): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.deleteAllTargetUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //
  // getBrandsById(supplierId:string):Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   console.log(supplierId);
  //   return this.http.get(this.getBrandsByIdUrl+"/?supplierId="+supplierId,options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // getAllSuppliers(): Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   return this.http.get(this.getSuppliersUrl, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  //
  // getStoresByCustomerId(customerId:string):Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   console.log(customerId);
  //   return this.http.get(this.getStoresByCustomerIdUrl+"/"+customerId,options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // getCustomers(): Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   return this.http.get(this.getCustomersUrl, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
}


