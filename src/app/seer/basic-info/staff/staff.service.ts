import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpInterceptorService, ResModel} from "../../../theme/services/http-interceptor.service"
import {StaffModule} from "./staff.module"
import {BaseService} from "../../../theme/services/base.service";

@Injectable()
export class StaffService extends BaseService<StaffModule> {

  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    this.setApi("staffs");
  }

  private staffsAPI = "http://172.16.1.252:9080/staffs";
  // private staffsAPI = "http://172.16.1.27:8090/staffs";
  private educationsAPI = "educations";
  private relationsAPI = "relations";
  private businessAPI = "experiences";

  private organizationsAPI = "http://172.16.1.252:9080/organizations/all";


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
  }

  //2、根据id获取员工信息
  getOne(id: string): Promise<any> {
    // return super.getOne(id);
    return this._httpInterceptorService.request('GET', `${this.staffsAPI}/${id}`).toPromise();
  }

  getDetailOne(id: string): Promise<any> {
    // return super.getOne(id);
    return this._httpInterceptorService.request('GET', `${this.staffsAPI}/detail/${id}`).toPromise();
  }

  // 3、添加一个员工
  postOne(params: StaffModule): Promise<any> {
    // return super.postOne(params);
    return this._httpInterceptorService.request('post', `${this.staffsAPI}`, params).toPromise();
  }

  // 4、删除一个员工
  deleteOne(id): Promise<any> {
    // return super.deleteOne(id);
    return this._httpInterceptorService.request('DELETE', `${this.staffsAPI}/${id}`).toPromise();
  }

  // 5、修改员工信息
  putOne(id, params): Promise<any> {
    return this._httpInterceptorService.request('PUT', `${this.staffsAPI}`, params).toPromise();
  }

  // 6、新增教育经历
  postOneEdu(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.educationsAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 7、修改教育经历
  putOneEdu(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${this.educationsAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //8、删除教育经理
  deleteEdu(staffId, eduId): Promise<any> {
    const url = `${this.staffsAPI}/${this.educationsAPI}/${eduId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  // 9、新增工作经验
  postOneRelations(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.relationsAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 10、修改工作经验
  putOneRelations(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${this.relationsAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //11、删除工作经验
  deleteRelations(staffId, familyId): Promise<any> {
    const url = `${this.staffsAPI}/${this.relationsAPI}/${familyId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  // 12、新增联系人
  postOneExperiences(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${staffId}/${this.businessAPI}`;
    return this._httpInterceptorService.request('POST', `${url}`, params).toPromise();
  }

  // 13、修改联系人
  putOneExperiences(staffId, params): Promise<any> {
    const url = `${this.staffsAPI}/${this.businessAPI}/${params.id}`;
    return this._httpInterceptorService.request('PUT', `${url}`, params).toPromise();
  }

  //14、删除联系人
  deleteExperiences(staffId, businessId): Promise<any> {
    const url = `${this.staffsAPI}/${this.businessAPI}/${businessId}`;
    return this._httpInterceptorService.request('DELETE', `${url}`).toPromise();
  }

  getOrganizations(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.organizationsAPI}`, {}).toPromise();
  }

  // 15、得到所有部门信息
  getAllOrganizations(): Promise<ResModel> {
    return this._httpInterceptorService.request('GET','http://172.16.1.252:9080/organizations/all',{}, false).toPromise();
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

  getStaffById(id): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.organizationsAPI + "/" + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

}


