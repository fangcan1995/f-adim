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
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
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
    this._roleService.getList(params)
    .then(res => {
      this.roles = res.data;
      this.roles = _.map(res.data, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }
  handleFiltersChanged($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
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
      case 'create':
        this._router.navigate(['/system/role/add']);
        break;
      case 'update':
        this._router.navigate(['/system/role/edit', data.roleId]);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
        .subscribe(action => {
          if ( action === 1 ) {
            this._roleService.deleteOne(data.roleId)
            .then(res => {
              if ( res.success ) {
                this.getList();
              } else {
                this._messageService.open({
                  icon: 'fa fa-times-circle',
                  message: '删除失败',
                  autoHideDuration: 3000,
                })
              }
            });
          }
        })
        break;
      case 'delete_multiple':
        this._dialogService.confirm('确定删除吗？')
        .subscribe(action => {
          if ( action === 1 ) {
            this._roleService.deleteMultiple(_.map(data, t => t['roleId']).toString())
            .then((data) => {
              if ( data.success ) {
                this.getList();
              } else {
                this._messageService.open({
                  icon: 'fa fa-times-circle',
                  message: '删除失败',
                  autoHideDuration: 3000,
                })
              }
            });
          }
        })
        break;

    }
  }
}
