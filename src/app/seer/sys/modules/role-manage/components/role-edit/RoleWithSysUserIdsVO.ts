import {Role} from "../../../../../model/auth/role";
export interface RoleWithSysUserIdsVO{
  role?: Role,
  userIds?: string[]
}
