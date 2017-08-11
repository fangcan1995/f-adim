import {BaseTaskDTO} from "./base-task-dto";
export class OrderCensorDTO extends BaseTaskDTO{
  approved: boolean;
  nextCensorId: string;
  remark: string;
}
