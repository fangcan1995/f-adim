import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from "@angular/router";
import { Location } from '@angular/common';
import { ManageService, SeerMessageService } from '../../../../../theme/services';
import { GlobalState } from '../../../../../global.state';
import { ResourceService } from "../../resource.service";
import { ResourceModel } from "../../resource.model";
import {error} from "util";
import * as _ from 'lodash';
@Component({
  templateUrl: './resource-edit.component.html',
  styleUrls: [ './resource-edit.component.scss' ]
})
export class ResourceEditComponent implements OnInit {
  resource: ResourceModel = new ResourceModel();
  editType: string = 'add';
  forbidSaveBtn: boolean = true;
  id: string;
  resourceList: any = [];
  @ViewChild('myForm') myForm;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _resourceService: ResourceService,
    private _messageService: SeerMessageService,
    private _location: Location,
    private _manageService: ManageService,
    private _state: GlobalState,
  ) { }

  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    this.resourceList.push({
      menuId: '0',
      menuName: '顶级菜单'
    })
    this._resourceService.getList({ pageSize: 10000 })
    .then(res => {
      this.resourceList = this.resourceList.concat(res.data ? res.data.list || [] : []);
    })
    if ( this.editType === 'edit' ) {
      this._resourceService.getOne(this.id)
      .then(res => {
        this.resource = res.data || {};
        console.log(this.resource.systemId);
        this.forbidSaveBtn = false;
      })
      .catch(err => {
        this.showError(err.msg || '获取资源信息失败')
      });
    } else if ( this.editType === 'add' ) {
      this.forbidSaveBtn = false;
    }
  }
  handleBackBtnClick() {
    this._location.back();
  }
  handleSaveBtnClick() {
    if ( this.myForm.form.valid ) {
      this.forbidSaveBtn = true;
      if ( this.editType === 'edit' ) {
        this._resourceService.putOne('', this.resource)
        .then(res => {
          
          // 如果编辑的菜单正好是用户有权查看的菜单，那么刷新用户信息
          let resourcesInLocal = this._manageService.getResourcesFromLocal() || [];
          if ( _.find(resourcesInLocal, t => t['menuId']) == this.resource['menuId'] ) {
            this._manageService.refreshLocalDataAndNotify();
          }
          this.showSuccess(res.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this.forbidSaveBtn = false;
            this._router.navigate(['/system/resource']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '更新失败')
        })
      } else {
          if(!this.resource.menuStatus) {
            this.resource.menuStatus = '0';
          }
        this._resourceService.postOne(this.resource)
        .then(res => {
          this.showSuccess(res.msg || '保存成功')
          .onClose()
          .subscribe(() => {
            this.forbidSaveBtn = false;
            this._router.navigate(['/system/resource']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '保存失败')
        })
      }
      
    }
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
