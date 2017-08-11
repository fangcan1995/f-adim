import {
  Directive, Input, OnInit, ViewContainerRef, OnChanges, SimpleChanges,
} from '@angular/core';

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[fv]',
})
export class FormValidatorDirective implements OnChanges {
  private el: HTMLInputElement;
  INVALID = "ng-invalid";
  @Input('ngModel') ngModel: any;
  @Input() message:string;

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(()=>{
      if(this.el.classList.contains(this.INVALID)){
        this.el.setCustomValidity(this.message?this.message:this.el.validationMessage);
      }else {
       this.el.setCustomValidity('');
      }
    },0)
  }



  constructor(private viewContainerRef: ViewContainerRef,) {
    this.el = this.viewContainerRef.element.nativeElement;
  }
}
