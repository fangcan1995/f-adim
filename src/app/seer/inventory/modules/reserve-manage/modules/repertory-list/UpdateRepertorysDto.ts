import {StorageArea} from "../../../../../model/basic_info/StorageArea";
import {Storage} from "../../../../../model/basic_info/Storage";
import {RepertoryListTableDto} from "./RepertoryListTableDto";
export class UpdateRepertorysDto {
  storage:Storage;
  storageArea: StorageArea;
  repertoryCheckDtoList: Array<RepertoryListTableDto>;
}
