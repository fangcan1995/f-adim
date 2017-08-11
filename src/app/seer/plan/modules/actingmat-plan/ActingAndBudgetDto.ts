import {BaseEntity} from "../../../model/BaseEntity";
import {InvActingMatBudgetDto} from "./InvActingMatBudgetDto";
import {InvActingMatDto} from "./InvActingMatDto";
export class ActingAndBudgetDto{

  invActingMatDto: InvActingMatDto

  budgetDtoList: Array<InvActingMatBudgetDto>;

}
