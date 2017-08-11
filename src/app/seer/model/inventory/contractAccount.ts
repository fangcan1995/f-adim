import {BaseEntity} from "../BaseEntity";
/**
 * Created by Administrator on 2017/1/13.
 */
export class ContractAccount extends BaseEntity{
  id?:string;
  reconciliationNum:string;
  customerStoreId:string = "";
  brandId:string = "";
  reconcicliationType:string;
  reconcicliationAmount:number;
  orderAmount:number;
  costAmount;
  contractRebate:number;
  startTime:string;
  endTime:string;

  reconciliationOrderList:string[] = [];
  reconciliationContractList:string[] = [];
  reconciliationCostList:string[] = [];
  brandName:string;
}
