import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter,
  Input, OnInit, Output, ViewContainerRef,
} from '@angular/core';
import {SaveDialogComponent} from "./save-dialog.component";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[save-dialog]',
  host: {
    '(click)': 'showPicker()',
  },
})
export class SaveDialogDirective implements OnInit {

  @Input() orderId:string;
  @Input() processKey:string;
  @Input() isDraftNow:boolean;
  @Input() canDirect:boolean;
  @Input() isStatic: boolean;
  @Output() notify = new EventEmitter();

  private el: HTMLInputElement;
  /* input element */
  private modalElement: HTMLElement;
  /* dropdown element */
  private componentRef: ComponentRef<SaveDialogComponent>;
  /* dropdown component reference */

  constructor(private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    this.el.parentElement.insertBefore(this.el, this.el.nextSibling);
  }

  //show datetimePicker element below the current element
  showPicker(event?) {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    let factory = this.resolver.resolveComponentFactory(SaveDialogComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.modalElement = this.componentRef.location.nativeElement;

    // this.modalElement.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.isStatic = this.isStatic;
    component.isDraftNow = this.isDraftNow;
    component.orderId = this.orderId;
    component.processKey = this.processKey;
    component.canDirect = this.canDirect;
    component.save.subscribe((event) => {
      this.notify.emit(event);
    });
    component.destroy.subscribe(() => {
      this.hide();
    });
  }

  hide = (event?): void => {
    if (this.componentRef) {
      /* invoked by clicking on somewhere in document */
      if (event && event.type === 'click' && event.target !== this.el) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      } else if (!event) {  /* invoked by function call */
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
      event && event.stopPropagation();
    }
  };
}
