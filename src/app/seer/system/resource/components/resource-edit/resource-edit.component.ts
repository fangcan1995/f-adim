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
import { UserService } from '../../../../../theme/services/user.service';
import { GlobalState } from '../../../../../global.state';
import { ResourceService } from "../../resource.service";
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import { ResourceModel } from "../../resource.model";
import {error} from "util";

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: [ './resource-edit.component.scss' ]
})
export class ResourceEditComponent implements OnInit {
  resource: ResourceModel = new ResourceModel();
  private editType: string = 'add';
  private forbidSaveBtn: boolean = true;
  private id: string;
  resourceList: any = [];
  @ViewChild('myForm') myForm;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _resourceService: ResourceService,
    private _messageService: SeerMessageService,
    private _location: Location,
    private _userService: UserService,
    private _state: GlobalState,
  ) { }

  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    this.resourceList.push({
      menuId: '0',
      menuName: '顶级菜单'
    })
    this._resourceService.getResourcesFromLocal()
    .then(res => {
      this.resourceList = this.resourceList.concat(res.data || []);
    })
    if ( this.editType === 'edit' ) {
      this._resourceService.getOne(this.id)
      .then(res => {
        this.resource = res.data || {};
        this.forbidSaveBtn = false;
      })
      .catch(err => {
        this.showError(err.msg || '获取资源信息失败')
        .onClose()
        .subscribe(() => {
          this._router.navigate(['/system/resource']);
        });
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
          this.forbidSaveBtn = false;
          this.refreshMenu()
          this.showSuccess(res.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/system/resource']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '更新失败')
        })
      } else {
        this._resourceService.postOne(this.resource)
        .then(res => {
          this.forbidSaveBtn = false;
          this.refreshMenu()
          this.showSuccess(res.msg || '保存成功')
          .onClose()
          .subscribe(() => {
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

  /*// 更新左侧导航菜单
  
  //保存按钮处理函数
  handleBackBtnClick() {
    this._location.back()
  } //返回按钮处理函数
  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/system/resource-manage/'])
    });
  }
  alertError(errMsg:string){
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }*/
}
