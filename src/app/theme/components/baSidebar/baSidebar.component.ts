import { Component, ViewChild, ElementRef, HostListener, ViewEncapsulation} from '@angular/core';
import { GlobalState } from '../../../global.state';
import * as _ from 'lodash';
import { layoutSizes } from "../../theme.constants";
import { resources2Menu } from '../../libs/resources2Menu';
import { ManageService } from '../../services';
import { getStorage } from '../../libs/utils'
@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html',
  styleUrls: ['./baSidebar.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaSidebar {

  // here we declare which routes we want to use as a menu in our sidebar
  public routes = []; // we're creating a deep copy since we are going to change that object

  public menuHeight:number;
  public isMenuCollapsed:boolean = false;
  public isMenuShouldCollapsed:boolean = false;
  private _offsetTop: number;
  private _defaultTop:number;
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(
    private _elementRef:ElementRef,
    private _state:GlobalState,
    private _manageService: ManageService
  ) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this._state.subscribe('menu.changed',() => {
      this._manageService.getResourcesFromLocal()
      .then(res => {
        if ( res.code == 0 ) {
          this.routes = resources2Menu(res.data);
        }
      })
    })
  }

  public ngOnInit():void {
    this._manageService.getResourcesFromLocal()
    .then(res => {
      if ( res.code == 0 ) {
        this.routes = resources2Menu(res.data);
      }
    })
    this._defaultTop = this.sidebar.nativeElement.offsetTop; 
    this._offsetTop = this._defaultTop;
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  public ngAfterViewInit():void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize():void {

    var isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand():void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse():void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed:boolean):void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight():void {
    // TODO: get rid of magic 42 constant
    //魔数42：一条菜单的高度
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 42;
  }

  private _shouldMenuCollapse():boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
  public handleScroll({ direction, scrollY }) {
    if ( scrollY > this._defaultTop ) {
      scrollY = this._defaultTop;
    }
    this._offsetTop = this._defaultTop - scrollY;
  }
}
