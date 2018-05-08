import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services"
import {Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import * as _ from 'lodash';
import {getStorage} from "../../../theme/libs/utils";

@Injectable()
export class messageTplManageService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    //this.setApi("MESSAGES");
  }
  getTpls(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/templates`,params).toPromise();

  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/templates/${id}`).toPromise();

  }
  /*新增*/
  createTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/templates`, params).toPromise();
  }
  /*修改*/
  updateTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/templates`, params).toPromise();
  }
  /*删除*/
  deleteTemplate(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/templates/${id}`).toPromise();
  }
  //导出表格
  exportForm(params): Promise<any> {
    console.log(params);
    const access_token = getStorage({ key: 'token' }).access_token;
    return this.http.get(`${BASE_URL}/templates/specialExport?access_token=${access_token}`, new RequestOptions({
      responseType: ResponseContentType.Blob,
      search: params
    })).toPromise();
  }
}
