import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {SERVER} from "../../../const";



@Injectable()
export class ActivityPlanService {

  private getAllActivityPlanUrl = SERVER+'/planmanage/activityplan/getAll';
  private addActivityPlanUrl = SERVER+'/planmanage/activityplan/addActivityPlan';
  private updateActivityPlanUrl = SERVER+'/planmanage/activityplan/updateActivityPlan';
  private deleteActivityByIdUrl = SERVER+'/planmanage/activityplan/deleteActivityById';
  private deleteActivityByIdsUrl = SERVER+'/planmanage/activityplan/deleteActivityByIds';
  private searchActivityUrl = SERVER+'/planmanage/activityplan/searchActivityPlan';

  private getStoresByCustomerIdUrl = SERVER+'/sys/customer/stores/';
  //get goods by brand id
  private getGoodsByBrandIdUrl = SERVER+ '/basicInfo/goods?brandId=';



  //updateActivyGoods
  private updateActivyGoodsUrl = SERVER+ '/planmanage/activityplan/updateActivityGoods';
  //updateActivityBudgets
  private updateActivityBudgetsUrl = SERVER+ '/planmanage/activityplan/updateActivityBudgets';

  private getActivityGoodsByActivityIdUrl = SERVER+'/planmanage/activityplan/getActivityGoodsByActivityId/';
  private getActivityBudgetsByActivityIdUrl = SERVER+'/planmanage/activityplan/getActivityBudgetsByActivityId/';


  private deleteActivityGoodsByActivityIdUrl = SERVER+'/planmanage/activityplan/deleteActivityGoodsByActivityId/';
  private deleteActivityBudgetsByActivityIdUrl = SERVER+'/planmanage/activityplan/deleteActivityBudgetsByActivityId/';

  //update
  private updateActingMatBudgetBalanceByIdUrl = SERVER+'/planmanage/activityplan/updateActingMatBudgetBalanceById';
  private updateActingMatBalanceByIdUrl = SERVER+'/planmanage/activityplan/updateActingMatBalanceById';

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


  updateActingMatBalanceById(list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateActingMatBalanceByIdUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateActingMatBudgetBalanceById(list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateActingMatBudgetBalanceByIdUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  deleteActivityGoodsByActivityId(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteActivityGoodsByActivityIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  deleteActivityBudgetsByActivityId(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteActivityBudgetsByActivityIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  deleteActivityById(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.deleteActivityByIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteActivityByIds(ids): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.deleteActivityByIdsUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getActivityGoodsByActivityId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getActivityGoodsByActivityIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActivityBudgetsByActivityId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getActivityBudgetsByActivityIdUrl+id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getGoodsByBrandId (brandId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getGoodsByBrandIdUrl+brandId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllActivityPlan (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllActivityPlanUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoresByCustomerId (id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStoresByCustomerIdUrl+ id,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  addActivityPlan (plan): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addActivityPlanUrl,plan,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  searchActivity(plan): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.searchActivityUrl,plan,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateActivityPlan (plan): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateActivityPlanUrl,plan,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateActivyGoods (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateActivyGoodsUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateActivityBudgets (list): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateActivityBudgetsUrl,list,options)
      .map(this.extractData)
      .catch(this.handleError);
  }


}





