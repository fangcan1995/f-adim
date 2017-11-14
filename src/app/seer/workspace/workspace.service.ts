import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../theme/services"
import {getStorage} from "../../theme/libs/utils"
@Injectable()
export class WorkspaceService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
    //this.setApi('TASKS');
  }
  //获取待办业务列表
  getTasks(params?:any): Promise<ResModel> {
    let url = `${BASE_URL}/${API['TASKS']}/works/todo`;
    return this._httpInterceptorService.request('GET',url,params).toPromise();
  }
  //获取已办业务列表
  getCompleteTasks(params?:any): Promise<ResModel> {
    let url = `${BASE_URL}/${API['TASKS']}/works/complete`;
    return this._httpInterceptorService.request('GET', url,params).toPromise();
  }
}
