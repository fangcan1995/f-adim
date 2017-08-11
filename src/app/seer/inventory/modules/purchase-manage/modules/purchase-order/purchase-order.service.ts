import {Injectable} from "@angular/core";
import {BaseService} from "../../../../../base.service";
import {SERVER} from "../../../../../const";
import {Result} from "../../../../../model/result.class";
import {PurchaseOrderVO} from "./components/VOs/purchase-order-vo";
import {OrderCensorDTO} from "../../../../../model/workflow/order-censor-dto";
import {BaseTaskDTO} from "../../../../../model/workflow/base-task-dto";
@Injectable()
export class PurchaseOrderService extends BaseService<any>{
  private baseUrl = `${SERVER}/inventory/purchase-order`;
  private findGoodsBySupplierIdUrl = `${SERVER}/basicInfo/goods/supplier/`;

  getPurchaseOrders(term?):Promise<Result>{
    const url = `${this.baseUrl}`;
    if(term){
      return this.search(url,term);
    }
    return this.getAll(url);
  }

  getPurchaseOrderById(id:string):Promise<Result>{
    const url = `${this.baseUrl}/${id}`;
    return this.getAll(url);
  }

  getGoodsBySupplierId(id:string):Promise<Result>{
    const url = `${this.findGoodsBySupplierIdUrl}${id}`;
    return this.getAll(url);
  }

  getGoodsByPOId(id:string):Promise<Result>{
    const url = `${this.baseUrl}/purchaseOrderGood/${id}`;
    return this.getAll(url);
  }

  getStaffsWithOrgs():Promise<Result>{
    const url = `${SERVER}/sys/role/staffsWithOrg`;
    return this.getAll(url);
  }

  saveOrder(p:PurchaseOrderVO):Promise<Result>{
    const url = `${SERVER}/inventory/purchase-order`;
    return this.create(url, p);
  }

  updateOrder(p:PurchaseOrderVO):Promise<Result>{
    const url = `${SERVER}/inventory/purchase-order`;
    return this.update(url, p);
  }

  deleteOrder(ids:string):Promise<Result>{
    const url = `${SERVER}/inventory/purchase-order/${ids}`;
    return this.delete(url);
  }

  getSupplierById(id:string):Promise<Result>{
    const url = `${SERVER}/basicInfo/supplier/${id}`;
    return this.getAll(url);
  }

  getStaffById(id:string):Promise<Result>{
    const url = `${SERVER}/basic/staff/${id}`;
    return this.getAll(url);
  }

}
