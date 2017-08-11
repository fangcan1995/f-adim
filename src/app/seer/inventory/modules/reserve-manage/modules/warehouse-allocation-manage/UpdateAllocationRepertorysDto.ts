import {StorageArea} from "../../../../../model/basic_info/StorageArea";
import {Storage} from "../../../../../model/basic_info/Storage";
import {AllocationRepertoryCheckDto} from "./AllocationRepertoryCheckDto";
export class UpdateAllocationRepertorysDto {
  storage:Storage;
  repertoryCheckDtoList: Array<AllocationRepertoryCheckDto>;
}
