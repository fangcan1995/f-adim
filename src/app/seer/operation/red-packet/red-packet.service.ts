import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
@Injectable()

export class RedPacketService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService,private http: Http) {
    super(_httpInterceptorService);
  }
  accessToken=`dafee4ef-6717-4de2-801b-23b55bf25a83`;
  url=`http://172.16.1.221:9080/activities/sendRecords`;

  // 获取数据列表
  getList(params?):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/sendRecords?awardType=1`, params).toPromise();;
    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}&awardType=1`, params);
  }
}
