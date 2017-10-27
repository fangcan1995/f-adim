import {Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
@Injectable()
export class messageRecordService extends BaseService<any>{
  //accessToken = getStorage({ key: 'token' }).access_token;
  accessToken ="9d35934c-c07b-41ff-b537-76e0b5b4b67e";
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
