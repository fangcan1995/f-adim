import {Injectable} from "@angular/core";
import {BaseService} from "../base.service";
import {SERVER} from "../const";
import {Result} from "../model/result.class";
@Injectable()
export class WorkspaceService extends BaseService<any> {
  private apiUrl=``;

  getTasks(pageInfo?:any) {
    /*let sessionData = localStorage.getItem('data');
    if (sessionData) {
      let currentUser = JSON.parse(sessionData)['currentUser'];
      if (currentUser && currentUser.staffId) {
        const url = `${SERVER}/workflow/basic/task/assignee/${currentUser.staffId}`
        return this.getAll(url);
      }
    }
    return new Promise(() => {});*/

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

  getOrderCensorHistory(orderId):Promise<Result>{
    const url = `${SERVER}/workflow/basic/history/`+orderId;
    return this.getAll(url);
  }
}
