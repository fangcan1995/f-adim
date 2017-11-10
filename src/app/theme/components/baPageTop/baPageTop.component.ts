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
import { ManageService } from '../../services/manage.service';
import { AuthService } from '../../services/auth.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop implements OnInit {

  @ViewChild('pageTop') pageTop: ElementRef;
  @ViewChild('modal') modal: ModalDirective;
  public isScrolled:boolean = false;
  isSuccess: boolean;
  loginName: string;
  errorMessage: string;
  loginImage: string;
  activePageTitle: string;
  activePageIcon: string;
  isHidden: boolean;
  _offsetTop:number;
  user: any = {};
  constructor(
    private router: Router,
    private _state: GlobalState,
    private _manageService: ManageService,
    private _authService: AuthService,
    ) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
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
    this._manageService.getUserFromLocal()
    .then(res => {
      this.user = res.data || {};
    })
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
  public logout($event) {
    $event.preventDefault();
    this._authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }


  showModal($event) {
    $event.preventDefault();
    this.modal.show();
  }
  handleModalShown() {

  }
  handleModalHide() {
    
  }
}
