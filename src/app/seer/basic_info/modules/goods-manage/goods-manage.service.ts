import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {SERVER} from "../../../const";
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {Goods} from "../../../model/basic_info/goods";
import {BrandManageService} from "../brand-manage/brand-manage.service";
/**
 * Created by Administrator on 2016/12/26.
 */
@Injectable()
export class GoodsManageService {

  private goodsManageUrl = SERVER + '/basicInfo/goods';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<Goods>, private brandService: BrandManageService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getBrand(): Promise<Result> {
    let param = {};
    return this.brandService.searchBrand(param);
  }

  getGoods(): Promise<Result> {
    return this.baseService.getAll(this.goodsManageUrl);
  }

  getGoodsById(id: string): Promise<Result> {
    const url = `${this.goodsManageUrl}/${id}`;
    return this.baseService.getById(url);
  }

  updateGoods(goods: Goods): Promise<Result> {
    const url = `${this.goodsManageUrl}`;
    return this.baseService.update(url, goods);
  }

  createGoods(goods: Goods): Promise<Result> {
    const url = `${this.goodsManageUrl}`;
    return this.baseService.create(url, goods);
  }

  deleteGoods(id: string): Promise<Result> {
    const url = `${this.goodsManageUrl}/${id}`;
    return this.baseService.delete(url);
  }

  searchGoods(param:any): Promise<Result> {
    const url = `${this.goodsManageUrl}`;
    return this.baseService.search(url, param);
  }

  batchDeleteGoods(ids: string[]): Promise<Result> {
    const url = `${this.goodsManageUrl}/batch`;
    return this.baseService.batchDelete(url, ids);
  }

  getDictByKey(dictKeyId: string): Promise<Result> {
    return this.baseService.getDictByKey(dictKeyId);
  }




}
