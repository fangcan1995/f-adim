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
            {"roleName":"小花","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"01"},
            {"roleName":"小草","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"02"},
            {"roleName":"小人","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"03"},
            {"roleName":"小鱼","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"04"},
            {"roleName":"小美","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"05"},
            {"roleName":"小丑","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"06"},
            {"roleName":"小天","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"07"},
            {"roleName":"小年","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"08"},
            {"roleName":"小蒙","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"09"},
            {"roleName":"小狗","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"10"},
            {"roleName":"小蒙","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"09"},
            {"roleName":"小狗","validState":"15800624187","operateTime":"提前还款","operator":"短信","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"10"}
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
  //   const url = `${SERVER}/sys/resource`;
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
  //   const url = `${SERVER}/sys/user/staff/${staffId}`;
  //   return this.getAll(url);
  // }

  // getUsersByRoleId(roleId:string): Promise<Result>{
  //   const url = `${SERVER}/sys/user/role/${roleId}`;
  //   return this.getAll(url);
  // }

  // updateUserRole(roleId:string, userIds:string[]):Promise<Result>{
  //   const url = `${SERVER}/sys/user/role/${roleId}`;
  //   return this.update(url, userIds);
  // }

  // getSysUsersWithOrgs():Promise<Result>{
  //   const url = `${SERVER}/sys/role/accountsWithOrg`;
  //   return this.getAll(url);
  // }
}
