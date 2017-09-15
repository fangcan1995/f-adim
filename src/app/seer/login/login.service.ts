import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Json} from "./Json";
import {SERVER} from "../const";

@Injectable()
export class LoginService {
  private loginUrl = SERVER+'/login';
  private logoutUrl = SERVER+'/logout';
  private changePasswordUrl = SERVER+'/changePassword';

  constructor (private http: Http) {}

  login (currentUser): Observable<Json> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginUrl, currentUser , options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout(): Observable<Json> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.logoutUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  changePassword(param): Observable<Json> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.changePasswordUrl, param, options)
      .map(this.extractData)
      .catch(this.handleError);
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

}
