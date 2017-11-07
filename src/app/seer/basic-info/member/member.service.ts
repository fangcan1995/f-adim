import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MemberService extends BaseService<ResModel>{
  MembersUrl="http://172.16.7.4:9080/members"; //会员接口
  emergencyContactUrl=`emergencyContact`;//联系人
  VehicleContactUrl=`vehicleInfo`;//车辆
  HouseContactUrl=`houseInfo`;//车辆
  accessToken = getStorage({ key: 'token' }).access_token;
  mockData = [
    {
      "memberId": "1",
      "userName":"abc",
      "trueName": "张三",
      "phoneNumber": "15942476543",
      "idNumber": "21142119843224242",
      "sex": "男",
      "registTime": "2017-08-18 09:21:12",
      "classify": "1",
      "lastLoginTime": "2017-08-18 09:21:12",
      "loginIp": "192.168.1.1",
      "invitedMember": "张三三",
      "loginTimes":"10",
      "age":"36", //年龄
    },
    {
      "memberId": "1",
      "userName":"lisi",
      "trueName": "李四",
      "phoneNumber": "15942476543",
      "idNumber": "21142119843224242",
      "sex": "男",
      "registTime": "2017-08-18 09:21:12",
      "classify": "2",
      "lastLoginTime": "2017-08-18 09:21:12",
      "loginIp": "192.168.1.1",
      "invitedMember": "张三三",
      "loginTimes":"10",
      "age":"36", //年龄
    },
    {
      "memberId": "1",
      "userName":"wangwang",
      "trueName": "王武",
      "phoneNumber": "15942476543",
      "idNumber": "21142119843224242",
      "sex": "男",
      "registTime": "2017-08-18 09:21:12",
      "classify": "3",
      "lastLoginTime": "2017-08-18 09:21:12",
      "loginIp": "192.168.1.1",
      "invitedMember": "张三三",
      "loginTimes":"10",
      "age":"36", //年龄
    },
  ];
  constructor(
    protected _httpInterceptorService:HttpInterceptorService
  ) {
    super(_httpInterceptorService);
    this.setApi(API['ROLES']);
  }
  // 1 获取数据列表,缺少会员状态
  getList(params?): Promise<ResModel> {
    console.log(this.accessToken);
    return this._httpInterceptorService.request('GET', `${this.MembersUrl}/`, params).toPromise();
  }
  // 2 获取一条数据（年龄、征信记录、账户归属、联系人没有过滤delflag,financialInfo{}没有获取到值，houseAbout，yourIncome不保存）
  getOne(id: string | number): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.MembersUrl}/${id}`,{}, true).toPromise();
    /*return new Promise((resolve) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          "data":{
            "baseInfo": {
              "trueName": "张三",
              "mobilePhone": "13813813138"
            },   //基本信息
            "emergencyContact": [{
              "name":"李四",
              "relation":"父子"
            }],
            "workInfo":{
            },
            "accountInfo":{},
            "financialInfo":{},
            "vehicleInfo": [{
              "aaa":"宝马",
              "bbb":"X5",
              "ccc":"XXX",
              "ddd":"XXX",
              "eee":"XXX",
              "fff":"3年",
              "ggg":"100公里",
              "hhh":"160000.00",
            },
              {
                "aaa":"宝马1",
                "bbb":"X5",
                "ccc":"XXX",
                "ddd":"XXX",
                "eee":"XXX",
                "fff":"3年",
                "ggg":"100公里",
                "hhh":"160000.00",
              }],    //抵押物（车辆）信息
            "houseInfo": [{
              "fcdz":"金马路20号",
              "jzmj":"100平方米",

            }],    //抵押物（房产）信
            "creditInfo": [
              {"userName":"个人风险汇总信息","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
              {"userName":" 个人信用报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
              {"userName":" 个人反欺诈分析报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
            ],   //个人征信列表
            /!*        attachment: [
                      {"userName":"xxxx","bbb":"2018-09-12 15:00:00"},
                      {"userName":" xxxx","bbb":"2018-09-12 15:00:00"},
                      {"userName":" xxxx","bbb":"2018-09-12 15:00:00"},
                    ],   //附件列表*!/
            /!*        investInfo:[
                      {"userName":"dreaming","bbb":"柳岩","ccc":"13840982567","idNumber":"10000.00","eee":"2017-08-17 13:00:00","fff":"Andriod手机端"},
                      {"userName":"123","bbb":"宋洋洋","ccc":"13840982567","idNumber":"10000.00","eee":"2017-08-17 13:00:00","fff":"IOS手机端"}
                    ],//投资记录
                    repayInfo:[
                      {"userName":"1","bbb":"2017-05-16","ccc":"2017-05-16 13:00:00","idNumber":"3000.00","eee":"30.00","fff":"0.00","ggg":"3030.00","hhh":"已正常还款"},
                      {"userName":"2","bbb":"2017-04-16","ccc":"2017-05-16 13:00:00","idNumber":"2000.00","eee":"20.00","fff":"0.00","ggg":"2020.00","hhh":"逾期已还"},
                      {"userName":"3","bbb":"2017-03-16","ccc":"2017-05-16 13:00:00","idNumber":"1000.00","eee":"10.00","fff":"0.00","ggg":"1010.00","hhh":"逾期已还"},
                    ],//还款记录
                    approvalInfo:[
                      {"userName":"XXX","bbb":"XXX","ccc":"XXX","idNumber":"XXX"},
                      {"userName":"XXX","bbb":"XXX","ccc":"XXX","idNumber":"XXX"},
                      {"userName":"XXX","bbb":"XXX","ccc":"XXX","idNumber":"XXX"},
                    ],//审批流程记录
                    adRepay:{
                      "userName":"10000.00","bbb":"100.00","ccc":"100.00","idNumber":"2017-08-17 13:00:00"
                    }*!/
          }
        }
      )
    });*/
  }
  //3 修改基本信息,OK
  putBasicInfo(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/baseInfo`, params).toPromise();
  }
  //4-1 增加联系人,OK
  postContact(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.emergencyContactUrl}`, params).toPromise();
  }
  //4-2 修改联系人,OK
  putContact(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/${this.emergencyContactUrl}`, params).toPromise();
  }
  //4-3 删除联系人,需要再次测试
  deleteContact(id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${this.emergencyContactUrl}/${id}`).toPromise();
  }
  //5 修改工作信息，OK
  putWorkInfo(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/workInfo`, params).toPromise();
  }
  //6修改账户信息，因不可修改，暂无
  //7 修改财务状况信息，需要再次测试
  putFinancialInfo(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/financialInfo`, params).toPromise();
  }
  //8-1 增加车辆，OK
  postVehicle(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.VehicleContactUrl}`, params).toPromise();
  }
  //8-2 修改车辆，OK
  putVehicle(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/${this.VehicleContactUrl}`, params).toPromise();
  }
  //8-3 删除车辆,ERROR
  deleteVehicle(id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${this.VehicleContactUrl}/${id}`).toPromise();
  }
  //9-1 增加房屋，OK
  postHouse(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MembersUrl}/${id}/${this.HouseContactUrl}`, params).toPromise();
  }
  //9-2 修改房屋，OK
  putHouse(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/${this.HouseContactUrl}`, params).toPromise();
  }
  //9-3 删除房屋,Error
  deleteHouse(id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MembersUrl}/${this.HouseContactUrl}/${id}`).toPromise();
  }
  //10 修改会员登录密码,error,000000
  putPasswords(id, params?): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/passwords`, params).toPromise();
  }
  //11 修改会员交易密码,未提供,改为身份证后六位
  putTradePasswords(id, params?): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MembersUrl}/${id}/passwords`, params).toPromise();
  }
  // 15 根据会员ID查询贷款信息
  getLoans(id): Promise<ResModel> {
      return new Promise((resolve) => {
        resolve(
          {
            "code": "0",
            "message": "SUCCESS",
            'data':{
              countInfo: {
                "userName": "5",
                "bbb": "1"
              },   //基本信息
              loansRecord: [{
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
                "userName": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
              {
                "userName": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
              {
                "userName": "2017-09-23 11:00:01",
                "bbb": "商户转账",
                "ccc": "103.33",
                "idNumber": "成功",
              },
            ],
          }
        })
    })
  }

  //21 修改一条数据，提供部分字段
  patchOne(id, params): Promise<ResModel> {
    return new Promise((resolve) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    })
    //return this._httpInterceptorService.request('PATCH', `http://172.16.1.234:8090/roles/${id}`, params).toPromise();
  }
}
