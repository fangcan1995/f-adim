import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {
  HttpInterceptorService,
} from '../../../theme/services';

@Injectable()
export class MemberService {
  mockData = []

  constructor(private _httpInterceptorService: HttpInterceptorService) {
    /*for (var i = 0; i < 100; i++) {
      this.mockData.push({
        "id": "1",
        "name": "本拉登" + i + "",
        "real_name": "本·拉登",
        "gender": "0",
        "age": "52",
        "marriage": "0",
        "id_number": "123456",
        "mobile": "13912342234",
        "census_register": "阿富汗赫拉特",
        "residence": "阿富汗坎大哈",
        "annual_income": "1,000,000",
        "asset_introduction": "负债1,000,000",
        "someStatus": "1"
      })
    }*/
    this.mockData = [
      {
        "id": "1",
        "aaa":"abc",
        "bbb": "张三",
        "ccc": "15942476543",
        "ddd": "21142119843224242",
        "eee": "男",
        "fff": "2017-08-18 09:21:12",
        "ggg": "1",
        "hhh": "2017-08-18 09:21:12",
        "iii": "192.168.1.1",
        "jjj": "张三三",
        "kkk":"10",
        "lll":"36", //年龄
      },
      {
        "id": "2",
        "aaa":"lisi",
        "bbb": "李四",
        "ccc": "15942476543",
        "ddd": "21142119843224242",
        "eee": "男",
        "fff": "2017-08-18 09:21:12",
        "ggg": "2",
        "hhh": "2017-08-18 09:21:12",
        "iii": "192.168.1.1",
        "jjj": "张三三",
        "kkk":"10",
        "lll":"36", //年龄
      },
      {
        "id": "3",
        "aaa":"wangwang",
        "bbb": "王武",
        "ccc": "15942476543",
        "ddd": "21142119843224242",
        "eee": "男",
        "fff": "2017-08-18 09:21:12",
        "ggg": "3",
        "hhh": "2017-08-18 09:21:12",
        "iii": "192.168.1.1",
        "jjj": "张三三",
        "kkk":"10",
        "lll":"36", //年龄
      },
    ];
  }

  // 获取数据列表
  getList(params?): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}`, params);
    let res = {
      code: 0,
      msg: '',
      data: this.mockData,
      extras: {}
    }
    return Observable.of(res)
  }

  // 删除一条数据
  deleteOne(id): Observable<any> {
    // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
    let data = _.remove(this.mockData, x => x.id === id);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
  }

  // 获取一条数据
  getOne(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      message: "SUCCESS",
      data:{
        baseInfo: {
          "realName": "张三",
          "mobilePhone": "13813813138"
        },   //基本信息
        emergencyContact: [{
          "name":"李四",
          "relation":"父子"
        }],
        workInfo:{
        },
        accountInfo:{},
        financialInfo:{},
        vehicleInfo: [{
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
        houseInfo: [{
          "fcdz":"金马路20号",
          "jzmj":"100平方米",

        }],    //抵押物（房产）信
        creditInfo: [
          {"aaa":"个人风险汇总信息","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
          {"aaa":" 个人信用报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
          {"aaa":" 个人反欺诈分析报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
        ],   //个人征信列表
/*        attachment: [
          {"aaa":"xxxx","bbb":"2018-09-12 15:00:00"},
          {"aaa":" xxxx","bbb":"2018-09-12 15:00:00"},
          {"aaa":" xxxx","bbb":"2018-09-12 15:00:00"},
        ],   //附件列表*/
/*        investInfo:[
          {"aaa":"dreaming","bbb":"柳岩","ccc":"13840982567","ddd":"10000.00","eee":"2017-08-17 13:00:00","fff":"Andriod手机端"},
          {"aaa":"123","bbb":"宋洋洋","ccc":"13840982567","ddd":"10000.00","eee":"2017-08-17 13:00:00","fff":"IOS手机端"}
        ],//投资记录
        repayInfo:[
          {"aaa":"1","bbb":"2017-05-16","ccc":"2017-05-16 13:00:00","ddd":"3000.00","eee":"30.00","fff":"0.00","ggg":"3030.00","hhh":"已正常还款"},
          {"aaa":"2","bbb":"2017-04-16","ccc":"2017-05-16 13:00:00","ddd":"2000.00","eee":"20.00","fff":"0.00","ggg":"2020.00","hhh":"逾期已还"},
          {"aaa":"3","bbb":"2017-03-16","ccc":"2017-05-16 13:00:00","ddd":"1000.00","eee":"10.00","fff":"0.00","ggg":"1010.00","hhh":"逾期已还"},
        ],//还款记录
        approvalInfo:[
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
        ],//审批流程记录
        adRepay:{
          "aaa":"10000.00","bbb":"100.00","ccc":"100.00","ddd":"2017-08-17 13:00:00"
        }*/
      }
    }

    /*let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }*/
    return Observable.of(res);

  }
  // 获取一个会员的借款记录
  getLoans(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      message: "SUCCESS",
      data:{
        countInfo: {
          "aaa": "5",
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

    /*let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }*/
    return Observable.of(res);

  }
  // 获取一个会员的投资记录
  getInvests(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      message: "SUCCESS",
      data:{
        countInfo: {
          "aaa": "5",
          "bbb": "1"
        },   //基本信息
        investsRecord: [{
          "id": "BBH20170778961354",
          "status": "锁定中",
          "count":"36900.00",
          "qx":"12",
          "aaa":"1000.00",
          "bbb":"1",
          "ccc":"500.00",
        }],

      }
    }

    /*let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }*/
    return Observable.of(res);

  }
  // 获取一个会员的交易记录
  getTrades(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      message: "SUCCESS",
      data:{
       tradesRecord: [
         {
          "aaa": "2017-09-23 11:00:01",
          "bbb": "商户转账",
          "ccc":"103.33",
          "ddd":"成功",
        },
         {
           "aaa": "2017-09-23 11:00:01",
           "bbb": "商户转账",
           "ccc":"103.33",
           "ddd":"成功",
         },
         {
           "aaa": "2017-09-23 11:00:01",
           "bbb": "商户转账",
           "ccc":"103.33",
           "ddd":"成功",
         },
       ],

      }
    }

    /*let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }*/
    return Observable.of(res);

  }
  // 添加一条数据
  postOne(params): Observable<any> {
    // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params)
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }

  // 修改一条数据，提供所有字段
  putOne(id, params): Observable<any> {
    // return this._httpInterceptorService.request('PUT', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
    let index = _.findIndex(this.mockData, t => t.id === id);
    if (index != -1) {
      this.mockData[index] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }

  // 修改一条数据，提供部分字段
  /* patchOne(id, params): Observable<any> {
     // return this._httpInterceptorService.request('PATCH', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
     let res = {
       code: 0,
       msg: '',
       data,
       extras: {}
     }
     return Observable.of(res);
   }*/
}
