import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {
  HttpInterceptorService,
} from '../../../theme/services';
import {
  BASE_URL,
  API,
} from '../../../theme/services';
@Injectable()
export class RiskRatingService{
  private riskRatingUrl = '/riskRatings';  // 接口，请修改
  listData=[
    {
      "id":"1","s2id_riskLevel":"1","s2id_riskLevelName":"保守型","scoreStart":"0","scoreEnd":"10","score":"0-10","investGrade1":"C", "investTotal":"100000.00",
      "remarks":""
    },
    {
      "id":"2","s2id_riskLevel":"2","s2id_riskLevelName":"稳健型","scoreStart":"11","scoreEnd":"30","score":"11-30","investGrade1":"B", "investTotal":"300000.00",
      "remarks":""
    },
    {
      "id":"3","s2id_riskLevel":"3","s2id_riskLevelName":"积极型","scoreStart":"31","scoreEnd":"100","score":"31-100","investGrade1":"A", "investTotal":"10000000.00",
      "remarks":""
    }
  ];  //假数据
  constructor(private _httpInterceptorService: HttpInterceptorService) {}
  // 1 获取数据列表
  getLists():  Promise<any> {
    /*const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.riskRatingUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
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
    /*const url = `${this.riskRatingUrl}/${id}?access_token=${this.accessToken}`;
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

  // 3 添加一
  postOne(params):  Promise<any> {
    /*const url = `${this.riskRatingUrl}?access_token=${this.accessToken}`;
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

  // 4 修改一
  putOne(params):  Promise<any> {
    /*const url = `${this.riskRatingUrl}?access_token=${this.accessToken}`;
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

  // 5 删除一
  deleteOne(id):  Promise<any> {
    /*const url = `${this.riskRatingUrl}/${id}?access_token=${this.accessToken}`;
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
