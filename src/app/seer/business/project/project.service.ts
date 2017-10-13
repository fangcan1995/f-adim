import { Injectable } from '@angular/core';
import {BaseService} from "../../base.service";
import {SERVER} from "../../const";
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProjectService extends BaseService<any> {
  mockData = [
    {
      "projectId": "BBH1234567890223657867",
      "realName": "张三",
      "mobilePhone": "13813813138",
      "projectType": "汇车贷",
      "loanAmount": "100000.00",
      "lifeOfLoan": "3个月",
      "fullTime": "2017-08-15 12:12:11",
      "projectStatus": "还款中"
    },
    {
      "projectId": "BBH1234567890223657867",
      "realName": "李四",
      "mobilePhone": "13813813138",
      "projectType": "汇车贷",
      "loanAmount": "100000.00",
      "lifeOfLoan": "6个月",
      "fullTime": "2017-08-15 12:12:11",
      "projectStatus": "待提前还款审核"
    },
    {
      "projectId": "BBH1234567890223657867",
      "realName": "王五",
      "mobilePhone": "13813813138",
      "projectType": "汇车贷",
      "loanAmount": "100000.00",
      "lifeOfLoan": "12个月",
      "fullTime": "2017-08-15 12:12:11",
      "projectStatus": "已结清"
    }
  ];
  //项目
  private apiUrl = SERVER + '/projects';

  // 意向列表(分页)
  public getProjectList(params?): any {

    return this.mockData;
  }

  // 获取一条数据
  //getOne(params): Promise<any> {
  //const url = `${this.apiUrl}/${projectId}`;
  //return this.getById(url);
//}
  getOne(params): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.projectId === params);
    console.log(data);
    let res = {
      code: 0,
      message: "SUCCESS",
      data:{
        memberInfo: {
          "realName": "张三",
          "mobilePhone": "13813813138"
        },   //基本信息
        loanInfo: {
          "jkje":"100000.00"
        },     //借款信息
        pawnVehicle: [{
          "clpp":"宝马",
          "clxh":"X5",
          "cjh":"XXX",
          "cph":"XXX",
          "djzh":"XXX",
          "cl":"3年",
          "xslc":"100公里",
          "pgjg":"160000.00",
        }],    //抵押物（车辆）信息
        pawnHouse: [/*{
          "fcdz":"金马路20号",
          "jzmj":"100平方米",

        }*/],    //抵押物（房产）信
        projectInfo: {
          "aaa":"2017-08-17  00:00:00","bbb":"10"
        },     //项目信息
        creditInfo: [
          {"aaa":"个人风险汇总信息","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
          {"aaa":" 个人信用报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
          {"aaa":" 个人反欺诈分析报告","bbb":"已查询","ccc":"2018-09-12 15:00:00"},
        ],   //个人征信列表
        attachment: [
          {"aaa":"xxxx","bbb":"2018-09-12 15:00:00"},
          {"aaa":" xxxx","bbb":"2018-09-12 15:00:00"},
          {"aaa":" xxxx","bbb":"2018-09-12 15:00:00"},
        ],   //附件列表
        investInfo:[
          {"aaa":"dreaming","bbb":"柳岩","ccc":"13840982567","ddd":"10000.00","eee":"2017-08-17 13:00:00","fff":"Andriod手机端"},
          {"aaa":"123","bbb":"宋洋洋","ccc":"13840982567","ddd":"10000.00","eee":"2017-08-17 13:00:00","fff":"IOS手机端"}
        ],//投资记录
        repayInfo:[
          {"aaa":"1","bbb":"2017-05-16","ccc":"2017-05-16 13:00:00","ddd":"3000.00","eee":"30.00","fff":"0.00","ggg":"3030.00","hhh":"已正常还款"},
          {"aaa":"2","bbb":"2017-04-16","ccc":"2017-05-16 13:00:00","ddd":"2000.00","eee":"20.00","fff":"0.00","ggg":"2020.00","hhh":"逾期已还"},
          {"aaa":"3","bbb":"2017-03-16","ccc":"2017-05-16 13:00:00","ddd":"1000.00","eee":"10.00","fff":"0.00","ggg":"1010.00","hhh":"逾期已还"},
        ],//还款记录
        approvalInfo:[
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
          {"aaa":"XXX","bbb":"XXX","ccc":"XXX","ddd":"XXX"},
        ],//审批流程记录
        adRepay:{
          "aaa":"10000.00","bbb":"100.00","ccc":"100.00","ddd":"2017-08-17 13:00:00"
        }
      }
    }
    return Observable.of(res);
  }

  //提交审核
  public postOne(params?): Promise<any> {
    return this.create(this.apiUrl, params);
  }

}
