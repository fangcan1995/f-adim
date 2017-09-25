import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
  OnInit,
  ElementRef
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
  @ViewChild('pageTop') pageTop: ElementRef;
  dynamicComponentLoader: DynamicComponentLoader;

  public isScrolled:boolean = false;
  isSuccess: boolean;
  loginName: string;
  errorMessage: string;
  loginImage: string;
  activePageTitle: string;
  activePageIcon: string;
  isHidden: boolean;
  _offsetTop:number;
  constructor(
    private staffManageService:StaffService,
    private router:Router,
    private _state: GlobalState
    ) {

    this._state.subscribe('menu.activeLink', (activeLink) => {
      console.log(activeLink)
      if ( !activeLink || !activeLink.route || !activeLink.route.paths ) {
        this.activePageTitle = '';
        this.activePageTitle = null;

      } else {
        this.activePageTitle = activeLink.title;
        this.activePageIcon = this._getActivePageIcon(activeLink);
      }
    });
  }
  ngOnInit(): void {
    this.getLoginImage();
  }
  private _getActivePageIcon(activeLink) {
    if ( !activeLink.icon && !activeLink.parent ) {
        return null;
    } else if ( !activeLink.icon && activeLink.parent ) {
      return this._getActivePageIcon(activeLink.parent);
    } else {
      return activeLink.icon;
    }
  }
  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  public handleScroll({ direction, scrollY }) {
    let { offsetTop, offsetHeight } = this.pageTop.nativeElement;
    this._offsetTop = -scrollY
    if ( scrollY > offsetTop + offsetHeight ) {
      scrollY = offsetTop + offsetHeight;
      this.isHidden = !!direction
    } else {
      this.isHidden = false
    }

    this._offsetTop = -scrollY
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
