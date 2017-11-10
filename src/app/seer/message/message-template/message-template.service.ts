import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageTplManageService extends BaseService<ResModel>{
  accessToken = getStorage({ key: 'token' }).access_token;
  templateManageUrl=`http://172.16.7.3:9010/templates`;  // URL to web api

  getTpls(pageInfo:any): Promise<ResModel> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    return this._httpInterceptorService.request('GET', `${this.templateManageUrl}${page}${sort}${query}`,{}, true).toPromise();
  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.templateManageUrl}/${id}`,{}, true).toPromise();
  }
  /*新增*/
  createTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.templateManageUrl}`, params).toPromise();
  }
  /*修改*/
  updateTemplate(params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.templateManageUrl}`, params).toPromise();
  }
  /*删除*/
  deleteTemplate(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.templateManageUrl}/${id}`).toPromise();
  }
}
