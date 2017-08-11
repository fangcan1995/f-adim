/**
 * Created by Administrator on 2016/12/27.
 */
import {BaseEntity} from "../BaseEntity";
export class Supplier extends BaseEntity{
  id?:string;
  supplierName?:string;
  supplierNature?:string = '';
  supplierAddress?:string;
  supplierDcAddress?:string;
  supplierCode?:string;
  supplierTaxCode?:string;
  supplierBank?:string = '';
  supplierBankAccount?:string;
  supplierBankAdress?:string;
  supplierMail?:string;
  supplierWebsite?:string;
  supplierTel?:string;
  supplierState?:string = '';
}
