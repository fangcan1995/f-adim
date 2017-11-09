import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import { GlobalState } from '../../../global.state';
@Component({
  selector: 'seer-content-top',
  templateUrl: './seer-content-top.component.html',
  styleUrls: [ './seer-content-top.component.scss' ],
})
export class SeerContentTopComponent {
  @ViewChild('contentTop') contentTop:ElementRef;
  @Input() fixedTop:boolean = true;
  public _offsetTop:number;
  public _defaultTop:number;
  constructor(
    private _state: GlobalState) {}

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
    this._state.notify('contentTop.fixed', this.fixedTop);
  }
  ngOnDestroy() {
    this._state.notify('contentTop.fixed', false);
  }
}