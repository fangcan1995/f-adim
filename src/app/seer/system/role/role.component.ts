import {
	Component,
	OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import {
  SeerDialogService,
  SeerMessageService,
} from '../../../theme/services';
import { RoleService } from "./role.service";
import { Role } from "../../model/auth/role";
import { ACTIONS } from '../../common/seer-table';
@Component({
  templateUrl: './role.component.html',
  styleUrls: [ './role.component.scss' ],
})
export class RoleComponent {
  hasGlobalFilter = true;
  title = '角色列表';
  roles = [];
  titles = [
    {key:'roleName',label:'角色名称'},
    {key:'validState',label:'有效状态',isDict: true},
    {key:'operateTime',label:'修改时间'},
    {key:'operator',label:'修改者'},
    {key:'createTime',label:'创建时间'},
    {key:'createUser',label:'创建者'},
  ];

  ngOnInit() {
    this.getList();
  }
  getList(params?) {
    this._roleService.getList()
    .then(res => {
      this.roles = res.data;
      this.roles = _.map(res.data, r => _.set(r, 'actions', [ACTIONS.UPDATE, ACTIONS.DELETE]));
    });
  }
  handleFiltersChanged($event) {
    console.log($event)
  }
  
  constructor(
    private _router: Router,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService,
    private _roleService: RoleService,
    ) { }
  handleNotify($event): void {
    let { type, data } = $event;

    switch ( type ) {
      case 'add':
        this._router.navigate(['/system/role/add']);
        break;
      case 'update':
        this._router.navigate(['/system/role/edit', data.roleId]);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
        .subscribe(action => {
          if ( action === 1 ) {
            this._roleService.deleteRole(data.roleId).then((data) => {
              if ( data.success ){
                this.getList();
              }else {
                alert("删除失败");
              }
            });
          }
        })
        break;
      case 'delete_all':
        let idList = _(data).map(t => t.roleId).value();

        this._roleService.deleteRole(idList.toString()).then((data) => {
          if ( data.success) {
            this.getList();
          }else {
            alert("删除失败");
          }
        });
        break;

    }
  }
}
