import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,ResModel,BASE_URL} from "../../../theme/services"
import {Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import * as _ from 'lodash';
import {getStorage,} from "../../../theme/libs/utils";

console.log(BASE_URL);
@Injectable()

export class MessageService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService, protected http?: Http) {
    super(_httpInterceptorService);
    //this.setApi("MESSAGES");
  }

  // 1 获取消息列表
  getDatas(params?): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/messages`,params).toPromise();
  }
  //2 获取一条消息
  getMessageById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/messages/${id}`).toPromise();
    //return this._httpInterceptorService.request('GET', `${this.url}/${id}`).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MESSAGES']}/${id}`).toPromise();
  }
 //3 新增
  postOne(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/messages`, params).toPromise();
    //return this._httpInterceptorService.request('POST', `${this.url}`,params).toPromise();
    //return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['MESSAGES']}`, params).toPromise();
  }
  //4 修改
  putOne(params):  Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/messages`, params).toPromise();
    //return this._httpInterceptorService.request('PUT', `${this.url}`,params).toPromise();
    //return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['MESSAGES']}`, params).toPromise();
  }
  //5 删除
  deleteMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/messages/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${this.url}/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['MESSAGES']}/${id}`).toPromise();
  }
  //6 逻辑删除
  deleteLogicalMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/messages/logical/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${this.url}/logical/${id}`).toPromise();
    //return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['MESSAGES']}/logical/${id}`).toPromise();
  }
  //7 获取人员列表
  getUsers(usersType:string,params:any): Promise<ResModel> {
    let url:string;
    if(usersType=='members'){
       url = `${BASE_URL}/members/memberMessagesList`
      //url=`http://172.16.1.225:9080/members/memberMessagesList?access_token=84b41b07-9061-4c98-906d-4bbf17bcd7d1`;
    }else if(usersType=='users'){
      //url=`http://172.16.1.234:9080/staffs`;
       url = `${BASE_URL}/staffs`
    }
    return this._httpInterceptorService.request('GET', url,params).toPromise();
  }
  //8 获取一条已经发送的消息对应的发送记录
  getRecords(id:string,params:any): Promise<ResModel> {
    let url = `${BASE_URL}/records/${id}/message`;
    //let url=`http://172.16.1.234:9080/records/${id}/message`;
    return this._httpInterceptorService.request('GET', url,params).toPromise();
  }
  //9 获取接收消息的人员id字符串
  getIds(usersType:string,params?): Promise<ResModel> {
    //根据userType调用不同接口
    let url:string;
    if(usersType=='members'){
      url = `${BASE_URL}/members/memberMessagesIds`
      //url=`http://172.16.1.225:9080/members/memberMessagesIds?access_token=84b41b07-9061-4c98-906d-4bbf17bcd7d1`;
    }else if(usersType=='users'){
      //url=`http://172.16.1.234:9080/staffs/ids`;
      url = `${BASE_URL}/staffs/ids`
    }
    return this._httpInterceptorService.request('GET', url,params).toPromise();

  }
  //10 导出表格
  exportForm(params): Promise<any> {
    const access_token = getStorage({ key: 'token' }).access_token;
    return this.http.get(`${BASE_URL}/messages/specialExport?access_token=${access_token}`, new RequestOptions({
      responseType: ResponseContentType.Blob,
      search: params
    })).toPromise();
  }
  //8 查询会员id数组中的会员列表
  getIdsMembers(params):Promise<ResModel> {
    //return this._httpInterceptorService.request('GET', `${this.url}/scope?access_token=${this.accessToken}`, params).toPromise();
    return this._httpInterceptorService.request('GET', `${BASE_URL}/activities/scope`,params).toPromise();
    //console.log(ids);
  }
}
