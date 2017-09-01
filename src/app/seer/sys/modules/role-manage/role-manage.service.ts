import {Injectable} from '@angular/core';
import {SERVER} from "../../../const";
import {BaseService} from "../../../base.service";
import {Result} from "../../../model/result.class";
import {RoleWithSysUserIdsVO} from "./components/role-edit/RoleWithSysUserIdsVO";

@Injectable()
export class RoleManageService extends BaseService<any>{

  private roleManageUrl = SERVER+'/sys/role';  // URL to web api


  getRoles(): Promise<Result> {
    return this.getAll(this.roleManageUrl);
  }

  getRoleById(id: string): Promise<Result> {
    const url = `${this.roleManageUrl}/${id}`;
    return this.getAll(url);
    
  }

  updateRole(roleWithSysUserIdsVO: RoleWithSysUserIdsVO): Promise<Result> {
    const url = `${this.roleManageUrl}/`;
    return this.update(url,roleWithSysUserIdsVO);
  }

  createRole(roleWithSysUserIdsVO: RoleWithSysUserIdsVO): Promise<Result> {
    const url = `${this.roleManageUrl}/`;
    return this.create(url, roleWithSysUserIdsVO);
  }

  deleteRole(id: string): Promise<Result> {
    const url = `${this.roleManageUrl}/${id}`;
    return this.delete(url);
  }

  searchRoles(param:any): Promise<Result> {
    const url = `${this.roleManageUrl}/search`;
    return this.search(url, param);
  }

  getResources(): Promise<Result>{
    const url = `${SERVER}/sys/resource`;
    return this.getAll(url);
  }

  getAllOrgs(): Promise<Result>{
    const url = `${SERVER}/basicinfo/organizations`;
    return this.getAll(url);
  }

  getStaffsByOrgId(orgId:string): Promise<Result>{
    const url = `${SERVER}/basic/staff/org/${orgId}`;
    return this.getAll(url);
  }

  getSysUsersByStaffId(staffId:string): Promise<Result>{
    const url = `${SERVER}/sys/user/staff/${staffId}`;
    return this.getAll(url);
  }

  getUsersByRoleId(roleId:string): Promise<Result>{
    const url = `${SERVER}/sys/user/role/${roleId}`;
    return this.getAll(url);
  }

  updateUserRole(roleId:string, userIds:string[]):Promise<Result>{
    const url = `${SERVER}/sys/user/role/${roleId}`;
    return this.update(url, userIds);
  }

  getSysUsersWithOrgs():Promise<Result>{
    const url = `${SERVER}/sys/role/accountsWithOrg`;
    return this.getAll(url);
  }
}
