import {
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
// UserManageService
import { MessageService } from "../../message.service";
import { BaseModalComponent } from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { User } from "../../../../model/auth/user";
import { GlobalState } from "../../../../../global.state";
import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { jsonTree } from "../../../../../theme/utils/json-tree";
/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'message-added-dialog',
  styleUrls: ['./message-added-dialog.component.css'],
  templateUrl: './message-added-dialog.component.html',
  entryComponents:[]
})
export class  MessageAddedDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  SAVEEVENT = 'saveSysUser';
  EDITEVENT = 'editSysUser';
  title: string;
  sysUser : User = new User();
  roles = [];
  buttonFlag = true;
  flag: string;

  staffs = [];
  staffName;

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: MessageService, private _state: GlobalState) {
    super();
    this.service.getRoles().then((data) => {
      this.roles = data.data;
      if (this.flag == "1") {
        for (let role of this.roles) {
          for (var i = 0; i < this.sysUser.roles.length; i++) {
            if (role.roleId == this.sysUser.roles[i]) {
              role.selected = true;
            }
          }
        }
      }
    });
  }

  ngOnInit(){
    // this.service.getStaffsWithOrgs().then(result=>{
    //   if (result.success){
    //     result.data.map(res=>{
    //       if (res.customNodeType=='org'){
    //         res['customIcon'] = 'fa fa-sitemap';
    //       }
    //       if (res.customNodeType=='staff'){
    //         res['customIcon'] = 'ion-person';
    //       }
    //     });
    //     this.staffs = jsonTree(result.data);
    //   }else {
    //     alert(result.message);
    //   }
    // })

    // this.title = this.data.title;
    // this.flag = this.data.flag;
    // if (this.flag == '1') {
    //   this.sysUser = this.data.user;
    //   this.staffName = this.data.user.staffName;
    //   this.buttonFlag = false;
    // }
  }

  // onSave(): void {
  //   let rolesTemp: string[] = [];
  //   for (let data of this.roles) {
  //     if (data.selected) {
  //       rolesTemp.push(data.roleId);
  //     }
  //   }
  //   this.sysUser.roles = rolesTemp;
  //   this.service.createUser(this.sysUser).then((param) => {
  //     this.closeModal();
  //     this._state.notify(this.SAVEEVENT, param); //触发新增发放
  //   });
  // }

  // onEdit(): void {
  //   let rolesTemp: string[] = [];
  //   for (let data of this.roles) {
  //     if (data.selected) {
  //       rolesTemp.push(data.roleId);
  //     }
  //   }
  //   this.sysUser.roles = rolesTemp;
  //   this.service.updateUser(this.sysUser).then((param) => {
  //     this.closeModal();
  //     this._state.notify(this.EDITEVENT, param);
  //   });
  // }

  /**
   * 树选择事件
   */
  // onTreePickerNotify($event){
  //   if($event.eventName == "onSelectCompleted"){
  //     if($event.data.length > 0) {
  //       this.sysUser.staffId = $event.data[0].id;
  //       this.staffName = $event.data[0].data.name;
  //     }else {
  //       this.sysUser.staffId = undefined;
  //       this.staffName = undefined;
  //     }
  //   }
  // }

}
