import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../theme/services"

@Injectable()
export class WorkspaceService extends BaseService<ResModel>{
  private apiUrl=`http://172.16.7.4:8080/works/todo`;
  private apiUrl2=`http://172.16.7.4:8080/works/complete`;
  constructor(
    protected _httpInterceptorService:HttpInterceptorService
  ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }
  getTasks(pageInfo?:any): Promise<ResModel> {
    //
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    return this._httpInterceptorService.request('GET', `${this.apiUrl}/${page}${sort}${query}`,{}).toPromise();
  }

  getCompleteTasks(pageInfo?:any): Promise<ResModel> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    return this._httpInterceptorService.request('GET', `${this.apiUrl2}/${page}${sort}${query}`,{}).toPromise();
  }
}
