import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";
import { User } from "../../model/auth/user";
import {Result} from "../../model/result.class";
import * as _ from 'lodash';
@Injectable()
export class InfoPublishService             {
    private orgManageUrl = SERVER + '/basicinfo';
    private userManageUrl = SERVER + '/sys/user';
    private roleManageUrl = SERVER+'/sys/role';
    // private headers = new Headers({'Content-Type': 'application/json'});
    mockData = [
        {"roleName":"小花","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"01"},
        {"roleName":"小草","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"02"},
        {"roleName":"小人","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"03"},
        {"roleName":"小鱼","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"04"},
        {"roleName":"小美","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"05"},
        {"roleName":"小丑","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"06"},
        {"roleName":"小天","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"07"},
        {"roleName":"小年","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"08"},
        {"roleName":"小蒙","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"09"},
        {"roleName":"小狗","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"10"},
        {"roleName":"小蒙","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"09"},
        {"roleName":"小狗","validState":"15800624187","operateTime":"提前还款","number":"333","createTime":"2017-02-07 10:20:28","createUser":"me","sendStage":"已发送","sendDate":"2017-02-07 10:20:28","msgId":"10"}
    ]
    constructor(private http: Http, private baseService: BaseService<any>) {
    }

    private handleError(error: any): Promise<any> {
        console.error('出错啦', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    // 右侧表格假数据
    getDatas(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          'success': true,
          'data':this.mockData 
        } 
      )
    })
  }
    // 删除一条数据
  deleteOne(id): Observable<any> {
    // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
    let data = _.remove(this.mockData, x => x.msgId === id);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
  }
     /*
   * 查询全部库房
   * */
    getOrganizations(): Promise<Result> {
        let url = `${this.orgManageUrl}/organizations`;
        return this.baseService.getAll(url);
    }
    // 用于模态层树的保存调用
    createUser(user: User): Promise<Result> {
    const url = `${this.userManageUrl}`;
    return this.baseService.create(url,user);
   }
   
//   getRoles(): Promise<Result> {
//     return this.getAll(this.roleManageUrl);
//   }
   
    /*
    * 根据组织id获取员工
    * */
    getStaffsByOrgId(orgId): Promise<Result> {
        let url = `${this.orgManageUrl}/organization/staffs/${orgId}`;
        return this.baseService.getAll(url);
    }

    operationRecord(data) {
        let url = `${this.orgManageUrl}/organization/operation`;
        return this.baseService.update(url,data);
    }

    updateStaffOrgId(data) {
        let url = `${this.orgManageUrl}/organization/staff`;
        return this.baseService.update(url,data);
    }

    addOrganization(data) {
        let url = `${this.orgManageUrl}/organization`;
        return this.baseService.create(url,data);
    }

    editOrganization(data) {
        let url = `${this.orgManageUrl}/organization`;
        return this.baseService.update(url, data);
    }

    delOrganization(orgId) {
        let url = `${this.orgManageUrl}/organization/${orgId}`;
        return this.baseService.delete(url);
    }
}
