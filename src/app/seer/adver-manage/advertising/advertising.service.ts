import {Injectable} from "@angular/core";
import {BaseService,HttpInterceptorService,API,BASE_URL,ResModel} from "../../../theme/services"
import {getStorage} from "../../../theme/libs/utils"
@Injectable()
export class AdvertisingService extends BaseService<ResModel>{
  accessToken = getStorage({ key: 'token' }).access_token;
  private advertisingManageUrl = 'http://172.16.1.221:8070/advertising';  // 接口，请修改
  temp_date=[
    {"id":"1","title":"aaa","adType":"banner","putEnv":"PC端","imgLink":"<img src='https://www.baba88.com/admin/userfiles/1/images/loan/logo/2017/06/1498821994576.gif' width='120' height='40'>","url":"<a href='https://www.baba88.com'>https://www.baba88.com</a>","createTime":"1509329471000","state":1},
    {"id":"2","title":"bbb","adType":"分享邀请","putEnv":"移动端","url":"","state":1},
    {"id":"3","title":"bbb","adType":"平台实力","putEnv":"全平台","url":"","state":0},
  ];


  // 1 获取数据列表
  getList(pageInfo):Promise<ResModel> {

    console.log(this.accessToken);
    const page=`?pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    return this._httpInterceptorService.request('GET', `${this.advertisingManageUrl}${page}${sort}${query}`,{}, true).toPromise();
  }

  //2 获取一条数据
  getOne(id):Promise<ResModel> {
    return this._httpInterceptorService.request('GET', `${this.advertisingManageUrl}/${id}`,{}, true).toPromise();
  }
  // 3添加一条数据
  postOne(params):Promise<ResModel> {
    return this._httpInterceptorService.request('POST', `${this.advertisingManageUrl}`, params).toPromise();
  }

  // 4 修改一条数据，提供所有字段
  putOne(id, params):Promise<any> {
    return this._httpInterceptorService.request('PUT', `${this.advertisingManageUrl}`, params).toPromise();
  }
// 5 删除一条数据
  deleteOne(id):Promise<any> {
    return this._httpInterceptorService.request('DELETE', `${this.advertisingManageUrl}/${id}`).toPromise();
  }
  //6 修改状态
  patchOne(id, params): Promise<ResModel> {
    return this._httpInterceptorService.request('PATCH', `${this.advertisingManageUrl}`, params).toPromise();
  }
}
