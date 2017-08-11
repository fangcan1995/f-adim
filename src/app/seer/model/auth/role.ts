import {BaseEntity} from "../BaseEntity";
export class Role extends BaseEntity{
  roleId:string;
  roleName:string;
  roleResources:string[];
  validState:string;
}
