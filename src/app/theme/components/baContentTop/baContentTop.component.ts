import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {getPathsNames} from "./util";

declare let $: any;

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle: string = '';
  public breadcrumbs: string[];

  public isMenuCollapsed: boolean = false;
  public isScreenFull: boolean = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      this.breadcrumbs = getPathsNames(activeLink).filter(title => title);
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public toggleFullScreen() {
    this.isScreenFull = !this.isScreenFull;
    if (this.isScreenFull) {
      this.launchFullScreen(document);
    } else {
      this.exitFullScreen(document);
    }
  }

  public launchFullScreen(document) {
    let element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  public exitFullScreen(document) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  public refreshPage() {
    window.location.reload();
  }
}
