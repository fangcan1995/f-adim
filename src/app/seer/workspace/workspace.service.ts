import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../theme/services"


@Injectable()
export class WorkspaceService extends BaseService<ResModel>{

  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
  }

  //获取待办业务列表
  getTasks(params?:any): Promise<ResModel> {

    //let url = `${BASE_URL}/${API['TASKS']}/works/todo`;
    let url = "http://172.16.1.228:9080/workbench/todo"

    return this._httpInterceptorService.request('GET',url).toPromise();
  }

  //获取已办业务列表
  getCompleteTasks(params?:any): Promise<ResModel> {

    //let url = `${BASE_URL}/${API['TASKS']}/works/complete`;
    let url = "http://172.16.1.228:9080/workbench/done"

    return this._httpInterceptorService.request('GET', url).toPromise();
  }

  //获取各种任务的总数
  getCounts(): Promise<ResModel> {
    let url = `${BASE_URL}/${API['TASKS']}/works/todo/count`;
    return this._httpInterceptorService.request('GET', url).toPromise();
  }
}
