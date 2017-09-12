import {Injectable} from '@angular/core';
import {SERVER} from "../../const";
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
// import {RoleWithSysUserIdsVO} from "./components/role-edit/RoleWithSysUserIdsVO";
import {Message} from "../../model/auth/message-edit";
@Injectable()
export class MessageService extends BaseService<any>{

  // private roleManageUrl = SERVER+'/sys/role';  // URL to web api 
  private MessangUrl = SERVER+'/sys/role';  // URL to web api
// 临时方法 数据 
  getDatas(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':[
            {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"01"},
            {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"02"},
            {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"03"},
            {"roleName":"xxxx","validState":"短信","sendTime":"2017-08-18 09:21:12","sendway":"已发","msgId":"04"}, 
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

  getRoles(): Promise<Result> {
    return this.getAll(this.MessangUrl);
  }

  getRoleById(id: string): Promise<Result> {
    const url = `${this.MessangUrl}/${id}`;
    return this.getAll(url);
  }
 /*新增*/
  createMessage(template:Message): Promise<Result> {
    const url = `${this.MessangUrl}/`;
    return this.create(url,template);
  }
  /*修改*/
  updateMessage(template:Message): Promise<Result> {
    const url = `${this.MessangUrl}/`;
    return this.update(url,template);
  }
  /*删除*/
  deleteMessage(id: string): Promise<Result> {
    const url = `${this.MessangUrl}/${id}`;
    return this.delete(url);
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
