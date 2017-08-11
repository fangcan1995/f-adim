import {BaseEntity} from "../BaseEntity";
import {SaleGoods} from "./saleGoods";
import {Data} from "@angular/router";
/**
 * Created by Administrator on 2017/1/13.
 */
export class SaleOrder extends BaseEntity{
  id?:string;
  associatedNum?:string;
  soNum:string;
  storeOrderNum:string;
  customerStoreId:string = "";
  soCategory:string = "";
  receiptMethod:string = "";
  paymentDate;
  shippingMethod:string = "";
  deliveryEndDate;
  partner:string;
  soType:string;
  curType:string = "";
  invoiceReceipt:string = "";
  staffId:string;
  soSource:string;
  soState:string;
  soTotalAmount:string;
  soTotalWeight:number;
  soTotalVolume:number;
  soStorekeeperId:string
  acceptDate:string;
  acceptState:string;
  soRemark:string;
  deliveryAddress:string;
  invSaleGoodsList:SaleGoods[];
  giftGoodsList:SaleGoods[];
  materialGoodsList:SaleGoods[];

  customerId?:string = "";
  storeName?:string;
  staffName?:string;

  soTypeName:string;

  dictValueName:string;
}
