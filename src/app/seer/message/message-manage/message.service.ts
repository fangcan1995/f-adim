import {Injectable} from '@angular/core';
import {SERVER} from "../../const";
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
// import {RoleWithSysUserIdsVO} from "./components/role-edit/RoleWithSysUserIdsVO";
import {Message} from "../../model/auth/message-edit";
import {parseQueryString, getStorage} from "../../../theme/libs/utils"
@Injectable()
export class MessageService extends BaseService<any>{

  accessToken = getStorage({ key: 'token' }).access_token;
  //accessToken='c516230a-4d45-4834-93a7-de24d700a5be';
  private MessageUrl = `http://172.16.1.234:8080/messages`;  // 消息
  private RecordUrl = `http://172.16.1.234:8080/records`;  // 发送记录



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
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':
            {
              "pageNum": 1,
              "pageSize": 10,
              "total": 13,
              "list": [
              {"id":"1","aaa":"用户关怀","bbb":"前台用户","ccc":"消息类型1","ddd":"0","eee":"0","fff":"0","ggg":"","hhh":"2017-10-18 09:21:12","iii":"2017-08-18 09:21:12","jjj":"赵某某",
              "isPushed":"1","isShow":"1"},
              {"id":"3","aaa":"活动提醒","bbb":"前台用户","ccc":"消息类型1","ddd":"1","eee":"1","fff":"1","isPushed":"0","isShow":"1"},
              {"id":"4","aaa":"催款通知","bbb":"前台用户","ccc":"消息类型1","ddd":"1","eee":"0","fff":"1","isPushed":"0","isShow":"1"},
              {"id":"7","aaa":"催款通知","bbb":"前台用户","ccc":"消息类型1","ddd":"0","eee":"1","fff":"1","isPushed":"0","isShow":"1"},
              {"id":"8","aaa":"催款通知","bbb":"后台员工","ccc":"消息类型1","ddd":"1","eee":"0","fff":"1","isPushed":"1","isShow":"1"},
              {"id":"9","aaa":"催款通知","bbb":"后台员工","ccc":"消息类型1","ddd":"0","eee":"0","fff":"1","isPushed":"1","isShow":"0"},
             ]
            }
        }
      )
    })*/
  }
  // 获取人员列表
  getUsers(usersType:string): Promise<any> {
    //根据userType调用不同接口
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':
            {
              "pageNum": 1,
              "pageSize": 10,
              "total": 13,
              "list": [
                {"id":"1","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"2","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"3","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"4","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"5","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"6","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"7","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"8","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"9","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},
                {"id":"10","aaa":"dreaming","bbb":"柳岩","ccc":"13591111234","ddd":"210503185409253621"},


              ]
            }
        }
      )
    })
  }
  //获取一条消息
  getMessageById(id: string): Promise<Result> {

    const url = `${this.MessageUrl}/${id}?access_token=${this.accessToken}`;
    console.log(url);
    return this.getById(url);
    /*return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data': {"id":"1","aaa":"用户关怀","bbb":"后台员工","ccc":"消息类型1","ddd":0,"eee":0,"fff":1,"ggg":"","hhh":"2017-10-18 09:21:12","iii":"2017-08-18 09:21:12","jjj":"赵某某",
            "isPushed":"1","isShow":"1"}
        }
      )
    })*/

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

}
