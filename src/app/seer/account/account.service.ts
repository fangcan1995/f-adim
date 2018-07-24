import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../theme/services"


@Injectable()
export class AccountService extends BaseService<ResModel>{

  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
  }

  // 1 获取账户列表
  getAccountList(params?):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/payment/bohai/companyAccountList`,params).toPromise();
  }
  getInfo(params){
    return this._httpInterceptorService.request('GET', `${BASE_URL}/payment/bohai/companyAccount`,params).toPromise();
  }

}
