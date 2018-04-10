import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel} from "../../../theme/services"
import {Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import * as _ from 'lodash';
import {getStorage} from "../../../theme/libs/utils";

let BASE_URL=`http://172.16.1.234:9080`;
@Injectable()

export class ActivityService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    //this.setApi("staffs");
  }
  //accessToken=`dafee4ef-6717-4de2-801b-23b55bf25a83`;
  //url=`http://172.16.1.221:9080/activities`;
  // 1 获取数据列表
  getList(params?):Promise<ResModel> {

    //return this._httpInterceptorService.request('GET', `${this.url}?access_token=${this.accessToken}`,params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities`,params).toPromise();
  }
//2 获取一条数据
  getOne(id):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
    console.log(`${BASE_URL}/activities/${id}`);
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/${id}`,{}).toPromise();

  }

// 3添加一条数据
  postOne(params):Promise<ResModel> {
    //let fileId=params.fileId;
    //return this._httpInterceptorService.request('POST', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
    return this._httpInterceptorService.request('POST', `${BASE_URL}/activities`, params).toPromise();
  }

  // 4 修改一条数据，提供所有字段
  putOne(id,params):Promise<any> {
    //return this._httpInterceptorService.request('PUT', `${this.url}?access_token=${this.accessToken}`, params).toPromise();
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/activities`, params).toPromise();

  }

  //5 停止终止活动
  stop(id,params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/activities/${id}/stop`,params).toPromise();
    //return this._httpInterceptorService.request('POST', `${this.url}/${id}/stop?access_token=${this.accessToken}`,params).toPromise();
  }

  // 6 删除一条数据
  deleteOne(id):Promise<any> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/activities/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${this.url}/${id}?access_token=${this.accessToken}`).toPromise();
  }

  //7 查询会员列表
  getMembers(params:any): Promise<ResModel> {
    //let url=`http://172.16.1.225:9080/members/memberMessagesList?access_token=84b41b07-9061-4c98-906d-4bbf17bcd7d1`;
    return this._httpInterceptorService.request('GET', `${BASE_URL}/members/memberMessagesList`,params).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MEMBERS']}/members/members/messages`,params).toPromise();
  }

  //8 查询会员id数组中的会员列表
  getIdsMembers(params):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${this.url}/scope?access_token=${this.accessToken}`, params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/scope`,params).toPromise();
    //console.log(ids);
  }

  //9 根据活动ID查询发放记录
  getSendRecords(id,params): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/${id}/sendRecords`, params).toPromise();
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "data": {
            "pageNum": 1,
            "pageSize": 10,
            "total": 10,
            "list":[
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "xiaowei",
                "trueName": "陈二狗",
                "phoneNumber":"12345678",
                "awardName":"110000201812130001",
                "sendStatus":"1"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "user",
                "trueName": "小张",
                "phoneNumber":"138868686",
                "awardName":"110000201812130001",
                "sendStatus":"1"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
                "userName": "ssssdfdfds",
                "trueName": "小李",
                "phoneNumber":"13588886666",
                "awardName":"110000201812130001",
                "sendStatus":"2"
              },
              {
                "sendTime": "2017-12-12 18:12:12",
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
    })*/
  }

  //10 补发奖励
  reSend(id): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/activities/${id}/reSend`, {}).toPromise();
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          code: "0",
          message: "SUCCESS",
        }

      )
    })*/
  }

  //11 获取参与活动的会员id拼接的字符串
  getIds(params?): Promise<ResModel> {
    //let url=`http://172.16.1.225:9080/members/memberMessagesIds?access_token=84b41b07-9061-4c98-906d-4bbf17bcd7d1`;
    //return this._httpInterceptorService.request('GET', `${url}`,params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/members/memberMessagesIds`,params).toPromise();
  }
  //12 导出表格
  exportForm(params): Promise<any> {
    const access_token = getStorage({ key: 'token' }).access_token;
    return this.http.get(`${BASE_URL}/activities/export?access_token=${access_token}`, new RequestOptions({
      responseType: ResponseContentType.Blob,
      search: params
    })).toPromise();
  }

}

