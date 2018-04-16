import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services"
//let BASE_URL=`http://172.16.1.234:9080`;
@Injectable()

export class messageRecordService extends BaseService<ResModel>{
  //url=`http://172.16.1.234:9080/records`  //临时
  getList(params?): Promise<ResModel>{
    //return this._httpInterceptorService.request('GET', `${this.url}`,params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/records`,params).toPromise();
  }

}
