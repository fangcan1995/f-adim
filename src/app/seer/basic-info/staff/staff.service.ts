import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {
  HttpInterceptorService,
} from '../../../theme/services';
import {
  BASE_URL,
  API,
} from '../../../theme/services/base.service';
import {NewStaffDto} from "./NewStaffDto";
import {SearchStaffDto} from "./SearchStaffDto";
import {SERVER} from "../../const";



@Injectable()
export class StaffService {

  private getAllRolesUrl = SERVER+'/sys/role';

  private getAllStaffsUrl = SERVER+'/basic/staff/all';
  private addStaffUrl = SERVER+'/basic/staff/ins';
  private getStaffByTermsUrl = SERVER+'/basic/staff/terms';

  private updateStaffUrl = SERVER+'/basic/staff/upd';
  private deleteByIdUrl = SERVER+'/basic/staff/';
  private getStaffByIdUrl = SERVER+'/basic/staff/';
  private deleteSelectedStaffUrl = SERVER+'/basic/staff/deleteSelected';
  private getOrgByIdUrl = SERVER+'/basicinfo/organization';

  private excelExport = SERVER + '/sys/excel/download';
  listData=[
    {
      "id":"1",
      "staffNo":"2017090412369",  //员工编号
      "orgName":"互联网金融部",   //分公司
      "staffTeam":"技术部",       //团队
      "staffPosition":"Java攻城狮",//职位
      "staffState":"01",  //员工状态 STAFF_STATE
      "staffEntryDate":"2016-08-18",   //入职时间
      "staffDimissionDate":"2017-08-18",  //离职时间
      "contractType":"02",   //合同类型 STAFF_CONTRACT_TYPE
      "contractId":"123456",  //合同编号
      "contractBeginTime":"2017-01-18",   //合同签订日期
      "contractEndTime":"2017-08-18",   //合同结束日期

      "staffName":"张三", //员工姓名
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
      "educationalBackground":[
        {"school":"大连大学","profession":"会计","degree":"无","graduationDate":"2002-08-01"},
        {"school":"大连大学","profession":"会计","degree":"学士学位","graduationDate":"2004-08-01"},
      ],
      "family":[
        {"id":"1","name":"王老三","relation":"父子","phone":"15942810100","work":"老王服务公司市场经理"},
        {"id":"2","name":"孩他妈","relation":"母子","phone":"15942810100"},
      ],
      "businessExperience":[
        {"id":"1","startAndStopDate":"2015.9.6-2016.5.4","unit":"大连某公司","position":"市场经理","reterence":"大老王","telephone":"0411-8896326"}
      ],
    },
    {
      "id":"2","staffNo":"2017090412370","staffName":"刘某","orgName":"互联网金融部","staffTeam":"技术部","staffPosition":"设计师","staffState":"00",
      "staffEntryDate":"2017-08-18","inviteNum":"2", "loginNum":"8", "lastLoginTime":"2017-08-18 09:21:12","lastLoginIP":"192.168.1.1"
    },

  ];//假数据
  constructor (
    private http: Http,
    private _httpInterceptorService: HttpInterceptorService,
  ) {}
  getOne(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    /*return this.http.get(this.getStaffByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);*/
    let data = _.find(this.listData, x => x.id === id);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
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

  getCurrentRoles(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getAllRolesUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOrgById(staffOrgId:string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getOrgByIdUrl+"/"+staffOrgId,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getStaffByTerms(searchStaffDto: SearchStaffDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getStaffByTermsUrl,searchStaffDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // 获取数据列表
  /*getLists (): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.http.get(this.getAllStaffsUrl,options).map(this.extractData).catch(this.handleError))
    return this.http.get(this.getAllStaffsUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  getLists(): Observable<any> {
    let res = {
      code: 0,
      msg: '',
      data: this.listData,
      extras: {}
    }
    return Observable.of(res)
  }




  // 修改一条数据，提供所有字段
  /*updateStaff (staff:Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateStaffUrl,staff,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  putOne(id, params): Observable<any> {
    // return this._httpInterceptorService.request('PUT', `${baseUrl}/${apis['MEMBERS']}/${id}`, params)
    let index = _.findIndex(this.listData, t => t.id === id);
    if ( index != -1 ) {
      this.listData[index] = params;
    }
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    }
    return Observable.of(res);
  }

  // 添加一条数据
  /*addStaff (newStaffDto:NewStaffDto): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addStaffUrl,newStaffDto,options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  postOne(params): Observable<any> {
    // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
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
  }

  // 删除一条数据
  /*removeStaff(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.deleteByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  deleteOne(id): Observable<any> {
    // return this._httpInterceptorService.request('DELETE', `${baseUrl}/${apis['MEMBERS']}/${id}`)
    let data = _.remove(this.listData, x => x.id === id);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    }
    return Observable.of(res);
  }


  getStaffById(id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getStaffByIdUrl+"/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  removeAllSelectedStaffs (ids:Array<String>): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.deleteSelectedStaffUrl,ids,options)
      .map(this.extractData)
      .catch(this.handleError);
  }






}


