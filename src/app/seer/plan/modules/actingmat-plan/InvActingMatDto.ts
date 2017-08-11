import {BaseEntity} from "../../../model/BaseEntity";
export class InvActingMatDto extends BaseEntity{

  id?: string;

  actingMatNum?: string;

  actingMatName?: string;

  actingMatAmount?: string;

  actingMatBalance?: string;

  supplierId?: string;

  brandId?: string;

  startTime?: Date;

  endTime?: Date;

  actingMatMonth?: string;

  supplierName?: string;

  brandName?: string;

}
