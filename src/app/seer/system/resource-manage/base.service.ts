import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
} from "@angular/http";
@Injectable()
export class ReourceBaseService<T> {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  private static handleError(error: any): Promise<any> {
    console.error('error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private static parseJson2Url = function (param) {
  let paramStr = '';
  let mappingOperator = '=';
  let separator = '&';
  if (typeof (param) == 'string' || param instanceof Number || typeof (param) == 'number' || param instanceof Boolean || typeof (param) == 'boolean') {
    paramStr += separator + mappingOperator + encodeURIComponent(param.toString());
  } else {
    for (let i in param) {
      let value = param[i];
      paramStr += separator + this.parseJson2Url(value);
    }
  }
  console.log("生成后：：：：：");
  console.log(paramStr);
  return paramStr.substr(1);
};

  getAll(url:string): Promise<T[]> {
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => response.json() as T[])
      .catch(ReourceBaseService.handleError);
  }

  search(url:string, params:any): Promise<T[]> {
    return this.http.get(url+'?'+ReourceBaseService.parseJson2Url(params), {withCredentials: true})
      .toPromise()
      .then(response => response.json() as T[])
      .catch(ReourceBaseService.handleError);
  }

  update(url:string, user: T): Promise<T> {
    return this.http
      .put(url, user, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(ReourceBaseService.handleError);
  }

  create(url:string,data: T): Promise<T> {
    return this.http
      .post(url, data, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(ReourceBaseService.handleError);
  }


  getById(url:string): Promise<T[]> {
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => response.json() as T[])
      .catch(ReourceBaseService.handleError);
  }

  delete(url:string): Promise<T> {
    return this.http.delete(url, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(ReourceBaseService.handleError);
  }

}
