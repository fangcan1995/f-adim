import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel,TEST_URL} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MemberService extends BaseService<ResModel>{
   MembersUrl=`${TEST_URL}/${API['MEMBERS']}`; //会员接口
  //MembersUrl=`http://172.16.1.225:9080/members`; //会员接口
  emergencyContactUrl=`contact`;//联系人
  VehicleContactUrl=`car`;//车辆
  HouseContactUrl=`house`;//车辆
  accessToken = getStorage({ key: 'token' }).access_token;

  constructor(
    protected _httpInterceptorService:HttpInterceptorService
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
  getLoans(id): Promise<ResModel> {
      return new Promise((resolve) => {
        resolve(
          {
            "code": "0",
            "message": "SUCCESS",
            'data':{
              "countInfo": {
                "userName": "5",
                "bbb": "1"
              },   //基本信息
              "list": [{
                "id": "BBH20170778961354",
                "status": "待提交",
                "count":"100000.00",
                "qx":"3",
                "yhbx":"1000.00",
                "dhbx":"500.00",
              }],
            }
          }
        )
      })
  }
  //16 根据会员ID查询投资信息
  getInvests(id): Promise<ResModel> {
    return new Promise((resolve) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data': {
            countInfo: {
              "userName": "5",
              "bbb": "1"
            },   //基本信息
            investsRecord: [{
              "id": "BBH20170778961354",
              "status": "锁定中",
              "count": "36900.00",
              "qx": "12",
              "userName": "1000.00",
              "bbb": "1",
              "ccc": "500.00",
            }],
          }
        })
    })
  }
  //17 根据会员ID查询交易记录
  getTrades(id): Promise<ResModel> {
    return new Promise((resolve) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data': {
            tradesRecord: [
              {
                "time": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
              {
                "time": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
              {
                "time": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
            ],
          }
        })
    })
  }
  //21 修改一条数据，提供部分字段,有问题
  patchOne(id,params): Promise<ResModel> {
    console.log(this.accessToken);
    return this._httpInterceptorService.request('PATCH', `${this.MembersUrl}/${id}/status`, params).toPromise();
  }

  //验证电话号码
  validatePhone(phone){
    let mobileRegex =  /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
         if(mobileRegex.test(phone)){
             return true;
         }else{
             return false;
         }
  }
  //验证身份证号码
  validateIdCard(idCard){
    let mobileRegex =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
         if(mobileRegex.test(idCard)){
             return true;
         }else{
             return false;
         }
  }
}
