import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResourceService } from "./resource.service";
import * as _ from 'lodash';
import { CREATE, COPY_CREATE, UPDATE, DELETE, DELETE_MULTIPLE } from "../../common/seer-table/seer-table.actions";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { SeerMessageService } from '../../../theme/services/seer-message.service';
import { UserService } from '../../../theme/services';
import { GlobalState } from '../../../global.state';
@Component({
  templateUrl: './resource.component.html',
  styleUrls: [ './resource.component.scss' ],
})
export class ResourceComponent implements OnInit {
    hasGlobalFilter = true;
    titles = [
        {
          key:'menuId',
          label:'菜单编号'
        },
      {
        key:'menuPid',
        label:'菜单父编号'
      },
      {
        key:'menuName',
        label:'菜单名'
      },
      {
        key:'menuType',
        label:'菜单类型',
        isDict: true,
        category: 'MENU_TYPE'
      },
      {
        key:'menuDesc',
        label:'菜单说明',
      },
      {
        key:'sortNum',
        label:'菜单顺序',
      },
      {
        key:'menuStatus',
        label:'有效状态',
        isDict: true,
        category: 'MENU_STATUS'
      }
    ];
    resources = [];
    constructor(
      private _resourceService: ResourceService,
      private _dialogService: SeerDialogService,
      private _messageService: SeerMessageService,
      private _userService: UserService,
      private _state: GlobalState,
      private _router: Router,
      ){}
    ngOnInit() {
      this.getList();
    }
    getList() {
        this._resourceService.getList({ pageSize: 10000 })
        .then(res => {
            this.resources = _.map(res.data ? res.data.list || [] : [], r => _.set(r, 'actions', [ UPDATE, DELETE ]));
        })
        .catch(err => {
            this.showError( err.msg || '获取资源失败' );
        })
    }
    handleNotify(message): void {
        const { type, data } = message;
        switch ( type ) {
          case CREATE.type:
            this._router.navigate(['/system/resource/add']);
            break;
          case UPDATE.type:
            this._router.navigate([`/system/resource/edit/${data.menuId}`]);
            break;
          case DELETE.type:
            this._dialogService.confirm('确定删除吗？')
              .subscribe(action => {
                if ( action === 1 ) {
                  this._resourceService
                  .deleteOne(data)
                  .then((res) => {
                    this.showSuccess(res.msg || '删除资源成功')
                    this.refreshMenu();
                  })
                  .catch(err => {
                    this.showError(err.msg || '删除资源失败')
                  });
                }
              })
            break;
          case DELETE_MULTIPLE.type:
            let ids = _(data).map(t => t.id).value();
            break;
        }
    }
    // 更新左侧导航菜单
    refreshMenu() {
      this._userService.getResourcesFromServer({ pageSize: 10000 })
      .then(res => {
        const resources = res.data ? res.data.list || [] : [];
        this._userService.setResourcesToLocal(resources);
        this._state.notify('menu.changed', resources);
      })
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
}
