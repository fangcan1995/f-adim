import {
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";

import { UserManageService } from "../../user-manage.service";
import { BaseModalComponent } from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { User } from "../../../../model/auth/user";
import { GlobalState } from "../../../../../global.state";
// import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { jsonTree } from "../../../../../theme/utils/json-tree";
import {Location} from '@angular/common';
import {ActivatedRoute, Params,Routes} from "@angular/router";

/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'user-added-dialog',
  styleUrls: ['./user-added-dialog.scss'],
  templateUrl: './user-added-dialog.component.html',
  entryComponents:[]
})
export class UserAddedDialogComponent extends BaseModalComponent implements OnInit{

  // @ViewChild(ModalComponent) modal: ModalComponent;
  newTitle = "新增用户"
  SAVEEVENT = 'saveSysUser';
  EDITEVENT = 'editSysUser';
  // title: string;
  sysUser = new User();
  roles = [];
  buttonFlag = true;
  flag: string;

  staffs = [];
  staffName;

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: UserManageService, private _state: GlobalState,private location: Location,private route: ActivatedRoute) {
    super();
    this.service.getRoles().then((data) => {
      // 用于编辑数据的时候 带数据过页面 还有数据 单选的选择

      this.roles = data.data;
      console.log(this.roles)
      console.log(this.sysUser);
      
     
        // for (let role of this.roles) {
        //   for (var i = 0; i < this.sysUser.roles.length; i++) {
        //     if (role.roleId == this.sysUser.roles[i]) {
        //       role.selected = true;
        //     }
        //   }
        // }
    });
  }

  ngOnInit(){
     this.route.params.subscribe((params: Params) => {
         console.log(params);
        //  this.service.getRoleById(params['params']).then((result: Result) => {
        //    console.log(Result);
           
        //  }
     }
    //   this.route.params.subscribe((params: Params) => {
    //   console.log(params);
    //   // this.service.getRoleById(params['params']).then((result: Result) => {
    //   // //  console.log(data)
    //   // // result = {
    //   // //     'success': "true","message": "成功",
    //   // //     'data':
    //   // //       { tplId: "01",
    //   // //         tplName:"小花",
    //   // //         tplCode:"13520550355",
    //   // //         tplType:"短信",
    //   // //       }   
    //   // //   }
    //   // //  if (result.success) {
    //   // //     this.template = result.data;
    //   // //     this.title = '修改消息';
    //   // //   } else {
    //   // //     alert(result.message);
    //   // //   }
    //   // });    
    // }
    // // this.service.getStaffsWithOrgs().then(result=>{
    // //   if (result.success){
    // //     result.data.map(res=>{
    // //       if (res.customNodeType=='org'){
    // //         res['customIcon'] = 'fa fa-sitemap';
    // //       }
    // //       if (res.customNodeType=='staff'){
    // //         res['customIcon'] = 'ion-person';
    // //       }
    // //     });
    // //     this.staffs = jsonTree(result.data);
    // //   }else {
    // //     alert(result.message);
    // //   }
    // // })

    // this.title = this.data.title;
    // this.flag = this.data.flag;
    // // if (this.flag == '1') {
    // //   this.sysUser = this.data.user;
    // //   this.staffName = this.data.user.staffName;
    // //   this.buttonFlag = false;
    // // }
    )}
  // ==========返回=================
  goBack():void{
    this.location.back();
  }
  // ========保存===========
  onSave(): void {
    let rolesTemp: string[] = [];
    for (let data of this.roles) {
      if (data.selected) {
        rolesTemp.push(data.roleId);
      }
    }
    this.sysUser.roles = rolesTemp;
    this.service.createUser(this.sysUser).then((param) => {
      this.closeModal();
      this._state.notify(this.SAVEEVENT, param); //触发新增发放
    });
  }

  onEdit(): void {
    let rolesTemp: string[] = [];
    for (let data of this.roles) {
      if (data.selected) {
        rolesTemp.push(data.roleId);
      }
    }
    this.sysUser.roles = rolesTemp;
    this.service.updateUser(this.sysUser).then((param) => {
      // this.closeModal();
      this._state.notify(this.EDITEVENT, param);
    });
  }

  /**
   * 树选择事件
   */
  onTreePickerNotify($event){ 
    console.log($event);
    console.log($event.eventName);
    if($event.eventName == "onSelectCompleted"){ 
      if($event.data.length > 0) {
        this.sysUser.staffId = $event.data[0].id;
        this.staffName = $event.data[0].data.name;
      }else {
        this.sysUser.staffId = undefined;
        this.staffName = undefined;
      }
    }
  }

}
