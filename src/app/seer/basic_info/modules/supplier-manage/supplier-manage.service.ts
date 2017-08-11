import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {SERVER} from "../../../const";
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {Supplier} from "../../../model/basic_info/supplier";
/**
 * Created by Administrator on 2016/12/26.
 */
@Injectable()
export class SupplierManageService {

  private supplierManageUrl = SERVER + '/basicInfo/supplier';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<Supplier>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getSuppliers(): Promise<Result> {
    return this.baseService.getAll(this.supplierManageUrl);
  }

  getSupplierById(id: string): Promise<Result> {
    const url = `${this.supplierManageUrl}/${id}`;
    return this.baseService.getById(url);
  }

  updateSupplier(supplier: Supplier): Promise<Result> {
    const url = `${this.supplierManageUrl}`;
    return this.baseService.update(url, supplier);
  }

  createSupplier(supplier: Supplier): Promise<Result> {
    const url = `${this.supplierManageUrl}`;
    return this.baseService.create(url, supplier);
  }

  deleteSupplier(id: string): Promise<Result> {
    const url = `${this.supplierManageUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchSuppliers(param:any): Promise<Result> {
    const url = `${this.supplierManageUrl}`;
    return this.baseService.search(url, param);
  }

  batchDeleteSupplier(ids: string[]): Promise<Result> {
    const url = `${this.supplierManageUrl}/batch`;
    return this.baseService.batchDelete(url, ids);
  }

  getDictByKey(dictKeyId: string): Promise<Result> {
    return this.baseService.getDictByKey(dictKeyId);
  }

}
