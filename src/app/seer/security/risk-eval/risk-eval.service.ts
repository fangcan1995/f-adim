import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {BaseService} from "../../base.service";
import {parseQueryString, getStorage} from "../../../theme/libs/utils"
import {
  HttpInterceptorService,
} from '../../../theme/services';
import {
  BASE_URL,
  API,
} from '../../../theme/services/base.service';
import {promise} from "selenium-webdriver";
@Injectable()
export class RiskEvalService extends BaseService<any>{
  accessToken = getStorage({ key: 'token' }).access_token;
  private riskEvalUrl = '/riskEvals';  // 接口，请修改
  listData=[
    {
      "id": "1",
      "examName": "当您进行投资时，能接受的亏损程度是多少？",
      "riskEvalQuestionType": "0",
      "updateDate": "1509329471000",
      "answers": [
        {"id": "A", "title": "无法承受风险", "score": "1"},
        {"id": "B", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "C", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "D", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    },
    {

        "id": "2",
        "examName": "在一般情況下，在您的家庭收入中，有百分之几可用作投资或储蓄？",
        "riskEvalQuestionType": "1",
        "updateDate": "1509329471000",
        "answers": [
        {"id": "A", "title": "无法承受风险", "score": "1"},
        {"id": "B", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "C", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "D", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    },
    {
        "id": "3",
        "examName": "您对风险的承受程度是？",
        "riskEvalQuestionType": "1",
        "updateDate": "1509329471000",
         "answers": [
        {"id": "A", "title": "无法承受风险", "score": "1"},
        {"id": "B", "title": "虽然厌恶风险但愿意承担一些风险", "score": "2"},
        {"id": "C", "title": "在深思熟虑后愿意承担一定的风险", "score": "3"},
        {"id": "D", "title": "敢冒风险，比较激进", "score": "4"},
      ]
    }
  ];  //假数据

  //1 获取数据列表
  getRiskEvals(pageInfo:any):  Promise<any> {
    /*const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.riskEvalUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
    console.log(url);
    return this.getAll(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':{
            "pageNum": 1,
            "pageSize": 10,
            "total": 13,
            "list":this.listData,
          }
        }
      )
    });
  }

  //2 获取一条数据
  getOne(id: string):  Promise<any> {
    /*const url = `${this.riskEvalUrl}/${id}?access_token=${this.accessToken}`;
    console.log(url);
    return this.getById(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':_.find(this.listData, x => x.id === id)
        }
      )
    });

  }

  // 3 添加一条题目
  postOne(params):  Promise<any> {
    /*const url = `${this.riskEvalUrl}?access_token=${this.accessToken}`;
    return this.create(url,params);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'id':'10'
        }
      )
    });
  }

  // 4 修改一条数据
  putOne(params):  Promise<any> {
    /*const url = `${this.riskEvalUrl}?access_token=${this.accessToken}`;
    return this.update(url,params);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    });
  }

  // 5 删除一条数据
  deleteOne(id):  Promise<any> {
    /*const url = `${this.riskEvalUrl}/${id}?access_token=${this.accessToken}`;
    return this.delete(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    });
  }

  // 6 添加一条题目
  postAnswers(id,params):  Promise<any> {
    /*const url = `${this.riskEvalUrl}?access_token=${this.accessToken}/${id}/answers`;
    return this.create(url,params);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    });
  }
  // 7 修改一个答案
  putOneAnswer(id,params):  Promise<any> {
    /*const url = `${this.riskEvalUrl}?access_token=${this.accessToken}/{id}/answers`;
    return this.update(url,params);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    });
  }

  // 8 删除一条答案
  deleteOneAnswer(id):  Promise<any> {
    /*const url = `${this.riskEvalUrl}?access_token=${this.accessToken}${id}`;
    return this.delete(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
        }
      )
    });
  }
}
