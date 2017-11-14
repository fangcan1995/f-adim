import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageTplManageService extends BaseService<ResModel>{

  getTpls(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['TEMPLATES']}`,params).toPromise();
  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['TEMPLATES']}/${id}`).toPromise();
  }
  /*新增*/
  createTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['TEMPLATES']}`, params).toPromise();
  }
  /*修改*/
  updateTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['TEMPLATES']}`, params).toPromise();
  }
  /*删除*/
  deleteTemplate(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['TEMPLATES']}/${id}`).toPromise();
  }
}
