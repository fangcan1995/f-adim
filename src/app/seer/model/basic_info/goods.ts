import {BaseEntity} from "../BaseEntity";
import {Terminal} from "./terminal";
/**
 * Created by Administrator on 2017/1/4.
 */
export class Goods extends BaseEntity{
  id?:string;
  goodsName:string;
  brandId:string = "";
  goodsType:string = "";
  goodsSeries:string = "";
  goodsNumber:string;
  goodsBarCode?:string;
  goods2dCode?:string;
  goodsUnits:string = "个";
  boxRule:string;
  goodsVolume:number;
  goodsLength:number;
  goodsWidth:number;
  goodsHeight:number;
  goodsPacking:string;
  goodsCtnSize:string = "";
  goodsWeight:number;
  goodsPhoto:string;
  goodsPrice:string;
  goodsRetailPrice:string;
  storeInfo:Terminal[];
  extendField:string[];
  goodsState:string;
  brandName:string;
  supplierName:string;
  file:string;

  isGift:string = "";
  isMaterial:string = "";
  goodsNum:number;
}
