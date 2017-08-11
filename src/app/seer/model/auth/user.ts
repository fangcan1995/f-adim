import {BaseEntity} from "../BaseEntity";
export class User extends BaseEntity{
  userId?:string;
  account:string;
  userName:string;
  password:string;
  staffId:string;
  staffName?:string;
  roles:string[];
  accountState:string;
  loginIp?:string;
  loginTime?:string;
}
