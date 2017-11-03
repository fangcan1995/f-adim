import {Injectable} from "@angular/core";
import {BaseService} from "../../base.service";
import {Observable} from "rxjs/Observable";
import {getStorage} from "../../../theme/libs/utils"

import * as _ from 'lodash';

@Injectable()
export class AnnouncementService extends BaseService<any>{

  apiUrl = 'http://172.16.4.62:8070/announcements';
  accessToken = getStorage({ key: 'token' }).access_token;

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
    const url = `${this.apiUrl}`;
    return this.getAll(url);
  }

  // 删除一条数据
  deleteOne (id): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.delete(url);
  }

  // 获取一条数据
  getOne (id): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.getById(url);
  }

  // 添加一条数据
 /* postOne(params): Promise<any> {
    const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.create(url,params);
  }*/

  // 修改一条数据，提供所有字段
  putOne(params): Promise<any> {
    const url = `${this.apiUrl}?access_token=${this.accessToken}`;
    return this.update(url, params);
  }



}
