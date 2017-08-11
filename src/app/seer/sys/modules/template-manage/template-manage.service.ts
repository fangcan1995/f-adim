import {Injectable} from '@angular/core';
import {SERVER} from "../../../const";
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {RoleWithSysUserIdsVO} from "../role-manage/components/role-edit/RoleWithSysUserIdsVO";
import {TemplateVO} from "./components/edit-template/TemplateVO";

@Injectable()
export class TemplateManageService extends BaseService<any>{

  private templateManageUrl = SERVER+'/sys/template';  // URL to web api


  getTemplates(): Promise<Result> {
    return this.getAll(this.templateManageUrl);
  }

  getTemplateByType(templateType: string): Promise<Result> {
    const url = `${this.templateManageUrl}/type/${templateType}`;
    return this.getAll(url);
  }

  getTemplateById(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}`;
    return this.getAll(url);
  }

  updateTemplate(templateVO: TemplateVO): Promise<Result> {
    const url = `${this.templateManageUrl}/`;
    return this.update(url,templateVO);
  }

  createTemplate(templateVO: TemplateVO): Promise<Result> {
    const url = `${this.templateManageUrl}/`;
    return this.create(url, templateVO);
  }

  deleteTemplate(id: string): Promise<Result> {
    const url = `${this.templateManageUrl}/${id}`;
    return this.delete(url);
  }

}
