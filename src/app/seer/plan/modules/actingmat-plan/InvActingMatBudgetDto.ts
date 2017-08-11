import {BaseEntity} from "../../../model/BaseEntity";
export class InvActingMatBudgetDto extends BaseEntity{

  id?: string;

  budgetName?: string;

  budgetSubject?: string;

  budgetAmount?: string;

  budgetBalance?: string;

  actingMatId?: string;

  customerStoreIds?: Array<string>;

  customerStoreNames?: string;

  startTime?: Date;

  endTime?: Date;

  staffName?: string;

  staffId?: string;

}
