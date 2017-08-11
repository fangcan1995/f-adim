import {
  Input,
  Output,
  Component,
  ElementRef,
  ViewEncapsulation,
  EventEmitter,
  ViewChild, HostListener
} from '@angular/core';
import {ModalComponent} from "../../../theme/components/ng2-bs4-modal/modal";
import {seerTableComponent} from "../seer_table/seer.table";

/**
 * show a selected date in monthly calendar
 */
@Component({
  selector: 'multi-picker',
  templateUrl: './multi-picker.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MultiPickerComponent {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();

  data = [];
  size = '';
  title = '选择商品';
  titles = [];
  titlesOptional = [];
  isStatic = false;
  hideFilter = false;
  hideColonnes = false;

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(seerTableComponent) seerTable:seerTableComponent;

  public el: HTMLElement; // this component element

  public constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  public onChange($event) {
    this.change.emit($event);
  };

  onClickOutside($event) {
    if (!this.isStatic) {
      this.close($event);
    }
  }

  close($event?) {
    if ($event) {
      $event.stopPropagation();
    }
    this.modal.hide();
    setTimeout(() => this.destroy.emit(true), 150);
  }

  clearAll(){
    this.change.emit({type:'clear_all',data:[]});
    this.close();
  }

  save(){
    this.seerTable.selectItem();
    this.close();
  }
}
