import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services"

@Injectable()
export class messageRecordService extends BaseService<ResModel>{
  getList(params?): Promise<ResModel>{
    return this._httpInterceptorService.request('GET', `${BASE_URL}/records`,params).toPromise();
  }

}
