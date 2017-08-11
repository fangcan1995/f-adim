import {BaseEntity} from "../BaseEntity";
/**
 * Created by Administrator on 2017/1/13.
 */
export class ReconciliationOrder extends BaseEntity{
  id?:string;
  reconciliationId:string;
  orderId:string;
}
