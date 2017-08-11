import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SERVER} from '../../../const';


@Injectable()
export class carService {

  private getAllCarsUrl = SERVER+'/basic/car/getAll';
  private addCarUrl = SERVER+'/basic/car/addCar';
  private getCarById = SERVER+'/basic/car/';
  private searchCarUrl = SERVER+'/basic/car/searchCar';

  private updateCarUrl = SERVER+'/basic/car/updateCar';
  private deleteByIdUrl = SERVER+'/basic/car/deleteCar';
  private deleteSelectedCarUrl = SERVER+'/basic/car/deleteSelectedCar';
  private getCarByDateUrl = SERVER+'/basic/car/getCarByDate';

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
  getCars (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllCarsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchCar (obj): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.searchCarUrl,obj,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addCar (car:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(car)
    return this.http.post(this.addCarUrl,car,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCarByDate (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(list)
    return this.http.post(this.getCarByDateUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  updateCar (car:any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateCarUrl,car,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeCar(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedCars (ids:String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.deleteSelectedCarUrl+"/"+ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}


