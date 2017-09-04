import { BaseEntity } from "../BaseEntity";
export class Resource extends BaseEntity {
  resourceId: string;
  resourceParentId: string;
  resourceName: string;
  resourceType: string;
  resourceIcon: string;
  resourceContent: string;
  resourceSort: number;
  resourceRoles: string[];
  validState: string;
}
