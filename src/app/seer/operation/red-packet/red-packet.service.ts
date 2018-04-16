import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
//let BASE_URL=`http://172.16.1.234:9080`;
@Injectable()

export class RedPacketService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService,private http: Http) {
    super(_httpInterceptorService);
  }


  // 获取数据列表
  getList(params?):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/sendRecords?awardType=1`, params).toPromise();
    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}&awardType=1`, params);
  }
}
