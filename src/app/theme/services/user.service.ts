import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { getStorage, setStorage } from '../libs/utils';
import {
  HttpInterceptorService,
} from './http-interceptor.service';
import {
  BASE_URL,
  API,
  BaseService,
} from './base.service';
@Injectable()
export class UserService extends BaseService<any> {
  public getDataFromServer() {
    return Observable.forkJoin(
      Observable.fromPromise(this.getResourcesFromServer({pageSize: 10000})),
      Observable.fromPromise(this.getResourcesFromServer({pageSize: 10000}))
      )
    .do(res => {
      let user = {
        name: '史蒂乎',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508330624292&di=7201e12fd0f3232cdd6b8e12c279ad3e&imgtype=0&src=http%3A%2F%2Fwww.castavision.com%2FMinecraftDiamonSteveFigure1c.jpg'
      };
      let resources = res[1].data ? res[1].data.list || [] : [];
      let dicts = null;
      setStorage({
        key: 'user',
        value: user,
      })
      setStorage({
        key: 'resources',
        value: resources,
      })
      setStorage({
        key: 'dicts',
        value: dicts,
      })
    })

  }

}