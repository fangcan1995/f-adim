import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from "@angular/router";
import { DynamicComponentLoader } from "../../directives/dynamicComponent/dynamic-component.directive";
import { LoginData } from "../../../seer/model/LoginData";
import { StaffService } from "../../../seer/basic-info/staff/staff.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    StaffService,
  ],
})
export class BaPageTop implements OnInit{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public isScrolled:boolean = false;
  isSuccess: boolean;
  loginName: string;
  errorMessage: string;
  loginImage: string;

  constructor(
    private staffManageService:StaffService,
    private router:Router
    ) {
  }
  ngOnInit(): void {
    this.getLoginImage();
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  getLoginImage(){
  }

  getLoginName(){
    return this.loginName;
  }

  public logout() {
  }

  onChangePassword():void {

  }
}
