import {Injectable} from "@angular/core";
import {BaseService} from "../base.service";
import {SERVER} from "../const";
import {Result} from "../model/result.class";
@Injectable()
export class WorkspaceService extends BaseService<any> {

  getTasks() {
    /*let sessionData = localStorage.getItem('data');
    if (sessionData) {
      let currentUser = JSON.parse(sessionData)['currentUser'];
      if (currentUser && currentUser.staffId) {
        const url = `${SERVER}/workflow/basic/task/assignee/${currentUser.staffId}`
        return this.getAll(url);
      }
    }*/
    return new Promise(() => {});
  }

  getOrderCensorHistory(orderId):Promise<Result>{
    const url = `${SERVER}/workflow/basic/history/`+orderId;
    return this.getAll(url);
  }
}
