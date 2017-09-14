import { Injectable } from '@angular/core';
import {
  Http,
  Headers
} from "@angular/http";
import { SERVER } from "../../const";
import { User } from "../../model/auth/user";
import { BaseService } from "../../base.service";
import { RoleService } from "../role/role.service";
import { Result } from "../../model/result.class";

@Injectable()
export class UserManageService {

  private userManageUrl = SERVER + '/sys/user';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<User>, private roleManageService:RoleService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getRoles(): Promise<Result> {
    return this.roleManageService.getRoles();
  }

  getUsers(): Promise<any> {
    // 原有真实数据请求
                                                                                                                                                                                                                                                                                                                                              // return this.baseService.getAll(this.userManageUrl);
    return this.baseService.getAll(this.userManageUrl);
    // 为了页面显示的假数据
    // return new Promise((resolve, reject) => {
    //   resolve(
    //     {
    //       'success': true,
    //       'data':[
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //         {"account":"xxxx","userName":"王大崔","organ":"大连总部","count":"正常","userId":"192.168.1.113","createTime":"2017-08-18 09:21:12","operator":"admin","updataTime":"017-08-18 09:21:12","roles":"超级管理员"},
    //       ]
    //     } 
    //   )
    // })
  }

  // getUserById(id: string): Promise<Result> {
  //   return this.getUsers().then(users => users.find(user => user.userId === id));
  // }

  updateUser(user: User): Promise<Result> {
    const url = `${this.userManageUrl}`;
    return this.baseService.update(url,user);
  }

  createUser(user: User): Promise<Result> {
    const url = `${this.userManageUrl}`;
    return this.baseService.create(url,user);
  }

  deleteUser(id: string): Promise<Result> {
    const url = `${this.userManageUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchUsers(param:any): Promise<Result> {
    const url = `${this.userManageUrl}`;
    return this.baseService.search(url,param);
  }

  batchDeleteUser(ids: string[]): Promise<Result> {
    const url = `${this.userManageUrl}/batch`;
    return this.baseService.batchDelete(url, ids);
  }

  getStaffsWithOrgs():Promise<Result>{
    const url = `${SERVER}/sys/role/staffsWithOrg`;
    return this.baseService.getAll(url);
  }
}
