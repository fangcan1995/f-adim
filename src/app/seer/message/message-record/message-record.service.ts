import {Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
import {parseQueryString, getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageRecordService extends BaseService<any>{
  accessToken = getStorage({ key: 'token' }).access_token;
  templateManageUrl=`http://172.16.1.234:8080/records`;  // URL to web api
  getList(pageInfo:any): Promise<Result>{
    const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.templateManageUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
    return this.getAll(url);
  }

}
