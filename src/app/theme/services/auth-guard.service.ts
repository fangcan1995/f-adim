import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { AuthService } from './auth.service';

import { parseQueryString, getStorage } from '../libs/utils';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router, private location: Location) {}

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
