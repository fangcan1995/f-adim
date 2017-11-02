import {Injectable} from "@angular/core";
import {BaseService} from "../../base.service";
import {Observable} from "rxjs/Observable";

import * as _ from 'lodash';

@Injectable()
export class AnnouncementService extends BaseService<any>{

  apiUrl = '';
  accessToken = '';

  mockData = [
    {
      'id': '1',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '2',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '3',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '4',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '5',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '6',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },
    {
      'id': '7',
      'announcementName': 'xxxx',
      'announcementTitle':'xxxxx',
      'effectDate': '2017/10/27',
      'lastEditDate': '2017-10-27 11:11:11',
      'lastEditPerson': 'llxxs',
      'status': '1'
    },

  ];

  // 获取数据列表
  getList(params?): Promise<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}`, params);
    /*let res = {
      code: 0,
      msg: '',
      data: this.mockData,
      extras: {}
    };
    return Observable.of(res)*/
    return new Promise( resolve => {
      resolve ({
        "code": "0",
        "message": "SUCCESS",
        'data':{
          "pageNum": 1,
          "pageSize": 10,
          "total": 13,
          "list":this.mockData,
        }
      });
    });
  }

  // 删除一条数据
  deleteOne (id): Promise<any> {
    /*const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.delete(url,params);*/
    let data = _.remove(this.mockData, x => x.id === id);
    return new Promise((resolve, reject) => {
      resolve({
        "code": "0",
        "message": "SUCCESS",
      });
    });
  }

  // 获取一条数据
  /*getOne(id): Observable<any> {
    // return this._httpInterceptorService.request('GET', `${baseUrl}/${apis['MEMBERS']}/${id}`);
    let data = _.find(this.mockData, x => x.id === id);
    console.log(data);
    let res = {
      code: 0,
      msg: '',
      data,
      extras: {}
    };
    return Observable.of(res);
  }*/

  getOne (id): Promise<any> {
    /*const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.getById(url,params);*/
    return  new Promise ( (resolve) => {
      resolve({
        "code":"0",
        "message":"SUCCESS",
        "data": _.find(this.mockData, x => x.id === id)
      });
    })
  }

  // 添加一条数据
  /*postOne(params): Observable<any> {
    // return this._httpInterceptorService.request('POST', `${baseUrl}/${apis['MEMBERS']}`, params)
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params);
    let res = {
      code: 0,
      msg: '',
      data: params,
      extras: {}
    };
    return Observable.of(res);
  }*/

  postOne(params): Promise<any> {
    /*const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.create(url,params);*/
    let id = _.reduce(this.mockData, (max, n) => Number(n.id) > max ? Number(n.id) : max, 0) + 1;
    params.id = id;
    this.mockData.push(params);
    return new Promise ( (resolve) => {
      resolve ({
        "code": "0",
        "message": "SUCCESS",
        "data": this.mockData
      })
    })
  }

  // 修改一条数据，提供所有字段
  putOne(params): Promise<any> {
    /*const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.update(url,params);*/
    let index = _.findIndex(this.mockData, x => x.id === params.id);
    this.mockData[index] = params.data;
    return new Promise((resolve, reject) => {
      resolve({
        "code": "0",
        "message": "SUCCESS"
      });
    });
  }



}
