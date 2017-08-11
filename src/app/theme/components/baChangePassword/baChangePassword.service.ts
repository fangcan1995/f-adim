import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
/*import Any = jasmine.Any;*/
import {SERVER} from "../../../seer/const";
import {BaseService} from "../../../seer/base.service";
import {Result} from "../../../seer/model/result.class";



@Injectable()
export class baChangePasswordService {

  private storageManageUrl = SERVER + '/basicinfo';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<any>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  /*
   * 修改库房
   * */
  editStorage(storage: Storage): Promise<Result> {
    let url = `${this.storageManageUrl}/storage`;
    return this.baseService.update(url,storage);
  }


}


