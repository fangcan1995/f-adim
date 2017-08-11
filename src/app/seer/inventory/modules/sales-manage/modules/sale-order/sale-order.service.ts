import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {SERVER} from "../../../../../const";
import {BaseService} from "../../../../../base.service";
import {SaleOrder} from "../../../../../model/inventory/saleOrder";
import {Result} from "../../../../../model/result.class";
/**
 * Created by Administrator on 2017/1/13.
 */
@Injectable()
export class SaleOrderService {

  private saleOrderUrl = SERVER + '/inventory/sales/saleOrder';
  private goodsManageUrl = SERVER + '/basicInfo/goods';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<SaleOrder>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getSaleOrder(): Promise<Result> {
    return this.baseService.getAll(this.saleOrderUrl);
  }

  getSaleOrderById(id: string): Promise<Result> {
    const url = `${this.saleOrderUrl}/${id}`;
    return this.baseService.getById(url);
  }

  getSaleGoodsById(id: string): Promise<Result> {
    const url = `${this.saleOrderUrl}/saleGoods/${id}`;
    return this.baseService.getById(url);
  }

  getSaleGoodsGiftById(id: string): Promise<Result> {
    const url = `${this.saleOrderUrl}/gift/${id}`;
    return this.baseService.getById(url);
  }

  getSaleGoodsMaterialById(id: string): Promise<Result> {
    const url = `${this.saleOrderUrl}/material/${id}`;
    return this.baseService.getById(url);
  }

  getSaleGoods(): Promise<Result> {
    const url = `${this.goodsManageUrl}/all`;
    return this.baseService.getAll(url);
  }

  getSaleGoodsGift(id: string): Promise<Result> {
    const url = `${this.goodsManageUrl}/gift/${id}`;
    return this.baseService.getById(url);
  }

  getSaleGoodsMaterial(id: string): Promise<Result> {
    const url = `${this.goodsManageUrl}/material/${id}`;
    return this.baseService.getById(url);
  }

  updateSaleOrder(saleOrder: SaleOrder): Promise<Result> {
    const url = `${this.saleOrderUrl}`;
    return this.baseService.update(url, saleOrder);
  }

  createSaleOrder(saleOrder: SaleOrder): Promise<Result> {
    const url = `${this.saleOrderUrl}`;
    return this.baseService.create(url, saleOrder);
  }

  deleteSaleOrder(id: string): Promise<Result> {
    const url = `${this.saleOrderUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchSaleOrder(param:any): Promise<Result> {
    const url = `${this.saleOrderUrl}`;
    return this.baseService.search(url, param);
  }

  batchDeleteSaleOrder(ids: string[]): Promise<Result> {
    const url = `${this.saleOrderUrl}/batch`;
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
