import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageRecordService extends BaseService<ResModel>{
  accessToken = getStorage({ key: 'token' }).access_token;
  templateManageUrl=`http://172.16.7.3:9010/records`;  // URL to web api
  getList(pageInfo:any): Promise<ResModel>{
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

}
