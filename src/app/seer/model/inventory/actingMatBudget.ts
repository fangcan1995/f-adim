import {BaseEntity} from "../BaseEntity";
/**
 * Created by Administrator on 2017/2/21.
 */
export class ActingMatBudget extends BaseEntity {
  id?:string;
  budgetName:string;
  budgetSubject:string = "";
  budgetAmount:string = "";
  budgetBalance:string;
  actingMatId:number;
  customerStoreId:number;
  startTime:string;
  endTime:string;

  budgetSubjectName:string;

  reconciliationOrderList:string[] = [];
  reconciliationContractList:string[] = [];
  reconciliationCostList:string[] = [];
}
