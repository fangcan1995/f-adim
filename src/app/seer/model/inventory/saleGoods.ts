import {BaseEntity} from "../BaseEntity";
/**
 * Created by Administrator on 2017/1/16.
 */
export class SaleGoods extends BaseEntity{
  id:string;
  saleOrderId:string;
  goodsId:string;
  goodsPrice:number;
  saleQuantity:number;
  saleUnitPrice:number;
  saleDiscount:number;
  saleTotalAmount:number;
  contractTotalAmount:number;

  isGift:string;
  isMaterial:string;
  goodsNum:number;
}
