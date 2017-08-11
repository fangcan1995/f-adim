import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {BaseService} from "../../../base.service";
import {SERVER} from "../../../const";
/*import Any = jasmine.Any;*/
import {Result} from "../../../model/result.class";
import {Storage} from "../../../model/basic_info/Storage";
import {StorageArea} from "../../../model/basic_info/StorageArea";



@Injectable()
export class StorageManageService {

  private storageManageUrl = SERVER + '/basicinfo';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private baseService: BaseService<any>) {
  }

  private handleError(error: any): Promise<any> {
    console.error('出错啦', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*
  * 创建库房
  * */
  createStorage(storage: Storage): Promise<Result> {
    let url = `${this.storageManageUrl}/storage`;
    return this.baseService.create(url,storage);
  }

  /*
   * 修改库房
   * */
  editStorage(storage: Storage): Promise<Result> {
    let url = `${this.storageManageUrl}/storage`;
    return this.baseService.update(url,storage);
  }

  /*
   * 删除库房
   * */
  removeStorage(id: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storage/${id}`;
    return this.baseService.delete(url);
  }

  /*
   * 根据id查询库房
   * */
  getStorageById(id: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storage/${id}`;
    return this.baseService.getAll(url);
  }

  /*
   * 查询全部库房
   * */
  getStorages(): Promise<Result> {
    let url = `${this.storageManageUrl}/storages`;
    return this.baseService.getAll(url);
  }

  /*
   * 根据库房父编号查询自库房列表
   * */
  getStoragesByParentId(parentId: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storages/parentId/${parentId}`;
    return this.baseService.getAll(url);
  }

  /*
   * 创建库位
   * */
  createStorageArea(storageArea: StorageArea): Promise<Result> {
    let url = `${this.storageManageUrl}/storageArea`;
    return this.baseService.create(url,storageArea);
  }

  /*
   * 修改库位
   * */
  editStorageArea(storageArea: StorageArea): Promise<Result> {
    let url = `${this.storageManageUrl}/storageArea`;
    return this.baseService.update(url,storageArea);
  }

  /*
   * 删除库位
   * */
  removeStorageArea(id: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storageArea/${id}`;
    return this.baseService.delete(url);
  }

  /*
   * 根据id查询库位
   * */
  getStorageAreaById(id: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storageArea/${id}`;
    return this.baseService.getAll(url);
  }

  /*
   * 根据库房id查询库房和库位
   * */
  getStorageByStorageId(storageId: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storage/${storageId}`;
    return this.baseService.getAll(url);
  }

  /*
   * 根据库房id查询库房和库位
   * */
  getStorageAreasByStorageId(storageId: string): Promise<Result> {
    let url = `${this.storageManageUrl}/storageAreas/storageId/${storageId}`;
    return this.baseService.getAll(url);
  }
  /*
   * 根据库房id查询库房和库位
   * */
  saveStorage(data): Promise<Result> {
    let url = `${this.storageManageUrl}/storage`;
    return this.baseService.update(url, data);
  }

}


