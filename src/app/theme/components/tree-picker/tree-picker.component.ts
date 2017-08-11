import {
  Input,
  Output,
  Component,
  ElementRef,
  ViewEncapsulation,
  EventEmitter,
  ViewChild, OnInit
} from '@angular/core';
import {ModalComponent} from "../ng2-bs4-modal/modal";
import {SeerTree} from "../../modules/seer-tree/seer-tree/seer-tree.component";
import {TREE_PERMISSIONS} from "../../modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../modules/seer-tree/constants/events";

/**
 * show a selected date in monthly calendar
 */
@Component({
  selector: 'tree-picker',
  templateUrl: './tree-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  styles:[`
.input-group-btn{
   font-size: 14px;
 }
.input-group-btn > .btn{
   height: 35px;
   margin-left: -1px !important;

 }
`]
})
export class TreePickerComponent {





  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();

  data = [];
  title = '选择节点';
  multiSelect = false;
  showFilter = true;
  filterText = '筛选节点';
  excludeFolders = true;
  selectParentCascade = false;
  isStatic = false;
  permission = TREE_PERMISSIONS.NOTIFY|(this.multiSelect?TREE_PERMISSIONS.MULTI_SELECT:0)|(this.selectParentCascade?TREE_PERMISSIONS.SELECT_PARENT_CASCADE:0)|(this.showFilter?TREE_PERMISSIONS.SHOW_FILTER:0);

  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild(SeerTree) seerTree: SeerTree;

  public el: HTMLElement; // this component element

  public constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  public onChange($event) {
    switch ($event.eventName){
      case TREE_EVENTS.onActiveChanged:
        this.select.emit($event);
    }
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
    this.select.emit({eventName:'onSelectCompleted',data:[]});
    this.close();
  }

  save(){
    this.select.emit({eventName:'onSelectCompleted',data:this.seerTree.getSelectedNodes(this.excludeFolders)});
    if(this.seerTree.getSelectedNodes(this.excludeFolders).length>0) {
      this.close();
    }else {
      alert('请选择一个叶节点');
    }
  }
}
