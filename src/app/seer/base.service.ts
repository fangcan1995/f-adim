import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { SERVER, CACHE_DURATION, REQUEST_TIMEOUT } from "./const";
import { Result } from "./model/result.class";
import * as _ from 'lodash';
/**
 *
 * @param dicts
 * @param map<keyId,field> 用于字段名和字典keyId不同的情况，keyId是大写+下划线
 */
const castDict2Translate = (dicts: any[] = [], map: Map<string, string>) => {
  let translate = {};
  map.forEach((dictKeyId,field)=>{
    for(let i = 0;i<dicts.length;i++){
      let dict = dicts[i];
      if(dict.dictKeyId==dictKeyId){
        if(!translate[field])
          translate[field]=[];
        translate[field].push(dict);
      }
    }
  });
  return translate;
};

@Injectable()
export class BaseService<T> {

  private headers = new Headers({'Content-Type': 'application/json'});

  private headersmul = new Headers({'Content-Type': 'multipart/form-data'});

  /*字典URL*/
  private dictManageUrl = SERVER + '/sys/dict';


  private excelExport = SERVER + '/sys/excel/download';

  private excelExporttemplate = SERVER + '/sys/excel/downloadbytpm';

  private excelImport =  SERVER + '/sys/excel/importExcel';

  constructor(protected http?: Http) {}

  private static handleError(error: any): Promise<any> {
    console.error('error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
   * JSON 转换 URL
   * 说明：
   * 需要转换的JSON 数据 {"brandId" : "1" , "brandName" : "nihao"}
   * 转换后返回  ：brandId=1&brandName=nihao
   * @param param  是JSON
   * @returns {url}
   */
  private static parseJson2URL = function (param) {

    let paramStr = '';
    let mappingOperator = '=';
    let separator = '&';

    for (let key in param) {
      let value = param[key];
      if (value != "") {
        if (typeof (value) == 'string' || value instanceof Number || typeof (value) == 'number' || value instanceof Boolean || typeof (value) == 'boolean') {
          paramStr += key + mappingOperator + value + separator;
        } else if (typeof (value) == 'object') {
          paramStr += key + mappingOperator + value.toString() + separator;
        }
      }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
  };


  getAll(url: string): Promise<any> {
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }

  search(url: string, params: any): Promise<any> {
    return this.http.get(url + '?' + BaseService.parseJson2URL(params), {withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }
// put() 方法来把修改持久化到服务端
  update(url: string, data: T): Promise<any> {
    return this.http
      .put(url, data, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }
// 刷新浏览器，并创建一些新的
  create(url: string, data: T): Promise<any> {
    return this.http
      .post(url, data, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }

  getById(url: string): Promise<any> {
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => response.json() as T[])
      .catch(BaseService.handleError);
  }
// 刷新浏览器，从服务器上移除
  delete(url: string): Promise<any> {
    return this.http.delete(url, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }

  batchDelete(url: string, ids: string[]): Promise<any> {
    return this.http.put(url, ids, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res.json())
      .catch(BaseService.handleError);
  }


  //导出Excel
  exportExcel(data: T): Promise<any> {
    return this.http
      .post(this.excelExport, data, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res)
      .catch(BaseService.handleError);
  }

  //导出ExcelByTemplate
  exportExcelByTemplate(data: T): Promise<any> {
    return this.http
      .post(this.excelExporttemplate, data, {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(res => res)
      .catch(BaseService.handleError);
  }

  //导出ExcelByTemplate
  importExcelByTemplate(fd): Promise<any> {
    //let headersmul = new Headers({ 'Content-Type': 'multipart/form-data' });
    return this.http
      .post(this.excelImport, fd, {headers: this.headersmul ,withCredentials: true})
      .toPromise()
      .then(res => res)
      .catch(BaseService.handleError);
  }

  /**
   * 字典表数据查询
   * 说明：
   * @param dictKeyId
   */
  getDictByKey(dictKeyId: string): Promise<any> {
    console.log('goes here');
    const sessionStorageKey = 'request dict key = ';
    let dict = sessionStorage.getItem(dictKeyId);
    //如果已经有缓存，则直接使用
    if (dict) {
      return new Promise((resolve, reject) => {
        resolve({success: true, data: JSON.parse(dict)});
      });
    }
    //如果已经发送了网络请求，则等待
    if (sessionStorage.getItem(sessionStorageKey + dictKeyId)) {
      return new Promise((resolve, reject) => {
        let func = function (isDone) {
          if (isDone) {
            resolve({success: true, data: JSON.parse(sessionStorage.getItem(dictKeyId))});
          } else {
            //每10毫秒判断一次
            setTimeout(() => func(!sessionStorage.getItem(sessionStorageKey + dictKeyId)), 10);
          }
        };
        //当key不存在了，证明请求已经返回，所以加个！
        func(!sessionStorage.getItem(sessionStorageKey + dictKeyId));
      });
    }
    //记录已经发送了网络请求
    sessionStorage.setItem(sessionStorageKey + dictKeyId, dictKeyId);
    let url = `${this.dictManageUrl}/key/${dictKeyId}`;
    //开始网络请求
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(res => {
        sessionStorage.setItem(dictKeyId, JSON.stringify(res.json().data));
        sessionStorage.removeItem(sessionStorageKey + dictKeyId);
        // 缓存一分钟
        setTimeout(() => {
          sessionStorage.removeItem(dictKeyId)
        }, CACHE_DURATION);
        return res.json();
      })
      .catch(BaseService.handleError);
  }

  getDictTranslate(translateFields: {field: string | number,dictKeyId?: string}[] = []):Promise<Result> {
    //生成一个map，记录了字典keyId和字段名，用于替换名字不一样的情况
    let map = new Map();
    _.each(translateFields, field => {
      map.set(field.field, field.dictKeyId ? field.dictKeyId : field.field.toString().replace(/([A-Z]+)/g, (all, letter)=>'_'+letter).toUpperCase());
    });
    console.log(map)
    const cachedDicts = 'cached dicts';
    const dictsCacheTime = 'when dicts cached';
    const alreadyRequest = 'requested waiting for response';
    
    //如果已经有缓存且缓存未超时，则直接使用
    const localDictsCacheTime = sessionStorage.getItem(dictsCacheTime);
    const nowTime = new Date().getTime();
    const dict = sessionStorage.getItem(cachedDicts);
    console.log(dict)
    if ( dict && ( nowTime - +( localDictsCacheTime ? localDictsCacheTime : 0 ) ) < CACHE_DURATION ) {
      return new Promise((resolve, reject) => {
        resolve({success: true, data:castDict2Translate(JSON.parse(dict), map),from:'cache'});
      });
    }

    //如果没有缓存，并且没发送过网络请求,或者网络请求超时，则请求一个
    if (!sessionStorage.getItem(alreadyRequest) || (new Date().getTime() - +sessionStorage.getItem(alreadyRequest))>=REQUEST_TIMEOUT) {
      //记录已经发送了网络请求
      sessionStorage.setItem(alreadyRequest, new Date().getTime()+'');
      let url = `${this.dictManageUrl}`;
      //开始网络请求
      this.http.get(url, {withCredentials: true})
        .toPromise()
        .then(res => {
          sessionStorage.setItem(cachedDicts, JSON.stringify(res.json().data));
          sessionStorage.setItem(dictsCacheTime, new Date().getTime()+'');
          sessionStorage.removeItem(alreadyRequest);
          // 缓存
          setTimeout(() => {
            sessionStorage.removeItem(cachedDicts)
          }, CACHE_DURATION);
        })
        .catch(BaseService.handleError);
    }

    //返回一个promise
    return new Promise((resolve, reject) => {
      let func = function (isDone) {
        if (isDone) {
          resolve({success: true, data: castDict2Translate(JSON.parse(sessionStorage.getItem(cachedDicts)), map)});
        } else {
          //每10毫秒判断一次
          setTimeout(() => func(!sessionStorage.getItem(alreadyRequest)), 10);
        }
      };
      //当key不存在了，证明请求已经返回，所以加个！
      func(!sessionStorage.getItem(alreadyRequest));
    });
  }


  /**
   * {
  contractType: [
    {dictValueId: '00', dictValueName: '供应商'}, {dictValueId: '01', dictValueName: '客户'},
    ],
  rebateNation: [{dictValueId:'00',dictValueName:'目标返利'},{dictValueId:'01',dictValueName:'服务返利'}],
  rebateType: [
    {dictValueId:'00',dictValueName:'年度进货返利'},
    {dictValueId:'01',dictValueName:'季度进货返利'},
    {dictValueId:'02',dictValueName:'年度评分返利'},
    {dictValueId:'03',dictValueName:'季度评分返利'}],
  rebateMode: [{dictValueId:'00',dictValueName:'额定'},{dictValueId:'01',dictValueName:'利率'}]
};
   */

  /**
   * 获取当前用户信息
   * 说明：
   */
  getCurrentUser(): any {
    let data = localStorage.getItem("data");
    return JSON.parse(data).currentUser;
  }

  censorOrder(censorDTO:any):Promise<Result>{
    const url = `${SERVER}/workflow/censorship/order`;
    return this.create(url,censorDTO);
  }

  confirmOrder(censorDTO:any):Promise<Result>{
    const url = `${SERVER}/workflow/censorship/order`;
    return this.update(url,censorDTO);
  }

  getOrderCensorHistory(orderId):Promise<Result>{
    const url = `${SERVER}/workflow/basic/history/${orderId}`;
    return this.getAll(url);
  }

  getOrderCensorConfig(processKey):Promise<Result>{
    const url = `${SERVER}/workflow/basic/process/config/${processKey}`;
    return this.getAll(url);
  }
}
