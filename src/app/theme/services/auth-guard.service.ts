import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route,
  ActivatedRoute
} from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { GlobalState } from '../../global.state';
import { SeerMessageService } from './seer-message.service'
import { parseQueryString, getStorage } from '../libs/utils';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  loginTimeout$ = new Subject;
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private _messageService: SeerMessageService,
    private _state: GlobalState,
    private _route:ActivatedRoute
    ) {
     
    this._state.subscribe('auth.loginTimeout', res => {
      this.loginTimeout$.next();
    })
    this.loginTimeout$.debounceTime(300)
    .subscribe(res => {
      this._messageService.open({
        message: '登录超时，请重新登录',
        icon: '',
        autoHideDuration: 3000,
      })
      .onClose()
      .subscribe(res => {
        this.authService.isLoggedIn = false;
        this.authService.logout()
        .subscribe(this.redirectToLogin.bind(this));
      })
    })
  }
  redirectToLogin() {
    let url = location.pathname;
    this.authService.redirectUrl = url;
    let oldQueryString = location.search;
    let oldQueryParams = parseQueryString(oldQueryString);
    this.authService.redirectSearch = oldQueryParams;
    this.router.navigate(['/login']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = `${location.pathname}`;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url: string = `${location.pathname}`;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if ( this.authService.isLoggedIn || getStorage({ key: 'token' }) ) return true;
    this.authService.redirectUrl = url;
    let oldQueryString = location.search;
    let oldQueryParams = parseQueryString(oldQueryString);
    this.authService.redirectSearch = oldQueryParams;

    // redirectFragment 暂时不添加进跳转链接

    /*// Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };*/

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
