import {BaseEntity} from "../BaseEntity";
export class Storage extends BaseEntity{

  id?: string

  parentId?: string;

  parentName?: string;

  storageName?: string;

  storageAdress?: string;

  storageBrandId?: string;

  storageChannelId?: string;

  storageType?: string;

  storageState?: string;

  storageRemark?: string;

  brandName?: string;

  brandShortName?:string;

  channelName?:string;

}
