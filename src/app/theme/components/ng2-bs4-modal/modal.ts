import {Component, Input, HostBinding, ViewEncapsulation, Output, HostListener} from '@angular/core';
import {BaseDynamicComponent} from "../../directives/dynamicComponent/dynamic-component.directive";

@Component({
  selector: 'modal',
  host: {
    'class': 'modal',
    '[class.in]': 'inAnimation',
    'role': 'dialog',
    'tabindex': '-1',
    'style': 'display:block; '
  },
  template: `
        <div class="modal-dialog" [ngClass]="{ 'modal-sm': isSmall(), 'modal-lg': isLarge() }" (clickOutside)="destroyComponent()">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
  styles: [
`.backdrop{
    background-color:rgba(100,100,100,0.5);
    }`,
  ],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

  public overrideSize: string = null;

  @Input() componentInstance: BaseDynamicComponent;
  @Input() animation: boolean = true;
  @Input() backdrop: boolean = true;
  @Input() size: 'sm'|'lg';

  @HostBinding('class.fade') get fadeClass(): boolean {
    return this.animation;
  }

  public inAnimation = false;

  @HostBinding('class.backdrop') get backdropClass(): string | boolean {
    return this.backdrop;
  }

  constructor() {
    setTimeout(() => this.inAnimation = true, 10)
  }

  public isSmall() {
    return this.overrideSize !== ModalSize.Large
      && this.size === ModalSize.Small
      || this.overrideSize === ModalSize.Small;
  }

  public isLarge() {
    return this.overrideSize !== ModalSize.Small
      && this.size === ModalSize.Large
      || this.overrideSize === ModalSize.Large;
  }

  hide(){
    this.inAnimation = false;
  }

  show(){
    this.inAnimation = true;
  }

  destroyComponent(){
    if (this.componentInstance){
      if(!this.animation){
        this.componentInstance.onDestroy();
      }else {
        this.hide();
        //魔数：css的动画时间，动画结束就销毁
        setTimeout(()=>{
          this.componentInstance.onDestroy();
        }, 150);
      }
    }
  }
}

export class ModalSize {
  static Small = 'sm';
  static Large = 'lg';
}
