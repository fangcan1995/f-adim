import {BaseEntity} from "../../model/BaseEntity";
export class infoModle extends BaseEntity{

  id?:string;
  orgParentId:string;
  orgName:string;
  orgSort:string;
  orgDescription:string;

}