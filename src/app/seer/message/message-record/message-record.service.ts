import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
@Injectable()
export class messageRecordService extends BaseService<ResModel>{
  getList(params?): Promise<ResModel>{
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['RECORDS']}`,params).toPromise();
  }

}
