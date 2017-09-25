import {Directive, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[scroll-direction]'
})
export class ScrollDirection {

  @Input() public maxHeight:number;
  @Output() public onScroll:EventEmitter<any> = new EventEmitter<any>();

  private _lastScrollY:number;
  public ngOnInit():void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll():void {
    let { scrollY } = window;
    let direction = scrollY > this._lastScrollY ? 1 : 0;
    this._lastScrollY = scrollY;

    this.onScroll.emit({ direction, scrollY });
  }
}
