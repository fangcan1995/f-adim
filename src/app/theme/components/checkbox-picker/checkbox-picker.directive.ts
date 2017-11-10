import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter,
  Input, OnInit, Output, ViewContainerRef,
} from '@angular/core';
import {CheckboxPickerComponent} from "./checkbox-picker.component";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[checkbox-picker]',
  host: {
    '(click)': 'showPicker()',
  },
})
export class CheckboxPickerDirective implements OnInit {

  @Input() data: any = [];
  @Input() labelField: string = 'name';
  @Input() isCheckedField: string = 'isChecked';
  @Input() isHiddenField: string = 'isHidden';
  @Input() size:'sm'|'lg'|undefined;
  @Input() title: string = '请选择';
  @Input() pageSize: number = 15;
  @Input() isStatic: boolean = false;
  @Input() showFilter: boolean = false;
  @Output() notify = new EventEmitter();

  public el: HTMLInputElement;
  /* input element */
  public modalElement: HTMLElement;
  /* dropdown element */
  public componentRef: ComponentRef<CheckboxPickerComponent>;
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

    let factory = this.resolver.resolveComponentFactory(CheckboxPickerComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.modalElement = this.componentRef.location.nativeElement;

    // this.modalElement.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.data = this.data;
    component.labelField = this.labelField;
    component.isCheckedField = this.isCheckedField;
    component.isHiddenField = this.isHiddenField;
    component.size = this.size;
    component.pageSize = this.pageSize;
    component.title = this.title;
    component.isStatic = this.isStatic;
    component.showFilter = this.showFilter;
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
