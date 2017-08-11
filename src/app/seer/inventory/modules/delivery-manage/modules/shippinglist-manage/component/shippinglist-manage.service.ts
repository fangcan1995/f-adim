import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {BaseService} from "../../../../../../base.service";
import {Result} from "../../../../../../model/result.class";
import {SERVER} from "../../../../../../const";
import {ShippingModel} from "./shipping-model.class";


@Injectable()
export class ShippingListManageService {

  private shippingManageUrl = SERVER+'/sys/shippinglist';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService:BaseService<ShippingModel>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getShipping(): Promise<Result> {
    return this.baseService.getAll(this.shippingManageUrl);
  }

  createShipping(resource: ShippingModel): Promise<Result> {
    const url = `${this.shippingManageUrl}/`;
    return this.baseService.create(url,resource);
  }

  getShippingById(resourceId: string): Promise<Result> {
    const url = `${this.shippingManageUrl}/${resourceId}`;
    return this.baseService.getById(url);
  }

  updateShipping(resource: ShippingModel): Promise<Result> {
    const url = `${this.shippingManageUrl}/`;
    return this.baseService.update(url,resource);
  }

  deleteShipping(resourceId: string): Promise<Result> {
    const url = `${this.shippingManageUrl}/${resourceId}`;
    return this.baseService.delete(url);
  }

  searchShipping(param:any): Promise<Result> {
    const url = `${this.shippingManageUrl}/search`;
    return this.baseService.search(url,param);
  }

}
