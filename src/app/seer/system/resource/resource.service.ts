import { Injectable } from '@angular/core';
import { ResourceModel } from "./resource.model";
import { API, BaseService, HttpInterceptorService } from '../../../theme/services';
@Injectable()
export class ResourceService extends BaseService<ResourceModel> {
  constructor(
    protected _httpInterceptorService: HttpInterceptorService,
    ) {
    super(_httpInterceptorService);
    this.setApi(API['RESOURCES']);
  }

}
