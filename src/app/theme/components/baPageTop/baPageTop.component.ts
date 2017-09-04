import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from "@angular/router";
import { LoginService } from "../../../seer/login/login.service";
import { DynamicComponentLoader } from "../../directives/dynamicComponent/dynamic-component.directive";
import { ChangePasswordComponent } from "../baChangePassword/baChangePassword.component";
import { LoginData } from "../../../seer/model/LoginData";
import { StaffManageService } from "../../../seer/basic-info/staff/staff.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[LoginService,StaffManageService]
})
export class BaPageTop implements OnInit,OnDestroy{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  isSuccess: boolean;
  loginName: string;
  errorMessage: string;
  loginImage: string;

  constructor(private _state:GlobalState,private _loginService:LoginService, private staffManageService:StaffManageService,private router:Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit(): void {
    this.getLoginImage();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  getLoginImage(){
    let loginData = new LoginData;
    loginData = JSON.parse(localStorage.getItem('data'));
    this.staffManageService.getStaffById(loginData.currentUser.staffId)
      .subscribe(
        res => {
          this.loginImage = res.data.staffImageUrl;
          if(!this.loginImage||this.loginImage == ''){
            this.loginImage = '../../../../assets/img/app/profile/Nasta.png'
          }
        },
        error =>  this.errorMessage = <any>error);
  }

  getLoginName(){
    let loginData = new LoginData;
    loginData = JSON.parse(localStorage.getItem('data'));
    this.loginName = loginData.currentUser.userName;
    return this.loginName;
  }

  public logout() {
    this._loginService.logout().subscribe(
      json => {
        this.isSuccess = json.success;
        localStorage.removeItem('data');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('leftMenus');
        if (this.isSuccess == true) {
          this.router.navigate(['/login']);
        }
      },
      error =>  this.errorMessage = <any>error);
  }

  onChangePassword():void {

      this.dynamicComponentLoader.loadComponent(ChangePasswordComponent, null);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe("change_password_state");
  }
}
