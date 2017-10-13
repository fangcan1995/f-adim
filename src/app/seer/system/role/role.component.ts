import {
	Component,
	OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {
  SeerDialogService,
  SeerMessageService,
} from '../../../theme/services';
import { UPDATE, DELETE, COPY_CREATE, DOWNLOAD, DETAIL, PREVIEW } from '../../common/seer-table/seer-table.actions';
import { hasGlobalFilter, tableTitles } from './role.config';
import { RoleService } from './role.service';
@Component({
  templateUrl: './role.component.html',
  styleUrls: [ './role.component.scss' ],
})
export class RoleComponent implements OnInit {
  hasGlobalFilter = hasGlobalFilter;
  titles = tableTitles;
  offset = 0;
  limit = 10;
  roles = [];
  simpleTableActions = [ DOWNLOAD, PREVIEW ]
  @ViewChild('simpleTable') simpleTable
  ngOnInit() {
    this.getList();
  }
  getList(params?) {
    this._roleService.getList(params)
    .then(res => {
      this.roles = _.map(res.data, r => _.set(r, 'actions', [ COPY_CREATE, UPDATE, DELETE ]));
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
  handleSimpleTableNotify($event) {
    console.log($event)
    let { type, key } = $event;
    switch ( type ) {
      case 'save':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.save(key);
          // data只请求一次，不要更新data，以下是错误的用例，因为请求data会改变table里的key，所以如果多次改变data我当刷新处理；
          // this.getList();
        }, 3000)
        break;
      case 'delete':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.delete(key);
        }, 3000)
        break;
    }
  }
  handleSimpleTableCardNotify($event) {
    console.log($event)
  }
}
