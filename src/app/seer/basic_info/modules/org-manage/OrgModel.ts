
import {BaseEntity} from "../../../model/BaseEntity";
export class OrgModel extends BaseEntity{

  id?:string;
  orgParentId:string;
  orgName:string;
  orgSort:string;
  orgDescription:string;

}
