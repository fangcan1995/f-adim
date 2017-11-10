import {
  Input,
  Output,
  Component,
  ElementRef,
  ViewEncapsulation,
  EventEmitter,
  ViewChild, HostListener, OnInit
} from '@angular/core';
import {ModalComponent} from "../ng2-bs4-modal/modal";
import * as _ from 'lodash';
interface Event{type:string,data?:any}

/**
 * show a selected date in monthly calendar
 */
@Component({
  selector: 'checkbox-picker-component',
  templateUrl: './checkbox-picker.component.html',
  styles:[`.filter {
  color: #666666;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  box-shadow: none;
  font-size: 14px;
  display: block;
  padding: .5rem .75rem;
  line-height: 1.25;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  width: 180px;
}
.btn:hover{
  box-shadow:none;
}

.btn{
  margin-left: 0 !important;
}

.btn-group{
    margin-top: 10px;
}`]
})
export class CheckboxPickerComponent{

  @Output() change: EventEmitter<Event> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();

  data = [];
  size = '';
  title;
  isStatic = false;
  showFilter = false;
  labelField: string;
  isCheckedField: string;
  isHiddenField: string;
  pageSize: number;
  public currentPage = 0;
  public Math = Math;
  @ViewChild(ModalComponent) modal: ModalComponent;

  public onChange(item) {
    item[this.isCheckedField] = !item[this.isCheckedField];
    this.change.emit({type:'toggle',data:item});
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
    this.change.emit({type:'select',data:this.data.filter(item=>item[this.isCheckedField])});
    this.close();
  }

  public turn2Page(pageNum){
    this.currentPage = pageNum;
  }

  public filterData(text){
    if(!text){
      this.data.map((item)=>{
        item[this.isHiddenField] = false;
      })
    }else {
      this.data.map((item) => {
        item[this.isHiddenField] = item[this.labelField].indexOf(text) == -1;
      })
    }
  }

  public hideItem = (item)=>{
    return !item[this.isHiddenField];
  }
}
