import {Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import * as _ from "lodash";
import { getStorage} from "../../../theme/libs/utils"
@Injectable()
export class AdvertisingService extends BaseService<any>{
  accessToken = getStorage({ key: 'token' }).access_token;
  private advertisingManageUrl = '/riskEvals';  // 接口，请修改
  temp_date=[
    {"id":"1","title":"aaa","adType":"banner","putEnv":"PC端","imgLink":"<img src='https://www.baba88.com/admin/userfiles/1/images/loan/logo/2017/06/1498821994576.gif' width='120' height='40'>","url":"<a href='https://www.baba88.com'>https://www.baba88.com</a>","createTime":"1509329471000","state":1},
    {"id":"2","title":"bbb","adType":"分享邀请","putEnv":"移动端","url":"","state":1},
    {"id":"3","title":"bbb","adType":"平台实力","putEnv":"全平台","url":"","state":0},
  ];


  // 1 获取数据列表
  getList(params?):Promise<any> {
    /*const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.advertisingManageUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
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
            "list":this.temp_date,
          }
        }
      )
    });
  }

  //2 获取一条数据
  getOne(id):Promise<any> {
    /*const url = `${this.advertisingManageUrl}/${id}?access_token=${this.accessToken}`;
  console.log(url);
  return this.getById(url);*/
    return new Promise((resolve, reject) => {
      resolve(
        {
          "code": "0",
          "message": "SUCCESS",
          'data':_.find(this.temp_date, x => x.id === id)
        }
      )
    });
  }

  // 3添加一条数据
  postOne(params):Promise<any> {
    /*const url = `${this.advertisingManageUrl}?access_token=${this.accessToken}`;
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

  // 4 修改一条数据，提供所有字段
  putOne(id, params):Promise<any> {
    /*const url = `${this.advertisingManageUrl}?access_token=${this.accessToken}`;
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
  deleteOne(id):Promise<any> {
    /*const url = `${this.advertisingManageUrl}?access_token=${this.accessToken}${id}`;
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
