import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
  TEST_URL
} from "../../../theme/services";
import {SERVER} from "../../const";
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { User } from "../../model/auth/user";
import {Result} from "../../model/result.class";
import * as _ from 'lodash';
import { getStorage } from '../../../theme/libs';
@Injectable()
export class InfoPublishService extends BaseService<any>{

    public uploader: FileUploader;
    private progress: number = 0;
    
  constructor(
    protected _httpInterceptorService:HttpInterceptorService
  ) {
    super(_httpInterceptorService);
    this.setApi(API['AFFICHE']);
  }

    private handleError(error: any): Promise<any> {
        console.error('出错啦', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    apiTypeUrl = 'http://172.16.1.221:9080/affiche/type';
    apiInfoUrl = 'http://172.16.1.221:9080/affiche/info';
    typeToInfo = 'http://172.16.1.221:9080/affiche/typetoinfo';

    //access_token = getStorage({ key: 'token'}).access_token;
    access_token = '2c7cf0eb-0003-40c3-a6e7-b5d22a7492c5';
    /* ---------------------------------------------------- */
    /* 此处为左侧树结构（栏目）模块的方法 */
    /* ---------------------------------------------------- */

    /*
     * 查询全部栏目树
     * */
    getAllColumnTree(): Promise<ResModel> {
        return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['AFFICHE']}/type`, {}).toPromise();
      }




    /* 添加栏目     params: {}  */
    addColumn (params): Promise<ResModel> {
      return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['AFFICHE']}/type`, params).toPromise();
    }

    /* 通过栏目id删除栏目   params: id */
    deleteColumn (id): Promise<ResModel> {
      return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['AFFICHE']}/type/${id}`).toPromise();
    }

    /* 通过栏目id修改栏目   params: {} */
    editColumn (params):Promise<ResModel> {
      return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['AFFICHE']}/type`, params).toPromise();
    }




  /* ---------------------------------------------------- */
  /* 此处为左侧树结构模块的方法 */
  /* ---------------------------------------------------- */

  /*根据栏目id获取新闻*/
  getColumnListById(col_Id): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['AFFICHE']}/info/${col_Id}`, {}).toPromise();
  }

  /* 点击新增按钮，添加一条新的数据  params: {}*/
  addNewArticle (params): Promise<ResModel> {
    let fileId = params.fileId;
    return this._httpInterceptorService.request('POST', `${BASE_URL}/${API['AFFICHE']}/info`, params).toPromise();
  }

  /* 点击删除按钮，根据文章id 删除文章  params: id */
  deleteArticle (id): Promise<ResModel> {
    return this._httpInterceptorService.request('DELETE', `${BASE_URL}/${API['AFFICHE']}/info/${id}`).toPromise();
  }

  /* 点击 params: {} */
  editArticle (params): Promise<ResModel> {
    return this._httpInterceptorService.request('PUT', `${BASE_URL}/${API['AFFICHE']}/info`, params).toPromise();
  }

  /* 点击修改按钮，查询对应id的文章 */
  getArticle (id): Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['AFFICHE']}/info/${id}`, {}).toPromise();
  }

  /* 点击修改状态按钮，更改对应id文章的状态 */
  patch (params): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${BASE_URL}/${API['AFFICHE']}/info`, params).toPromise();
  }



  /*  通过栏目id查询栏目，以及栏目下属的文章信息
     *    params: {}
     **/
  getColumnList (params): Promise<ResModel> {
    console.log(params);
    return this._httpInterceptorService.request('GET', `${BASE_URL}/${API['AFFICHE']}/typetoinfo`, params).toPromise();
  }



}
