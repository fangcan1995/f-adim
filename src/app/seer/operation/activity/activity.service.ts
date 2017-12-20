import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import * as _ from 'lodash';
@Injectable()

export class ActivityService extends BaseService<ResModel>{
  mockData=[
    {
      "id": "1",
      "activityId": "20170913001",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "0",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "1",

    },
    {
      "id": "2",
      "activityId": "20170913002",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "0",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "1",

    },
    {
      "id": "3",
      "activityId": "20170913003",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "20",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "2",

    },
    {
      "id": "4",
      "activityId": "20170913004",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "30",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "2",

    },
    {
      "id": "5",
      "activityId": "20170913005",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "3",

    },
    {
      "id": "6",
      "activityId": "20170913006",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "3",
    },
    {
      "id": "7",
      "activityId": "20170913007",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "50",
      "jpzs": "50",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",

    },
    {
      "id": "8",
      "activityId": "20170913008",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",
    },
    {
      "id": "9",
      "activityId": "20170913009",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "50",
      "jpzs": "50",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",

    },
    {
      "id": "10",
      "activityId": "20170913010",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",
    },
  ];
  // 1 获取数据列表
  getList(params?):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}`,params).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':{
            "pageNum": 1,
            "pageSize": 10,
            "total": 13,
            "list":this.mockData
          }
        }
      )
    })
  }
//2 获取一条数据
  getOne(id):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}/${id}`,{}, true).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          "data": {
            baseInfo: {
              'activityId':'20171220001',
              'activityTheme':'三八节活动',
              'glhd':'20171220003',
              'trigMode':'1',
              'productCategory':'3',
              'investLimit':'1',
              'investAmount1':'10000.00',
              'investAmount2':'100000.00',
              'investTimes1':'1',
              'investTimes2':'10',
              'activityStartTime':'2017/12/01',
              'activityEndTime':'2017/12/01',
              'pl':'1/7',  //频率
              'issueTime':'1',
              'ymlj':'www.baidu.com',
              'remark':'这是备注',
              'activityScope':'2'
            },
            awards: {
              redEnvelopes:[
                {
                  'jpmc':'18元现金红包',
                  'awardType':'1',
                  're_type':'1',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                },
                {
                  'jpmc':'100元返现红包',
                  'awardType':'1',
                  're_type':'2',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
                ],
              rateCoupons:[
                {
                  'jpmc':'30天加息券',
                  'awardType':'2',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ],
              raffleTickets:[
                {
                  'jpmc':'100元京东卡',
                  'awardType':'3',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ],
              physicalRewards:[
                {
                  'jpmc':'幸运大抽奖',
                  'awardType':'4',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ]
            },
            scopes: [],
          },
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }

// 3添加一条数据
  postOne(params):Promise<ResModel> {
    /*let fileId=params.fileId;
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['ACTIVITIES']}/${fileId}`, params).toPromise();*/
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params);
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }

  // 4 修改一条数据，提供所有字段
  putOne(id, params):Promise<any> {
    //return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['ACTIVITIES']}`, params).toPromise();
    let index = _.findIndex(this.mockData, t => t.id === id);
    if (index != -1) {
      this.mockData[index] = params;
    }
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }



  //5 停止终止活动
  stop(id): Promise<ResModel> {
    //return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['ACTIVITIES']}/${id}/stop`,).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }
  // 6 删除一条数据
  deleteOne(id):Promise<any> {
    //return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['ACTIVITIES']}/${id}`).toPromise();
    let data = _.remove(this.mockData, x => x.id === id);
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }
  //8 根据活动ID查询发放记录
  getSendRecords(id): Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}/${id}/sendRecords`, params).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          "data": {
            baseInfo: {},
            awards: {
              redEnvelopes:[],
              rateCoupons:[],
              raffleTickets:[],
              physicalRewards:[]
            },
            scopes: [],
          },
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }
  //9 补发奖励
  reSend(id, params): Promise<ResModel> {
    //return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['ACTIVITIES']}/${id}/reSend`, params).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }
  getDatas(): Promise<any> {
      return new Promise((resolve, reject) => {
        resolve(
          {
            'success': 0,

            'data':[
                {"roleName":"xxxx","validState":"短信","sendTime":"自动","sendway":"2017-08-18 09:21:12","Time":"短信","red":"01","add":"01"},

              ]
          }
        )
      })
    }
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
              {"roleName":"xxxx","validState":"短信","sendTime":"自动","sendway":"2017-08-18 09:21:12","Time":"短信","red":"01","add":"01"},

            ]
        }
      )
    })
    }

}
/*getList(params?): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}`, params);
    let res = {
      "code": "0",
      "message": "SUCCESS",
      "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 13,
        "list":this.mockData
      },
    };
    return Observable.of(res)
  }*/
// 获取一条数据
/*
getOne(id): Observable<any> {
  // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
  let data = _.find(this.mockData, x => x.id === id);
console.log(data);
let res = {
  code: 0,
  msg: '',
  data,
  extras: {}
};
return Observable.of(res);

}*/
// 添加一条数据
/*
postOne(params): Observable<any> {
  // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
  let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
params.id = id;
this.mockData.push(params);
let res = {
  code: 0,
  msg: '',
  data: params,
  extras: {}
};
return Observable.of(res);
}*/
// 修改一条数据，提供所有字段
/*
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
};
return Observable.of(res);
}*/
// 删除一条数据
/*
deleteOne(id): Observable<any> {
  // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
  let data = _.remove(this.mockData, x => x.id === id);
let res = {
  code: 0,
  msg: '',
  data,
  extras: {}
};
return Observable.of(res);
}*/
