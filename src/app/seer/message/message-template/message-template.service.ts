import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageTplManageService extends BaseService<ResModel>{
  url=`http://172.16.1.234:9080/templates`  //临时
  getTpls(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.url}`,params).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['TEMPLATES']}`,params).toPromise();
  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.url}/${id}`).toPromise();
  }
  /*新增*/
  createTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.url}`, params).toPromise();
  }
  /*修改*/
  updateTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.url}`, params).toPromise();
  }
  /*删除*/
  deleteTemplate(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.url}/${id}`).toPromise();
  }
}
