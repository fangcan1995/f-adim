import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router, Route, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {BaMenuService} from './baMenu.service';
import {GlobalState} from '../../../global.state';
import * as _ from 'lodash';
declare type Routes = Route[];

@Component({
  selector: 'ba-menu',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./baMenu.scss'],
  templateUrl: './baMenu.html',
  providers: [BaMenuService]
})
export class BaMenu {

  @Input() menuRoutes:Routes = [];
  @Input() sidebarCollapsed:boolean = false;
  @Input() menuHeight:number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems:any[];
  public showHoverElem:boolean;
  protected _onRouteChange:Subscription;
  public outOfArea:number = -200;
  public isMenuCollapsed:boolean = false;
  constructor(
    private _router:Router,
    private _service:BaMenuService,
    private _state:GlobalState
    ) {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }
  public selectMenuAndNotify():void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit():void {
    this.menuItems = this._service.convertRoutesToMenus(_.cloneDeep(this.menuRoutes || []));
    this.selectMenuAndNotify();
  }
  public ngOnChanges(): void {
      this.menuItems = this._service.convertRoutesToMenus(_.cloneDeep(this.menuRoutes || []));
      this.selectMenuAndNotify();
  }
  public ngOnDestroy():void {
    this._onRouteChange.unsubscribe();
  }

  public hoverItem($event):void {
  }

  public toggleSubMenu($event):boolean {
    var submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
