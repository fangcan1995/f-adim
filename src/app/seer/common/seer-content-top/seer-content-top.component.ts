import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
@Component({
  selector: 'seer-content-top',
  templateUrl: './seer-content-top.component.html',
  styleUrls: [ './seer-content-top.component.scss' ],
})
export class SeerContentTopComponent{
  @ViewChild('contentTop') contentTop:ElementRef;
  @Input() fixedTop:boolean = true;
  private _offsetTop:number;
  private _defaultTop:number;
  constructor() {}

  ngAfterViewInit() {
  	this._defaultTop = this.contentTop.nativeElement.offsetTop;
  }
  public handleScroll({ direction, scrollY }) {
    if ( !this.fixedTop ) return this._offsetTop = undefined;
    if ( scrollY > this._defaultTop ) {
    	scrollY = this._defaultTop;
    }
    this._offsetTop = -scrollY;
  }
  ngOnInit() {
    if ( this.fixedTop ) {
      document.getElementsByClassName('al-content')[0].classList.add('fixedContentTop')
    } else {
      document.getElementsByClassName('al-content')[0].classList.remove('fixedContentTop')
    }
    
  }
  ngOnDestroy() {
    document.getElementsByClassName('al-content')[0].classList.remove('fixedContentTop')
  }
}