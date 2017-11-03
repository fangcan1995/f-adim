import {Injectable} from '@angular/core';
import {SERVER} from "../../const";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service"
import {StaffModule} from "./staff.module"
import {BaseService} from "../../../theme/services/base.service";

@Injectable()
export class StaffService extends BaseService<StaffModule> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("staffs");
  }

  private staffsAPI = "http://172.16.1.27:8090/staffs";
  private educationsAPI = "educations";
  private relationsAPI = "relations";
  private businessAPI = "experiences";

  private getStaffByIdUrl = SERVER + '/basic/staff/';
  private getOrgListUrl = SERVER + '/basicinfo/organizations'; //获取机构列表


  // 1、获取数据列表
  getLists(pageInfo: any): Promise<any> {
    const page = `?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort = `&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query: string = "";
    for (var prop in jsonQueryObj) {
      if (jsonQueryObj[prop]) {
        query += `&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.staffsAPI}${page}${sort}${query}`;
    return this._httpInterceptorService.request("GET", `${url}`).toPromise();
    // return this.http.get(url, {withCredentials: true}).toPromise().then(res => res.json());
  }

  //2、根据id获取员工信息
  getOne(id: string): Promise<any> {
    return super.getOne(id);
    // const url = `${this.staffsAPI}/${id}`;
    // return this.http.get(url, {withCredentials: true}).toPromise().then(res => res.json());
  }

  // 3、添加一个员工
  postOne(params: StaffModule): Promise<any> {
    return super.postOne(params);
    // const url = `${this.staffsAPI}`;
    // return this.http.post(url, params, {
    //   withCredentials: true
    // }).toPromise().then(res => res.json());
  }

  // 4、删除一个员工
  deleteOne(id): Promise<any> {
    return super.deleteOne(id);
  }

  // 5、修改员工信息
  putOne(id, params): Promise<any> {
    // return super.putOne(id, params);
    return this._httpInterceptorService.request('PUT', `${this.staffsAPI}`, params).toPromise();
  }

  // 6、新增教育经历
  postOneEdu(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.educationsAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 7、修改教育经历
  putOneEdu(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.educationsAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //8、删除教育经理
  deleteEdu(staffId, eduId): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.educationsAPI}/${eduId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  // 9、新增工作经验
  postOneRelations(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.relationsAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 10、修改工作经验
  putOneRelations(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.relationsAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //11、删除工作经验
  deleteRelations(staffId, familyId): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.relationsAPI}/${familyId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  // 12、新增联系人
  postOneExperiences(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.businessAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 13、修改联系人
  putOneExperiences(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.businessAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //14、删除联系人
  deleteExperiences(staffId, businessId): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.businessAPI}/${businessId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
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

  /*createStaff(params): Observable<any> {
    //假数据处理
    let id = _.reduce(this.listData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.listData.push(params)
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }*/
  /*getCurrentRoles(): Observable<any> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.get(this.getAllRolesUrl,options)
    .map(this.extractData)
    .catch(this.handleError);
}*/
  /*getOrgById(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrgByIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  /* putOneEdu(id,params): Observable<any> {
     //return this._httpInterceptorService.request('PUT', `{this.updateStaffUrl}/${id}`, params)
     //
     /!*let index2 = _.findIndex(this.listData., t => t.id === id);
     if ( index2 != -1 ) {
       this.listData[index2] = params;
     }
     let res = {
       code: 0,
       msg: '',
       data: params,
       extras: {}
     }
     return Observable.of(res);*!/
     //
   }*/

  // 删除一条数据
  /*removeStaff(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  /*createStaff(params): Promise<Result> {
  const url = `${this.getOrgListUrl}/`;
  return this.create(url,params);
}*/

  // 修改一条数据，提供所有字段
  /*updateStaff (staff:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateStaffUrl,staff,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/


  getStaffById(id): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.getStaffByIdUrl + "/" + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  /* 查询全部库房 */
  // getOrganizations(): Promise<Result> {
  //   let url = `${this.getOrgListUrl}`;
  //   return this.getAll(url);
  // }


}


