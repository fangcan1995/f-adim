import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel,TEST_URL} from "../../../theme/services"
import {Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MemberService extends BaseService<ResModel>{
    MembersUrl=`${TEST_URL}/${API['MEMBERS']}`; //会员接口
//  MembersUrl=`http://172.16.1.225:9080/members`; //会员接口
  // MembersUrl=`${BASE_URL}/members`; //会员接口
  emergencyContactUrl=`contact`;//联系人
  VehicleContactUrl=`car`;//车辆
  HouseContactUrl=`house`;//车辆
  payTransRecordUrl = `http://172.16.1.225:9080/payment/fuiou`;
  // payTransRecordUrl = `${BASE_URL}/payment/fuiou`;
  investUrl =  `http://172.16.1.225:9080/statistics/invest`;
  // investUrl = `${BASE_URL}/statistics/invest`;
  loanUrl =  `http://172.16.1.225:9080/statistics/loan`;
  // loanUrl = `${BASE_URL}/statistics/loan`;
  accessToken = getStorage({ key: 'token' }).access_token;

  constructor(
    protected _httpInterceptorService:HttpInterceptorService,private http:Http
  ) {
    super(_httpInterceptorService);

    //this.setApi(API['MEMBERS']);
  }
  // 1 获取数据列表,OK
  getList(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.MembersUrl}` ,params).toPromise();
  }
  // 2 获取一条数据,OK
  getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.MembersUrl}/${id}`).toPromise();
  }
  //3 修改基本信息,OK
  putBasicInfo(id,params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/personBaseInfo`,params).toPromise();
  }
  //4-1 增加联系人,OK
  postContact(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.emergencyContactUrl}`, params).toPromise();
  }
  //4-2 修改联系人,OK
  putContact(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/${this.emergencyContactUrl}`, params).toPromise();
  }
  //4-3 删除联系人,OK
  deleteContact(id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${this.emergencyContactUrl}/${id}`).toPromise();
  }
  //5 修改工作信息，OK
  putWorkInfo(id, params): Promise<ResModel> {
    console.log(params);
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/workInfo`, params).toPromise();
  }
  //6修改账户信息，因不可修改，暂无
  //7 修改财务状况信息,OK
  putFinancialInfo(id, params): Promise<ResModel> {
    console.log(params);
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/financialInfo`, params).toPromise();
  }
  //8-1 增加车辆，OK
  postVehicle(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.VehicleContactUrl}`, params).toPromise();
  }
  //8-2 修改车辆，OK
  putVehicle(memberid,carId, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${memberid}/${this.VehicleContactUrl}/${carId}`, params).toPromise();
  }
  //8-3 删除车辆,OK
  deleteVehicle(memberId, cid): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${memberId}/${this.VehicleContactUrl}/${cid}`).toPromise();
  }
  //9-1 增加房屋，OK
  postHouse(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.HouseContactUrl}`, params).toPromise();
  }
  //9-2 修改房屋，OK
  putHouse(memberId, houseId, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${memberId}/${this.HouseContactUrl}/${houseId}`, params).toPromise();
  }
  //9-3 删除房屋,OK
  deleteHouse(memberId, id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${memberId}/${this.HouseContactUrl}/${id}`).toPromise();
  }
  //10 修改会员登录密码,OK
  putPasswords(id, params?): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/passwords`, params).toPromise();
  }
  //11 修改会员交易密码,OK,改为身份证后六位
  putTradePasswords(id, params?): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/transactionPasswords`, params).toPromise();
  }
  // 15 根据会员ID查询贷款信息
  getloanAllStatistic(id): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.loanUrl}/${id}/loanAll`).toPromise();
  }
  //16 根据会员ID查询投资信息
  getInvests(id): Promise<ResModel> {
    return new Promise((resolve) => {
      resolve()
    })
  }

   //17 根据会员ID查询投资统计信息
   getInvestAllStatistic(id): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.investUrl}/${id}/investAll`).toPromise();
  }

   //18 根据会员ID查询投资统计信息
   getInvestAllListStatistic(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.investUrl}/${id}/investAllList`, params).toPromise();
  }
  
  // 查询交易记录
  getTrades(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.payTransRecordUrl}/${id}/tradeRecords` ,params).toPromise();
  }

  //21 修改一条数据，提供部分字段,有问题
  patchOne(id,status): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${this.MembersUrl}/${id}/status/${status}`).toPromise();
  }

  //验证电话号码
  validatePhone(phone){
    let mobileRegex =  /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
         if(mobileRegex.test(phone.trim())){
             return true;
         }else{
             return false;
         }
  }
  //验证身份证号码
  validateIdCard(idCard){
    let mobileRegex =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
         if(mobileRegex.test(idCard.trim())){
             return true;
         }else{
             return false;
         }
  }

  //导出表格
  exportForm(params): Promise<any> {
    const access_token = getStorage({ key: 'token' }).access_token;
      return this.http.get(`${this.MembersUrl}/export?access_token=${access_token}`, new RequestOptions({
          responseType: ResponseContentType.Blob,
          search: params
      })).toPromise();
  }

  //查询征信信息
  getCreditByType(memberId, type): Promise<ResModel> {
    return this._httpInterceptorService.request('GET',`${this.MembersUrl}/${memberId}/credits/${type}`).toPromise();
  }

  //身份证计算年龄
  cardGetAge(identityCard) {
    let len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    let strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  //身份证计算年龄
  cardGetSex(identityCard) {
    let len = (identityCard + "").length;
    if (len == 0) {
            return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    let sex = 0;
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
      if(parseInt(identityCard.substr(16, 1)) % 2 == 1){
         sex = 1;//男
      }else{
         sex = 2;
      }
    }
    if (len == 15) {
      if(parseInt(identityCard.substr(14, 1)) % 2 == 1){
         sex = 1;//男
      }else{
         sex = 2;
      }
    }
    return sex;
  }

}
