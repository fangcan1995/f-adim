import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../theme/services"


@Injectable()
export class WorkspaceService extends BaseService<ResModel>{

  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
  }

  //获取待办业务列表
  getTodoTasks(params?:any): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', BASE_URL + `/workbench/todoPage`, params).toPromise();
  }

  //获取已办业务列表
  getDoneTasks(params?:any): Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', BASE_URL + `/workbench/done`, false).toPromise();
    return this._httpInterceptorService.request('GET', BASE_URL + `/workbench/donePage`, params).toPromise();
  }

}
