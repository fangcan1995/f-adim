import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter,
  Input, OnInit, Output, ViewContainerRef,
} from '@angular/core';
import {MultiPickerComponent} from "./multi-picker.component";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[multi-picker]',
  host: {
    '(click)': 'showPicker()',
  },
})
export class MultiPickerDirective implements OnInit {

  @Input() data: any = [];
  @Input() size:'sm'|'lg'|undefined;
  @Input() titles: any = [];
  @Input() title: string;
  @Input() hideFilter: boolean = false;
  @Input() hideColonnes: boolean = false;
  @Input() titlesOptional: any = [];
  @Input() isStatic: boolean = false;
  @Output() notify = new EventEmitter();

  private el: HTMLInputElement;
  /* input element */
  private modalElement: HTMLElement;
  /* dropdown element */
  private componentRef: ComponentRef<MultiPickerComponent>;
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

    let factory = this.resolver.resolveComponentFactory(MultiPickerComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.modalElement = this.componentRef.location.nativeElement;

    // this.modalElement.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.data = this.data;
    component.size = this.size;
    component.title = this.title;
    component.titles = this.titles;
    component.hideColonnes = this.hideColonnes;
    component.hideFilter = this.hideFilter;
    component.titlesOptional = this.titlesOptional;
    component.isStatic = this.isStatic;
    component.change.subscribe((event) => {
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
