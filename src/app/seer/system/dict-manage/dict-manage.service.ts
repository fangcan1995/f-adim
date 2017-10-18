import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SERVER } from "../../const";
import {DictModel} from "./DictModel";
import {BaseService} from "../../base.service";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {Result} from "../../model/result.class";

@Injectable()
export class DictManageService extends BaseService<DictModel>{
  private apiUrl = 'http://172.16.7.4:8090/dicts';  // URL to web api

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getDicts(pageInfo:any): Promise<any> {
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.apiUrl}/${page}${sort}${query}`;
    return this.getAll(url);
  }

  postOne(dict: DictModel): Promise<any> {
    console.log(dict);
    const url = `${this.apiUrl}/`;
    return this.create(url,dict);
  }

  getOne(dictId: string): Promise<any> {
    const url = `${this.apiUrl}/${dictId}`;
    return this.getById(url);
  }

  putOne(dict: DictModel): Promise<any> {
    const url = `${this.apiUrl}/`;
    return this.update(url,dict);
  }

  deleteDict(dictId: string): Promise<any> {
    const url = `${this.apiUrl}/${dictId}`;
    return this.delete(url);
  }

  searchDicts(param:any): Promise<any> {
    const url = `${this.apiUrl}/`;
    return this.search(url,param);
  }

}
