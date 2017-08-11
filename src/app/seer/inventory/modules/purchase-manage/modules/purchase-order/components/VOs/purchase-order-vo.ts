import {PurchaseOrder} from "../../../../../../../model/inventory/purchase-order";
import {PurchaseGoods} from "../../../../../../../model/inventory/purchase-good";
export class PurchaseOrderVO{
  purchaseOrder:PurchaseOrder = new PurchaseOrder();
  goods:PurchaseGoods[] = [];
  censorId:string;
  taskId:string;
}
