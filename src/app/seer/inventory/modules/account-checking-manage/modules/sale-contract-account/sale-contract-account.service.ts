import {Injectable} from "@angular/core";
import {SERVER} from "../../../../../const";
import {Headers, Http} from "@angular/http";
import {BaseService} from "../../../../../base.service";
import {BrandManageService} from "../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {SupplierManageService} from "../../../../../basic_info/modules/supplier-manage/supplier-manage.service";
import {PurchaseOrderService} from "../../../purchase-manage/modules/purchase-order/purchase-order.service";
import {contractService} from "../../../../../basic_info/modules/contract-manage/contrat-manage.service";
import {ContractAccount} from "../../../../../model/inventory/contractAccount";
import {Observable} from "rxjs";
import {Result} from "../../../../../sys/modules/resource-manage/result-model.class";
import {SaleOrderService} from "../../../sales-manage/modules/sale-order/sale-order.service";
/**
 * Created by Administrator on 2017/3/1.
 */
@Injectable()
export class SaleContractAccountService {

  private contractAccountUrl = SERVER + '/inventory/sale/account/contract';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<ContractAccount>,
              private brandService: BrandManageService, private supplierManageService: SupplierManageService,
              private saleOrderService: SaleOrderService, private contractService: contractService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getContractsByTypeAndSupplier(param: any): Observable<Result> {
    return this.contractService.getcontractsbytypeandsupplier(param);
  }

  getContractBrand(contractId: string): Observable<Result> {
    return this.contractService.getContractBrand(contractId);
  }

  getRebateByBrandId(brandId: string): Observable<Result> {
    return this.contractService.getRebateByBrandId(brandId);
  }

  getSaleOrders(customerStoreId: string): Promise<Result> {
    let param = {customerStoreId: customerStoreId};
    return this.saleOrderService.searchSaleOrder(param);
  }

  getSupplier(): Promise<Result> {
    let param = {};
    return this.supplierManageService.searchSuppliers(param);
  }

  getBrand(param: any): Promise<Result> {
    return this.brandService.searchBrand(param);
  }

  getContractAccount(): Promise<Result> {
    return this.baseService.getAll(this.contractAccountUrl);
  }

  getContractAccountById(id: string): Promise<Result> {
    const url = `${this.contractAccountUrl}/${id}`;
    return this.baseService.getById(url);
  }

  updateContractAccount(contractAccount: ContractAccount): Promise<Result> {
    const url = `${this.contractAccountUrl}`;
    return this.baseService.update(url, contractAccount);
  }

  createContractAccount(contractAccount: ContractAccount): Promise<Result> {
    const url = `${this.contractAccountUrl}`;
    return this.baseService.create(url, contractAccount);
  }

  deleteContractAccount(id: string): Promise<Result> {
    const url = `${this.contractAccountUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchContractAccount(param: any): Promise<Result> {
    const url = `${this.contractAccountUrl}`;
    return this.baseService.search(url, param);
  }

  batchDeleteContractAccount(ids: string[]): Promise<Result> {
    const url = `${this.contractAccountUrl}/batch`;
    return this.baseService.batchDelete(url, ids);
  }

  getDictByKey(dictKeyId: string): Promise<Result> {
    return this.baseService.getDictByKey(dictKeyId);
  }

  getStaffsWithOrgs(): Promise<Result> {
    const url = `${SERVER}/sys/role/staffsWithOrg`;
    return this.baseService.getAll(url);
  }

}
