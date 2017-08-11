import {BaseEntity} from "../../../../../model/BaseEntity";
export class TemplateVO extends BaseEntity{

  id:string;

  templateName:string;

  templateType:string;

  templateContent:string;

  templateState:string;

}
