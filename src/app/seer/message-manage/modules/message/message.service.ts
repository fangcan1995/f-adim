import {Injectable} from '@angular/core';
import {SERVER} from "../../../const"
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
// import {RoleWithSysUserIdsVO} from "./components/role-edit/RoleWithSysUserIdsVO";
import {Message} from "../../../model/auth/message-edit";
@Injectable()
export class MessageService extends BaseService<any>{

  // private roleManageUrl = SERVER+'/sys/role';  // URL to web api
  private MessangUrl = SERVER+'/sys/role';  // URL to web api

  // 获取消息列表
  getDatas(): Promise<any> {
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
    })
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

    /*const url = `${this.staffsAPI}/${id}`;
    return this.getById(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data': {"id":"1","aaa":"用户关怀","bbb":"后台员工","ccc":"消息类型1","ddd":0,"eee":0,"fff":1,"ggg":"","hhh":"2017-10-18 09:21:12","iii":"2017-08-18 09:21:12","jjj":"赵某某",
            "isPushed":"1","isShow":"1"}
        }
      )
    })

  }
 /*新增*/
  createMessage(template:Message): Promise<Result> {
    const url = `${this.MessangUrl}/`;
    return this.create(url,template);
  }
  /*修改*/
  updateMessage(template:Message): Promise<Result> {
    console.log(template);
    const url = `${this.MessangUrl}/`;
    return this.update(url,template);
  }
  /*删除*/
  deleteMessage(id: string): Promise<Result> {
    const url = `${this.MessangUrl}/${id}`;
    return this.delete(url);
  }

//?????????????下面的代码不知道有什么用
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
            {"Name":"xxxx","State":"短信","way":"自动","Time":"2017-08-18 09:21:12","type":"短信","Id":"01"},
            {"Name":"xxxx","State":"短信","way":"自动","Time":"2017-08-18 09:21:12","type":"短信","Id":"01"},
            {"Name":"xxxx","State":"短信","way":"自动","Time":"2017-08-18 09:21:12","type":"短信","Id":"01"},
            {"Name":"xxxx","State":"短信","way":"自动","Time":"2017-08-18 09:21:12","type":"短信","Id":"01"},
            {"Name":"xxxx","State":"短信","way":"自动","Time":"2017-08-18 09:21:12","type":"短信","Id":"01"},
          ]
        }
      )
    })
  }
  getAddData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
            {"name":"xxxx","type":"贷款","concent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","id":"1"},
            {"name":"xxxx","type":"贷款","concent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","id":"2"},
            {"name":"xxxx","type":"贷款","concent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","id":"3"},
            {"name":"xxxx","type":"贷款","concent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","id":"4"},
          ]
        }
      )
    })
  }
  getdialog(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
            {"name":"xxxx","realName":"王大崔","phone":"1333333333"},
            {"name":"xxxx","realName":"王大崔","phone":"1333333333"},
            {"name":"xxxx","realName":"王大崔","phone":"1333333333"},
          ]
        }
      )
    })
  }
  getdialogData(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
            {"name":"xxxx","realName":"王大崔","phone":"1333333333","idCard":"xxxxxxx","sex":"男"},
            {"name":"xxxx","realName":"王大崔","phone":"1333333333","idCard":"xxxxxxx","sex":"男"},
            {"name":"xxxx","realName":"王大崔","phone":"1333333333","idCard":"xxxxxxx","sex":"男"},
            {"name":"xxxx","realName":"王大崔","phone":"1333333333","idCard":"xxxxxxx","sex":"男"},
          ]
        }
      )
    })
  }

  getRoles(): Promise<Result> {
    return this.getAll(this.MessangUrl);
  }

//  每天id 返回数据  修改
  // getById(id: string): Promise<any> {
  //   return new Promise((resolve,reject) =>{
  //     resolve(
  //       // {
  //       //   'success': true,
  //       //   'data':[
  //       //     { tplId: "01",
  //       //       tplName:"小花",
  //       //       tplCode:"13520550355",
  //       //       tplType:"短信",
  //       //     }
  //       //   ]
  //       // }
  //     )
  //   })
  // }


  // deleteRole(id: string): Promise<Result> {
  //   const url = `${this.MessangUrl}/${id}`;
  //   return this.delete(url);
  // }

  // searchRoles(param:any): Promise<Result> {
  //   const url = `${this.roleManageUrl}/search`;
  //   return this.search(url, param);
  // }

  // getResources(): Promise<Result>{
  //   const url = `${SERVER}/system/resource`;
  //   return this.getAll(url);
  // }

  // getAllOrgs(): Promise<Result>{
  //   const url = `${SERVER}/basicinfo/organizations`;
  //   return this.getAll(url);
  // }

  // getStaffsByOrgId(orgId:string): Promise<Result>{
  //   const url = `${SERVER}/basic/staff/org/${orgId}`;
  //   return this.getAll(url);
  // }

  // getSysUsersByStaffId(staffId:string): Promise<Result>{
  //   const url = `${SERVER}/system/user/staff/${staffId}`;
  //   return this.getAll(url);
  // }

  // getUsersByRoleId(roleId:string): Promise<Result>{
  //   const url = `${SERVER}/system/user/role/${roleId}`;
  //   return this.getAll(url);
  // }

  // updateUserRole(roleId:string, userIds:string[]):Promise<Result>{
  //   const url = `${SERVER}/system/user/role/${roleId}`;
  //   return this.update(url, userIds);
  // }

  // getSysUsersWithOrgs():Promise<Result>{
  //   const url = `${SERVER}/system/role/accountsWithOrg`;
  //   return this.getAll(url);
  // }
}
