import {BaseEntity} from "../BaseEntity";
/**
 * Created by Administrator on 2017/2/17.
 */
export class Contract extends BaseEntity {
  id?:string;
  contractBrand:string;
  contractNumber:string = "";
  contractName:string = "";
  firstParty:string = "";
  secondParty:string;
  startDate?:string;
  endDate?:string;
  signDate:string;
  signPerson:string;
  contractDescribe:string;
  contractState:string;
  contractType:string;

  contractTypeName:string;
}
