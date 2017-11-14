import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {
  ManageService,
  SeerDialogService,
  SeerMessageService,
} from '../../../theme/services';
import { GlobalState } from '../../../global.state';
import { UPDATE, DELETE, COPY_CREATE, DOWNLOAD, DETAIL, PREVIEW } from '../../common/seer-table/seer-table.actions';
import { hasGlobalFilter, tableTitles } from './role.config';
import { RoleService } from './role.service';
@Component({
  templateUrl: './role.component.html',
  styleUrls: [ './role.component.scss' ],
})
export class RoleComponent {
  hasGlobalFilter = hasGlobalFilter;
  titles = tableTitles;
  tableFilters = {};
  roles = [];
  params:any = {
    pageSize: 10000,
  };
  constructor(
    private _router: Router,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService,
    private _roleService: RoleService,
    private _manageService:ManageService,
    private _state: GlobalState,
    ) {

  }
  ngOnInit() {
    this.getList();
  }
  getList() {
    this._roleService.getList(this.params)
    .then(res => {
      let data = res.data || {};
      this.roles = _.map(data.list, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    })
    .catch(err => {
      this.showError( err.msg || '获取角色失败' );
    });
  }
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
  handleNotify({ type, data }): void {
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
            this._roleService
            .deleteOne(data.roleId)
            .then(res => {
              // 如果删除的角色正好是用户所属的角色之一，那么刷新本地数据；
              let rolesInLocal = this._manageService.getRolesFromLocal() || [];
              if ( _.find(rolesInLocal, t => t['roleId'] == data['roleId']) ) {
                this._manageService.refreshLocalDataAndNotify();
              }
              this.showSuccess(res.msg || '删除用户成功')
              this.getList();
            })
            .catch(err => {
              this.showError(err.msg || '删除用户失败')
            });
          }
        })
        break;
      case 'delete_multiple':
        break;
    }
  }
  handleFiltersChanged($event) {
    this.tableFilters = $event;
  }
}
