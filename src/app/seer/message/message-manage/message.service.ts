import {Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
import {Message} from "../../model/auth/message-edit";
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MessageService extends BaseService<any>{

  accessToken = getStorage({ key: 'token' }).access_token;
  private MessageUrl = `http://172.16.1.234:8080/messages`;  // 消息
  private RecordUrl = `http://172.16.1.234:8080/records`;  // 发送记录
  private MembersUrl =`http://172.16.7.4:9080/members?access_token=${this.accessToken}`; //获取会员列表
  private UsersUrl =`http://172.16.1.27:8090/staffs`; //获取员工列表
  private MembersIdsUrl =`http://172.16.1.234:8090/users/ids?access_token=${this.accessToken}`; //获取全部会员id字符串
  private UsersIdsUrl =`http://172.16.1.27:8090/staffs/ids?pageNum=1&pageSize=10000`; //获取全部员工id字符串
  // 获取消息列表
  getDatas(pageInfo:any): Promise<any> {
    const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.MessageUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
    console.log(url);
    return this.getAll(url);
  }
  // 获取人员列表
  getUsers(usersType:string,pageInfo:any): Promise<any> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    //const sort=`&sortBy=${pageInfo.sort}`;
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
    //console.log(this.accessToken);
    console.log('----------');
    console.log(url);
    return this.getAll(url);

  }
  //获取一条消息
  getMessageById(id: string): Promise<Result> {
    const url = `${this.MessageUrl}/${id}?access_token=${this.accessToken}`;
    return this.getById(url);
  }
 /*新增*/
  postOne(template): Promise<Result> {
    const url = `${this.MessageUrl}?access_token=${this.accessToken}`;
    return this.create(url,template);
  }
  /*修改*/
  putOne(template): Promise<Result> {
    const url = `${this.MessageUrl}?access_token=${this.accessToken}`;
    return this.update(url,template);
  }
  /*删除*/
  deleteMessage(id: string): Promise<Result> {
    const url = `${this.MessageUrl}/${id}?access_token=${this.accessToken}`;
    return this.delete(url);
  }
  /*获取一条已经发送的消息对应的发送记录*/
  getRecords(id:string,pageInfo:any): Promise<Result> {
    const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.RecordUrl}/${id}/message?access_token=${this.accessToken}${page}${sort}${query}`;
    return this.getAll(url);
  }
// 获取接收消息的人员id字符串
  getIds(usersType:string,query?): Promise<any> {
    //根据userType调用不同接口
    const jsonQueryObj = query;
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.UsersIdsUrl}&${query}`;
    return this.getAll(url);
  }
}
