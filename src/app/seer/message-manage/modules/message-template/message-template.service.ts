import {Injectable} from '@angular/core';
import {SERVER} from "../../../const";
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {Template} from "../../../model/auth/message-template";

@Injectable()
export class messageTplManageService extends BaseService<any>{
  private templateManageUrl = SERVER+'/sys/role';  // 接口，请修改

  /*返回列表*/
  getTpls(){
    return this.getAll(this.templateManageUrl);
  }
  /*根据id返回一条数据*/
  getTemplateById(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}`;
    return this.getAll(url);
  }
  /*新增*/
  createTemplate(template:Template): Promise<Result> {
    const url = `${this.templateManageUrl}/`;
    return this.create(url,template);
  }
  /*修改*/
  updateTemplate(template:Template): Promise<Result> {
    const url = `${this.templateManageUrl}/`;
    return this.update(url,template);
  }
  /*删除*/
  deleteTemplate(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}`;
    return this.delete(url);
  }
}
