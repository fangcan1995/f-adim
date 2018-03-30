import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services";
import { parseJson2URL, getStorage } from '../../../theme/libs/utils';
@Injectable()
export class MessageService extends BaseService<ResModel>{
  constructor(protected _httpInterceptorService: HttpInterceptorService,) {
    super(_httpInterceptorService);
    //this.setApi('MESSAGES');
  }
  accessToken = getStorage({ key: 'token' }).access_token;

  url=`http://172.16.1.234:9080/messages`  //临时

  // 1 获取消息列表
  getDatas(params:any): Promise<ResModel> {
    console.log(this.accessToken);
    return this._httpInterceptorService.request('GET', `${this.url}`,params).toPromise();
    //return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MESSAGES']}`,params).toPromise();
  }
  //2 获取一条消息
  getMessageById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MESSAGES']}/${id}`).toPromise();
  }
 //3 新增
  postOne(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['MESSAGES']}`, params).toPromise();
  }
  //4 修改
  putOne(params):  Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['MESSAGES']}`, params).toPromise();
  }
  //5 删除
  deleteMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['MESSAGES']}/${id}`).toPromise();
  }
  //6 逻辑删除
  deleteLogicalMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['MESSAGES']}/logical/${id}`).toPromise();
  }
  //7 获取人员列表
  getUsers(usersType:string,params:any): Promise<ResModel> {
    let url:string;
    if(usersType=='members'){
       url = `${BASE_URL}/${API['MEMBERS']}/members/members/messages`
    }else if(usersType=='users'){
       url = `${BASE_URL}/${API['STAFFS']}`
    }
    return this._httpInterceptorService.request('GET', url,params).toPromise();
  }
  //8 获取一条已经发送的消息对应的发送记录
  getRecords(id:string,params:any): Promise<ResModel> {
    let url = `${BASE_URL}/${API['RECORDS']}/${id}/message`;
    return this._httpInterceptorService.request('GET', url,params).toPromise();
  }
// 获取接收消息的人员id字符串
  getIds(usersType:string,params?): Promise<ResModel> {
    //根据userType调用不同接口
    let url:string;
    if(usersType=='members'){
      url = `${BASE_URL}/${API['MEMBERS']}/members/members/ids`
    }else if(usersType=='users'){
      url = `${BASE_URL}/${API['STAFFS']}/ids`
    }
    return this._httpInterceptorService.request('GET', url,params).toPromise();

  }
}
