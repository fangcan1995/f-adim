import {Injectable} from '@angular/core';
import {SERVER} from "../../const";
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {SearchStaffDto} from "./SearchStaffDto";
import {HttpInterceptorService} from "../../../theme/services/http-interceptor.service"
import {StaffModule} from "./staff.module"
@Injectable()
export class StaffService extends BaseService<StaffModule>{
  /*private getAllRolesUrl = SERVER+'/sys/role';
  private getAllStaffsUrl = SERVER+'/basic/staff/all';
  private addStaffUrl = SERVER+'/basic/staff/ins';
  private getStaffByTermsUrl = SERVER+'/basic/staff/terms';
  private updateStaffUrl = SERVER+'/basic/staff/upd';
  private deleteByIdUrl = SERVER+'/basic/staff/';
  private deleteSelectedStaffUrl = SERVER+'/basic/staff/deleteSelected';
  private getOrgByIdUrl = SERVER+'/basicinfo/organization';*/
  //private excelExport = SERVER + '/sys/excel/download';
  private staffsAPI="http://172.16.1.249:8090/staffs";
  private educationsAPI="educations";
  private familyAPI="family";
  private businessAPI="experiences";

  private getStaffByIdUrl = SERVER+'/basic/staff/';
  private getOrgListUrl = SERVER+'/basicinfo/organizations'; //获取机构列表
  mockData= {
    "jobInfo":{
      "id":"1",
      "emCode":"2017090412369",  //员工编号
      "pDepartmentName":"互联网金融部",   //分公司
      "departmentName":"技术部",       //团队
      "position":"Java攻城狮",//职位
      "staffBankCard":"621000441122286" ,//工资卡
      "empState":"01",  //员工状态 STAFF_STATE
      "entryTime":"2016-08-18",   //入职时间
      "staffDimissionDate":"2017-08-18",  //离职时间
      "contractType":"02",   //合同类型 STAFF_CONTRACT_TYPE
      "contractId":"123456",  //合同编号
      "contractBeginTime":"2017-01-18",   //合同签订日期
      "contractEndTime":"2017-08-18",   //合同结束日期
    },
    "staffInfo":{
      "empName":"张三", //员工姓名
      "staffGender":"01",//性别
      "staffBirthday":"2000-01-01",//生日
      "staffOrigin":"大连", //籍贯
      "staffNation":"汉族",
      "staffCensusRegister":"大连",//户籍地
      "isMarried":"已婚", //婚姻情况
      "PoliticalStatus":"党员",//政治面貌
      "healthCondition":"健康",//健康状况
      "staffPhone":"1300000000",//手机号
      "staffIDnumber":"210211200001013621",//身份证号
      "certificate":"会计证",//证书
      "residence":"黄河路200号",//居住地
      "inviteNum":"6",  //邀请人数
      "loginNum":"10",   //登录次数
      "lastLoginTime":"2017-08-18 09:21:12", //最后登录时间
      "lastLoginIP":"192.168.1.1",  //最后登录IP
    },
    "educationalBackground":[
      {"id":"101","department":"大连大学","eduLevel":"会计","eduMajor":"无","endTime":"2002-08-01"},
      {"id":"102","department":"大连大学","eduLevel":"会计","eduMajor":"学士学位","endTime":"2004-08-01"},
    ],
    "family":[
      {"id":"1","name":"王老三","relation":"父子","phone":"15942810100","work":"老王服务公司市场经理"},
      {"id":"2","name":"孩他妈","relation":"母子","phone":"15942810100"},
    ],
    "businessExperience":[
      {"id":"1","startAndStopDate":"2015.9.6-2016.5.4","unit":"大连某公司","position":"市场经理","reterence":"大老王","telephone":"0411-8896326"}
    ],
    }//假数据
  listData=[
    {
      "id": "1",
      "emCode": "2017090412369",  //员工编号
      "pDepartmentName": "互联网金融部",   //分公司
      "departmentName": "技术部",       //团队
      "position": "Java攻城狮",//职位
      "empState": "01",  //员工状态 STAFF_STATE
      "entryTime": "2016-08-18",   //入职时间
      "empName": "张三", //员工姓名
      "inviteNum": "6",  //邀请人数
      "loginNum": "10",   //登录次数
      "lastLoginTime": "2017-08-18 09:21:12", //最后登录时间
      "lastLoginIP": "192.168.1.1",  //最后登录IP
    },
    {
      "id": "2",
      "emCode": "2017090412379",  //员工编号
      "pDepartmentName": "互联网金融部",   //分公司
      "departmentName": "技术部",       //团队
      "position": "Java攻城狮",//职位
      "empState": "01",  //员工状态 STAFF_STATE
      "entryTime": "2016-08-18",   //入职时间
      "empName": "李四", //员工姓名
      "inviteNum": "6",  //邀请人数
      "loginNum": "10",   //登录次数
      "lastLoginTime": "2017-08-18 09:21:12", //最后登录时间
      "lastLoginIP": "192.168.1.1",  //最后登录IP
    }
  ];//假数据

  private _httpInterceptorService: HttpInterceptorService
  // 1、获取数据列表
  //getLists(pageInfo:any): Promise<any> {
  getLists(pageInfo:any):Observable<any> {
    let res = {
      "code": "0",
      "message": "SUCCESS",
      data:{
        "pageNum": 1,
        "pageSize": 10,
        "total": 13,
        "list": this.listData
      }
    }
    return Observable.of(res);

    /*const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.staffsAPI}/${page}${sort}${query}`;
    return this.getAll(url);*/

  }
  //2、根据id获取员工信息
  //getOne(id: string): Promise<any> {
  getOne(id: string):Observable<any>{
    /*const url = `${this.staffsAPI}/${id}`;
    return this.getById(url);*/
    let res = {
      "code": "0",
      "message": "SUCCESS",
      data: this.mockData
    }
    return Observable.of(res);

  }
  // 3、添加一个员工
  postOne(params:StaffModule): Promise<any> {
    console.log(params);
    const url = `${this.staffsAPI}/`;
    return this.create(url,params);
  }
  // 4、删除一个员工
  deleteOne(id):  Promise<any> {
    const url = `${this.staffsAPI}/${id}`;
    return this.delete(url);
  }
  // 5、修改员工信息
  putOne(params): Promise<any> {
    const url = `${this.staffsAPI}/${params.id}`;
    console.log(params);
    console.log(url);
    return this.update(url,params);
  }
  // 6、新增教育经历
  postOneEdu(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.educationsAPI}`;
    console.log(params);
    console.log(url);
    return this.create(url,params);
  }
  // 7、修改教育经历
  putOneEdu(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.educationsAPI}/${params.id}`;
    console.log(params);
    console.log(url);
    return this.update(url,params);
  }
  //8、删除教育经理
  deleteEdu(staffid,eduId): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.educationsAPI}/${eduId}`;
    console.log(eduId);
    console.log(url);
    return this.delete(url);
  }
  // 9、新增工作经验
  postOneFamily(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.familyAPI}`;
    console.log(params);
    console.log(url);
    return this.create(url,params);
  }
  // 10、修改工作经验
  putOneFamily(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.familyAPI}/${params.id}`;
    console.log(params);
    console.log(url);
    return this.update(url,params);
  }
  //11、删除工作经验
  deleteFamily(staffid,familyId): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.familyAPI}/${familyId}`;
    console.log(familyId);
    console.log(url);
    return this.delete(url);
  }
  // 12、新增联系人
  postOneBusiness(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.businessAPI}`;
    console.log(params);
    console.log(url);
    return this.create(url,params);
  }
  // 13、修改联系人
  putOneBusiness(staffid,params): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.businessAPI}/${params.id}`;
    console.log(params);
    console.log(url);
    return this.update(url,params);
  }
  //14、删除联系人
  deleteBusiness(staffid,businessId): Promise<any> {
    const url = `${this.staffsAPI}/${staffid}/${this.businessAPI}/${businessId}`;
    console.log(businessId);
    console.log(url);
    return this.delete(url);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  /*createStaff(params): Observable<any> {
    //假数据处理
    let id = _.reduce(this.listData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.listData.push(params)
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }*/
  /*getCurrentRoles(): Observable<any> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.get(this.getAllRolesUrl,options)
    .map(this.extractData)
    .catch(this.handleError);
}*/
  /*getOrgById(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrgByIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
 /* putOneEdu(id,params): Observable<any> {
    //return this._httpInterceptorService.request('PUT', `{this.updateStaffUrl}/${id}`, params)
    //
    /!*let index2 = _.findIndex(this.listData., t => t.id === id);
    if ( index2 != -1 ) {
      this.listData[index2] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);*!/
    //
  }*/

  // 删除一条数据
  /*removeStaff(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  /*createStaff(params): Promise<Result> {
  const url = `${this.getOrgListUrl}/`;
  return this.create(url,params);
}*/

  // 修改一条数据，提供所有字段
  /*updateStaff (staff:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateStaffUrl,staff,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/



  getStaffById(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStaffByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  /* 查询全部库房 */
  getOrganizations(): Promise<Result> {
    let url = `${this.getOrgListUrl}`;
    return this.getAll(url);
  }




}


