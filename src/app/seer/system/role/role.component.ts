import {
	Component,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {
  SeerDialogService,
  SeerMessageService,
} from '../../../theme/services';
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
import { hasGlobalFilter, tableTitles } from './role.config';
import { RoleService } from './role.service';
@Component({
  templateUrl: './role.component.html',
  styleUrls: [ './role.component.scss' ],
})
export class RoleComponent {
  hasGlobalFilter = hasGlobalFilter;
  titles = tableTitles;
  offset = 0;
  limit = 10;
  roles = [];
  ngOnInit() {
    this.getList();
  }
  getList(params?) {
    this._roleService.getList(params)
    .then(res => {
      this.roles = _.map(res.data, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }
  handleFiltersChanged($event) {
    let params = {
      offset: this.offset,
      limit: this.limit,
      ...$event,
    }
    this.getList(params)
  }

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
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
                this.showError('删除失败')
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
            .then(res => {
              if ( res.success ) {
                this.getList();
              } else {
                this.showError('删除失败');
              }
            });
          }
        })
        break;
    }
  }
}
