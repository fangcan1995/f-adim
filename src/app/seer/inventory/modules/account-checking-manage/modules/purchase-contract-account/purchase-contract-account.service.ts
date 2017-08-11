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
/**
 * Created by Administrator on 2017/1/13.
 */
@Injectable()
export class PurchaseContractAccountService {

  private contractAccountUrl = SERVER + '/inventory/purchase/account/contract';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<ContractAccount>,
              private brandService: BrandManageService, private supplierManageService: SupplierManageService,
              private purchaseOrderService: PurchaseOrderService, private contractService: contractService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getContractsByTypeAndSupplier(param:any): Observable<Result> {
    return this.contractService.getcontractsbytypeandsupplier(param);
  }

  getContractBrand(contractId:string): Observable<Result> {
    return this.contractService.getContractBrand(contractId);
  }

  getRebateByBrandId(brandId:string): Observable<Result> {
    return this.contractService.getRebateByBrandId(brandId);
  }

  getPurchaseOrders(supplierId:string): Promise<Result> {
    let param = {supplierId: supplierId};
    return this.purchaseOrderService.getPurchaseOrders(param);
  }

  getSupplier(): Promise<Result> {
    let param = {};
    return this.supplierManageService.searchSuppliers(param);
  }

  getBrand(param:any): Promise<Result> {
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

  searchContractAccount(param:any): Promise<Result> {
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

  getStaffsWithOrgs():Promise<Result>{
    const url = `${SERVER}/sys/role/staffsWithOrg`;
    return this.baseService.getAll(url);
  }

}
