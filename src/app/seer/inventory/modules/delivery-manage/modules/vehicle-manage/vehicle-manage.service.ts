import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../../../const";



@Injectable()
export class vehicleService {

  private getVehicleByCarIdUrl = SERVER+'/inventory/delivery/vehicle';
  private addVehicleUrl = SERVER+'/inventory/delivery/vehicle/add';

  private updateVehicleUrl = SERVER+'/inventory/delivery/vehicle/update';


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


  getVehicleByCarId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getVehicleByCarIdUrl+'/'+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


/*  addVehicle (vehicle): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(vehicle)
    return this.http.post(this.addVehicleUrl,vehicle,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  addVehicle (car:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addVehicleUrl,car,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateVehicle (vehicle:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateVehicleUrl,vehicle,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



}


