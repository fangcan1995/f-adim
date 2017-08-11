import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter,
  Input, OnInit, Output, ViewContainerRef,
} from '@angular/core';
import {TreePickerComponent} from "./tree-picker.component";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[tree-picker]',
  host: {
    '(click)': 'showPicker()',
  },
})
export class TreePickerDirective implements OnInit {

  @Input() data: any = [];
  @Input() title = '选择节点';
  @Input() filterText = '过滤节点';
  @Input() showFilter = true;
  @Input() isStatic: boolean = false;
  @Input() multiSelect: boolean = true;
  @Input() excludeFolders = true;
  @Input() selectParentCascade = false;
  @Output() notify = new EventEmitter();

  private el: HTMLInputElement;
  /* input element */
  private modalElement: HTMLElement;
  /* dropdown element */
  private componentRef: ComponentRef<TreePickerComponent>;
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

    let factory = this.resolver.resolveComponentFactory(TreePickerComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.modalElement = this.componentRef.location.nativeElement;

    // this.modalElement.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.data = this.data;
    component.multiSelect = this.multiSelect;
    component.excludeFolders = this.excludeFolders;
    component.selectParentCascade = this.selectParentCascade;
    component.isStatic = this.isStatic;
    component.title = this.title;
    component.showFilter = this.showFilter;
    component.filterText = this.filterText;
    component.select.subscribe((event) => {
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
