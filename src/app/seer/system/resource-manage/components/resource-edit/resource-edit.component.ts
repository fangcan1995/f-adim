import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from "@angular/router";
import { Location } from '@angular/common';
import { UserService } from '../../../../../theme/services/user.service';
import { GlobalState } from '../../../../../global.state';
import { ResourceManageService } from "../../resource-manage.service";
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import { ResourceModel } from "../../resource-model.class";
import {error} from "util";

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  title : string;
  isAdd: boolean;
  editId: string;
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  public : boolean = true;
  resource:ResourceModel = new ResourceModel();

  constructor(
    private _router: Router,
    private service:ResourceManageService,
    private _messageService: SeerMessageService,
    private _activatedRoute:ActivatedRoute,
    private _location: Location,
    private _userService: UserService,
    private _state: GlobalState,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })
    this.title = this.isAdd ? '新建资源' : '修改资源';
    this.forbidSaveBtn = false;
    if(!this.isAdd) {
      this._editType='edit';
      this.service.getOne(this.editId).then((data) => {
        this.resource = data.data;
        console.log(this.resource)
      });
    }else {
      //this.forbidSaveBtn = false;
    };
  }
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if ( this._editType === 'edit' ) {
      this.service.putOne(this.resource).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("更新成功");
          this.refreshMenu();
        }else{
          this.alertError("更新失败");
        }
      }).catch(err => {
        this.alertError("更新失败");
      });
    } else if ( this._editType === 'add' ) {
      this.service.postOne(this.resource).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("添加成功");
          this.refreshMenu();
        }else{
          this.alertError("添加失败");
        }
      }).catch(err => {
        this.alertError("添加失败");
      });;
    } else {
      return;
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
  }
}
