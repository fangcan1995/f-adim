import { Injectable } from '@angular/core';
import { RoleService } from "../role/role.service";
@Injectable()
export class UserService {

  constructor(
    private roleService:RoleService
    ) {
  }
}
