import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MessageService extends BaseService<ResModel>{
  accessToken = getStorage({ key: 'token' }).access_token;
  private MessageUrl = `http://172.16.7.3:9010/messages`;  // 消息
  private RecordUrl = `http://172.16.7.3:9010/records`;  // 发送记录
  private MembersUrl =`http://172.16.7.4:9080/members/`; //获取会员列表
  private UsersUrl =`http://172.16.1.27:8090/staffs`; //获取员工列表
  private MembersIdsUrl =`http://172.16.1.234:8090/users/ids?access_token=${this.accessToken}`; //获取全部会员id字符串
  private UsersIdsUrl =`http://172.16.1.27:8090/staffs/ids?pageNum=1&pageSize=10000`; //获取全部员工id字符串
  // 1获取消息列表
  getDatas(pageInfo:any): Promise<ResModel> {
    console.log(this.accessToken);
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    return this._httpInterceptorService.request('GET', `${this.MessageUrl}${page}${sort}${query}`,{}, true).toPromise();
  }
  //2 获取一条消息
  getMessageById(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.MessageUrl}/${id}`,{}, true).toPromise();
  }
 //3 新增
  postOne(params): Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.MessageUrl}`, params).toPromise();
  }
  //4 修改
  putOne(params):  Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${this.MessageUrl}`, params,true).toPromise();
  }
  //5 删除
  deleteMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MessageUrl}/${id}`).toPromise();
  }
  //6 逻辑删除
  deleteLogicalMessage(id: string): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${this.MessageUrl}/logical/${id}`).toPromise();
  }
  //7 获取人员列表
  getUsers(usersType:string,pageInfo:any): Promise<ResModel> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    let url =`${page}${query}`;
    if(usersType=='members'){
      url = `${this.MembersUrl}`+url;
    }else if(usersType=='users'){
      url = `${this.UsersUrl}`+url;
    }
    return this._httpInterceptorService.request('GET', url,{}, true).toPromise();
  }
  //8 获取一条已经发送的消息对应的发送记录
  getRecords(id:string,pageInfo:any): Promise<ResModel> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.RecordUrl}/${id}/message${page}${sort}${query}`;

    return this._httpInterceptorService.request('GET', url,{}, true).toPromise();
  }
// 获取接收消息的人员id字符串
  getIds(usersType:string,query?): Promise<ResModel> {
    //根据userType调用不同接口
    const jsonQueryObj = query;
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    let url="";
    if(usersType=='members'){
      url = `${this.MembersIdsUrl}?${query}`;
    }else if(usersType=='users'){
      url = `${this.UsersIdsUrl}?${query}`;
    }
    return this._httpInterceptorService.request('GET', url,{}, true).toPromise();
  }
}
