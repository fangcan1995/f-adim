import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import * as _ from 'lodash';
import {getStorage} from "../../../theme/libs/utils";
@Injectable()

export class ActivityService extends BaseService<ResModel>{
  mockData=[
    {
      "id": "1",
      "activityCode": "20170913001",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "0",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "1",

    },
    {
      "id": "2",
      "activityCode": "20170913002",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "0",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "1",

    },
    {
      "id": "3",
      "activityCode": "20170913003",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "20",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "2",

    },
    {
      "id": "4",
      "activityCode": "20170913004",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "30",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "2",

    },
    {
      "id": "5",
      "activityCode": "20170913005",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "3",

    },
    {
      "id": "6",
      "activityCode": "20170913006",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "3",
    },
    {
      "id": "7",
      "activityCode": "20170913007",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "50",
      "jpzs": "50",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",

    },
    {
      "id": "8",
      "activityCode": "20170913008",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",
    },
    {
      "id": "9",
      "activityCode": "20170913009",
      "activityTheme": "新手注册活动",
      "trig_mode": "1",
      "ydjps": "50",
      "jpzs": "50",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",

    },
    {
      "id": "10",
      "activityCode": "20170913010",
      "activityTheme": "三八女神节活动",
      "trig_mode": "2",
      "ydjps": "100",
      "jpzs": "100",
      "activityStartTime": "2017-01-05 13:23:48",
      "activityStatus": "4",
    },
  ];
  accessToken = getStorage({ key: 'token' }).access_token;
  // 1 获取数据列表
  getList(params?):Promise<ResModel> {
    console.log(this.accessToken);
    return this._httpInterceptorService.request('GET', `http://172.16.1.221:9080/activities?access_token=${this.accessToken}`,params).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}`,params).toPromise();
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          "data":{
            "pageNum": 1,
            "pageSize": 10,
            "total": 13,
            "list":this.mockData
          }
        }
      )
    })*/
  }
//2 获取一条数据
  getOne(id):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.1.221:9080/activities/${id}?access_token=${this.accessToken}`,{}, true).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}/${id}`,{}, true).toPromise();
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "data": {
            "BaseInfoDTO": {
              'activityCode':'20171220001',
              'activityTheme':'三八节活动',
              'glhd':'20171220003',
              'trigMode':'4',
              'productCategory':'3',
              'investLimit':'1',
              'investAmount1':'10000.00',
              'investAmount2':'100000.00',
              'investTimes1':'1',
              'investTimes2':'10',
              'activityStartTime':"2017-12-22 14:14:33",
              'activityEndTime':"2017-12-22 14:14:33",
              'pl':'1/7',  //频率
              'issueTime':'1',
              'ymlj':'www.baidu.com',
              'remark':'这是备注',
              'activityScope':'3'
            },
            "AwardsDTO": {
              redEnvelopesDTO:[
                {
                  'id':'1',
                  'jpmc':'18元现金红包',
                  'awardType':'1',
                  'reType':'1',
                  'awardTitle':'现金红包',
                  'money':18,
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%',
                  'aaa':'111',
                  'bbb':'bbb',
                },
                {
                  'id':'2',
                  'jpmc':'100元返现红包',
                  'awardType':'1',
                  'reType':'2',
                  'awardTitle':'返现红包',
                  'money':100,
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
                ],
              rateCouponsDTO:[
                {
                  'id':1,
                  'jpmc':'30天加息券',
                  'awardType':'2',
                  'awardTitle':'加息券',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ],
              physicalRewardsDTO:[
                {
                  'id':1,
                  'jpmc':'100元京东卡',
                  'awardType':'3',
                  'awardTitle':'实物礼品',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ],
              raffleTicketsDTO:[
                {
                  'id':1,
                  'jpmc':'幸运大抽奖',
                  'awardType':'4',
                  'awardTitle':'抽奖券',
                  'jcsl':'10',
                  'jpsl':'100',
                  'djl':'100%'
                }
              ]
            },
            "scopes": ["1","1111111","e05cf41992f142148ffc59b2acce4def",'2','3','4','5','6','7','8','9','10']
          },
          code: "0",
          message: "SUCCESS",
        }

      )
    })*/
  }

// 3添加一条数据
  postOne(params):Promise<ResModel> {
    //let fileId=params.fileId;
    return this._httpInterceptorService.request('POST', `http://172.16.1.221:9080/activities?access_token=${this.accessToken}`, params).toPromise();

    /*let fileId=params.fileId;
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['ACTIVITIES']}/${fileId}`, params).toPromise();*/
    /*let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params);
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })*/
  }

  // 4 修改一条数据，提供所有字段
  putOne(id,params):Promise<any> {
    return this._httpInterceptorService.request('PUT', `http://172.16.1.221:9080/activities?access_token=${this.accessToken}`, params).toPromise();
    //return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['ACTIVITIES']}`, params).toPromise();
    /*let index = _.findIndex(this.mockData, t => t.id === id);
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
    })*/
  }

  //5 停止终止活动
  stop(id,params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `http://172.16.1.221:9080/activities/${id}/stop?access_token=${this.accessToken}`,params).toPromise();
  }

  // 6 删除一条数据
  deleteOne(id):Promise<any> {
    return this._httpInterceptorService.request('DELETE', `http://172.16.4.62:9080/activities/${id}?access_token=${this.accessToken}`).toPromise();
    /*let data = _.remove(this.mockData, x => x.id === id);
    return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })*/
  }

  //7 查询会员列表
  getMembers(params:any): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MEMBERS']}/members/members/messages`,params).toPromise();
  }

  //8 查询会员id数组中的会员列表
  getIdsMembers(params):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `http://172.16.1.221:9080/activities/scope?access_token=${this.accessToken}`, params).toPromise();

    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}/{id}/scopes`,ids).toPromise();
    //console.log(ids);
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          "data":{
            "list":[
              {
                "userName": "xiaowei",
                "trueName": "陈二狗",
                "phoneNumber":"12345678",
                "idNumber":"220221194902145515"
              },
              {
                "userName": "user",
                "trueName": "小张",
                "phoneNumber":"138868686",
                "idNumber":"123123123123"
              },
              {
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "idNumber":"210221194902142345"
              }
            ]
          },
        }
      )
    })*/
  }

  //9 根据活动ID查询发放记录
  getSendRecords(id,params): Promise<ResModel> {

    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['ACTIVITIES']}/${id}/sendRecords`, params).toPromise();
    return new Promise((resolve, reject) => {
      resolve(
        {
          "data": {
            "pageNum": 1,
            "pageSize": 10,
            "total": 13,
            "list":[
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "xiaowei",
                "trueName": "陈二狗",
                "phoneNumber":"12345678",
                "awardName":"110000201812130001",
                "sendStatus":"1"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "user",
                "trueName": "小张",
                "phoneNumber":"138868686",
                "awardName":"110000201812130001",
                "sendStatus":"1"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017/12/12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              }
            ]
    },
          code: "0",
          message: "SUCCESS",
        }

      )
    })
  }

  //10 补发奖励
  reSend(id): Promise<ResModel> {
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

  //11 获取参与活动的会员id拼接的字符串
  getIds(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MEMBERS']}/members/members/ids`,params).toPromise();
  }

}

