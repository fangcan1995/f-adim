import {Component, ViewEncapsulation} from "@angular/core";
import {RoleManageService} from "../../role-manage.service";
@Component({
  selector: 'role-operation',
  templateUrl: './role-operation.component.html',
  providers: [RoleManageService],
  styleUrls: ['./role-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleOperationComponent{
  title = '角色操作';
  constructor(private service:RoleManageService){}
}
