/**
 * Created by Administrator on 2017/2/20.
 */
import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {SERVER} from "../../../../../const";
import {BaseService} from "../../../../../base.service";
import {Result} from "../../../../../model/result.class";
import {ContractAccount} from "../../../../../model/inventory/contractAccount";
import {BrandManageService} from "../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {SupplierManageService} from "../../../../../basic_info/modules/supplier-manage/supplier-manage.service";
import {PurchaseOrderService} from "../../../purchase-manage/modules/purchase-order/purchase-order.service";
import {contractService} from "../../../../../basic_info/modules/contract-manage/contrat-manage.service";
import {Observable} from "rxjs";
import {SaleOrderService} from "../../../sales-manage/modules/sale-order/sale-order.service";
/**
 * Created by Administrator on 2017/1/13.
 */
@Injectable()
export class SaleAccountService {

  private saleAccountUrl = SERVER + '/inventory/account/sale';
  private saleAccountActingMatBudgetUrl = SERVER + '/plan/acting';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<ContractAccount>,
              private brandService: BrandManageService, private supplierManageService: SupplierManageService,
              private saleOrderService: SaleOrderService, private contractService: contractService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getSaleOrders(customerStoreId:string): Promise<Result> {
    let param = {customerStoreId: customerStoreId};
    return this.saleOrderService.searchSaleOrder(param)
  }

  getActingMatBudget(id:string): Promise<Result> {
    const url = `${this.saleAccountActingMatBudgetUrl}/saleAccount/${id}`;
    return this.baseService.getAll(url);
  }

  getSupplier(): Promise<Result> {
    let param = {};
    return this.supplierManageService.searchSuppliers(param);
  }

  getBrand(param:any): Promise<Result> {
    return this.brandService.searchBrand(param);
  }

  getSaleAccount(): Promise<Result> {
    return this.baseService.getAll(this.saleAccountUrl);
  }

  getSaleAccountById(id: string): Promise<Result> {
    const url = `${this.saleAccountUrl}/${id}`;
    return this.baseService.getById(url);
  }

  updateSaleAccount(contractAccount: ContractAccount): Promise<Result> {
    const url = `${this.saleAccountUrl}`;
    return this.baseService.update(url, contractAccount);
  }

  createSaleAccount(contractAccount: ContractAccount): Promise<Result> {
    const url = `${this.saleAccountUrl}`;
    return this.baseService.create(url, contractAccount);
  }

  deleteSaleAccount(id: string): Promise<Result> {
    const url = `${this.saleAccountUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchSaleAccount(param:any): Promise<Result> {
    const url = `${this.saleAccountUrl}`;
    return this.baseService.search(url, param);
  }

  batchDeleteSaleAccount(ids: string[]): Promise<Result> {
    const url = `${this.saleAccountUrl}/batch`;
    return this.baseService.batchDelete(url, ids);
  }

  getDictByKey(dictKeyId: string): Promise<Result> {
    return this.baseService.getDictByKey(dictKeyId);
  }

  getStaffsWithOrgs():Promise<Result>{
    const url = `${SERVER}/sys/role/staffsWithOrg`;
    return this.baseService.getAll(url);
  }

}
