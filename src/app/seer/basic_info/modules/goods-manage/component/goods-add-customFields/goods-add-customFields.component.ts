import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
/**
 * Created by Administrator on 2017/1/10.
 */
@Component({
  selector: 'goods-add-customFields',
  styleUrls: ['../goods-add/goods-add.scss'],
  templateUrl: './goods-add-customFields.component.html'
})
export class GoodsCustomFieldsDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  title: string = "新增自定义字段";
  SAVECUSTOMFIELDSEVENT = "saveCustomFields";
  customFields = {
    id: this.uuid(),
    fieldsName: "",
    fieldsType: "",
    fieldsValue: ""
  };

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: GoodsManageService, private _state: GlobalState) {
    super();
  }

  ngOnInit(){}

  onSave():void {
    this.closeModal();
    this._state.notify(this.SAVECUSTOMFIELDSEVENT, this.customFields); //触发修改发放
  }

  uuid() : string {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

}
