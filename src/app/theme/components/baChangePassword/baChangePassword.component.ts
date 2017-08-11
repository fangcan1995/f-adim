import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {BaseModalComponent} from "../../directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../ng2-bs4-modal/modal";
import {GlobalState} from "../../../global.state";
import {LoginService} from "../../../seer/login/login.service";
import {BaseService} from "../../../seer/base.service";

@Component({
  selector: 'change-password',
  templateUrl: './baChangePassword.html',
  styleUrls: ['./style.scss'],
  styles: [
    `.input-group-btn{
      font-size: 14px;
    }`,
    `.input-group-btn > .btn{
        height: 35px;
        margin-left: -1px !important;
    }`
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [BaseService],

})
export class ChangePasswordComponent  extends BaseModalComponent implements OnInit{

  /**
   * 1.找到modal组件
   */
  @ViewChild(ModalComponent) modal;

  title : string = "修改密码";

  oldPassword : string;

  newPassword : string;

  verifyPassword : string;

  promptMessage : string;

  promptCode : string;

  constructor( private gs?:GlobalState,private loginService?:LoginService, private baseService ?: BaseService<any>) {super();}

  ngOnInit() {



  }

  /*
   * 修改密码
   * */
  save(): void {

    if(this.oldPassword != null) {
      if(this.newPassword != null) {
        if(this.newPassword == this.verifyPassword) {
          let param = {userId:this.baseService.getCurrentUser().userId, oldPassword: this.oldPassword, newPassword:this.newPassword}
          this.loginService.changePassword(param).subscribe(json => {
            if(json.success) {
              this.promptMessage = "修改成功";
              this.closeModal();
            }else {
              this.promptCode = "0";
              this.promptMessage = "当前密码错误";
            }
          });
        }else {
          this.promptCode = "2";
          this.promptMessage = "两次密码不一致";
        }
      }else {
        this.promptCode = "1";
        this.promptMessage = "请输入新密码";
      }
    }else {
      this.promptCode = "0";
      this.promptMessage = "请输入当前密码";
    }

  }

}

