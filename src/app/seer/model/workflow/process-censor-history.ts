import {BaseEntity} from "../BaseEntity";
export class CensorHistory extends BaseEntity{
  id;
  orderId;
  processType;
  currentNode;
  totalNode;
  approvalOrder;
  isPassed;
  approvalOpinion;
  censorStaffId;
  orderState;
  nodeName;
}
