import { Component, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'seer-content-top',
  templateUrl: './seer-content-top.component.html',
  styleUrls: [ './seer-content-top.component.scss' ],
})
export class SeerContentTopComponent{
  @ViewChild('contentTop') contentTop:ElementRef;
  private _offsetTop:number;
  private _defaultTop:number;
  constructor() {}

  ngAfterViewInit() {
  	this._defaultTop = this.contentTop.nativeElement.offsetTop;
  }
  public handleScroll({ direction, scrollY }) {
    
    if ( scrollY > this._defaultTop ) {
    	scrollY = this._defaultTop;
    }
    this._offsetTop = -scrollY;
  }
}