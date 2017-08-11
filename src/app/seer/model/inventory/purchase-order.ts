
import {BaseEntity} from "../BaseEntity";
export class PurchaseOrder extends BaseEntity{
  id: string = '';
  associatedNum: string = '';
  poNum: string = '';
  supplierId: string = '';
  supplierName: string = '';
  poCategory: string = '';
  poType: string = '';
  poDate: string = '';
  curType: string = '';
  paymentMethod: string = '';
  invoiceReceipt: string = '';
  staffId: string = '';
  staffName: string = '';
  poSource: string = '';
  poState: string = '';
  poTotalAmount: string = '';
  poRemark: string = '';
  poTotalWeight: string = '';
  poTotalVolume: string = '';
  poStoreKeeperId: string = '';
  poStoreKeeperName: string = '';

  invoiceReceiptName: string='';
  totalQuantity: string = '';

  dictValueName:string;

}
