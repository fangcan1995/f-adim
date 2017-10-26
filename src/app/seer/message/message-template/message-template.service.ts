import {Injectable} from '@angular/core';
import {SERVER} from "../../const";
import {BaseService} from "../../base.service";
import {Result} from "../../model/result.class";
import {Template} from "../../model/auth/message-template";
import {parseQueryString, getStorage} from "../../../theme/libs/utils"
@Injectable()
export class messageTplManageService extends BaseService<any>{
  accessToken = getStorage({ key: 'token' }).access_token;
  templateManageUrl=`http://172.16.1.234:8080/templates`;  // URL to web api
  getTpls(pageInfo:any): Promise<Result>{
    const page=`&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}`;
    const sort=`&sortBy=${pageInfo.sort}`;
    const jsonQueryObj = pageInfo.query;
    let query:string="";
    for (var prop in jsonQueryObj) {
      if(jsonQueryObj[prop]){
        query+=`&${prop}=${jsonQueryObj[prop]}`;
      }
    }
    const url = `${this.templateManageUrl}?access_token=${this.accessToken}${page}${sort}${query}`;
    console.log(url);
    return this.getAll(url);

  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}?access_token=${this.accessToken}`;
    return this.getById(url);
  }
  /*新增*/
  createTemplate(template:Template): Promise<Result> {
    const url = `${this.templateManageUrl}?access_token=${this.accessToken}`;
    return this.create(url,template);
  }
  /*修改*/
  updateTemplate(template:Template): Promise<Result> {
    const url = `${this.templateManageUrl}?access_token=${this.accessToken}`;

    return this.update(url,template);
  }
  /*删除*/
  deleteTemplate(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}?access_token=${this.accessToken}`;
    return this.delete(url);
  }
}
