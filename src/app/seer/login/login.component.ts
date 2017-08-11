import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "./login.service";
import { Router } from '@angular/router';
import {GlobalState} from "../../global.state";
import {menuTree} from "../../theme/utils/json-tree";
import {DynamicComponentLoader} from "../../theme/directives/dynamicComponent/dynamic-component.directive";
import {VersionInfoComponent} from "./component/version-info.component";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.css'],
  templateUrl: './login.html',

})
export class LoginComponent{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public userForm:FormGroup;
  public account:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  errorMessage: string;
  currentUser = {};
  loginInfo:Object;
  success: boolean;

  constructor(fb:FormBuilder,private _loginService: LoginService,private router: Router,private _state:GlobalState) {
    this.userForm = fb.group({
      'account': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.account = this.userForm.controls['account'];
    this.password = this.userForm.controls['password'];

  }
  //
  // public onSubmit(values:Object):void {
  //   this.submitted = true;
  //   if (this.userForm.valid) {
  //     // your code goes here
  //     // console.log(values);
  //   }
  // }

  submit_login(user): void{
    this._loginService.login(user)
      .subscribe(
        loginInfo => {
          if(loginInfo.data){
            localStorage.setItem('data', JSON.stringify(loginInfo.data));
            localStorage.setItem('isLogin', JSON.stringify(loginInfo.success));
            localStorage.setItem('leftMenus',JSON.stringify(menuTree(loginInfo.data.currentResources)));
            this.loginInfo = loginInfo;
            this.success = loginInfo.success;
            if(this.success == true){
              this.router.navigate(['/seer']);
            }else {
              this.router.navigate(['/login']);
            }
          }else{
            alert("账号或密码错误！")
          }
        },
        error =>  this.errorMessage = <any>error);
  }

  versionShow() {
    this.dynamicComponentLoader.loadComponent(VersionInfoComponent, null);
  }
}
