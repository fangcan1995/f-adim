import {Component, OnInit, ViewChild} from "@angular/core";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
import {Terminal} from "../../../../../model/basic_info/terminal";
/**
 * Created by Administrator on 2017/1/5.
 */
@Component({
  selector: 'goods-terminal-dialog',
  styleUrls: ['../goods-add/goods-add.scss'],
  templateUrl: './goods-terminal-dialog.html'
})
export class GoodsTerminalDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  SAVETERMINALEVENT = 'saveTerminal';
  EDITTERMINALEVENT = 'editTerminal';
  title: string;
  buttonFlag = true;
  flag: string;
  terminal: Terminal = new Terminal();
  terminalSource = [];

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: GoodsManageService, private _state: GlobalState) {
    super();
  }

  ngOnInit(){
    this.title = this.data.title;
    this.flag = this.data.flag;
    if (this.flag == '1') {
      this.terminal = this.data.terminal;
      this.buttonFlag = false;
      this.terminalSource = this.data.terminalSource;
    }
  }

  onSave(): void {
    let terminalId = this.uuid();
    let terminalJSON = {
      id: terminalId,
      terminalName: this.terminal.terminalName,
      terminalCode: this.terminal.terminalCode,
      terminalPrice: this.terminal.terminalPrice,
      // variableValenceTheme: this.terminal.variableValenceTheme,
      // variableValenceAmount: this.terminal.variableValenceAmount,
      // variableValencePrice: this.terminal.variableValencePrice,
      // variableValenceTime: this.terminal.variableValenceTime
    };
    this.closeModal();
    this._state.notify(this.SAVETERMINALEVENT, terminalJSON); //触发新增发放
  }

  onEdit(): void {
    let terminalId = this.terminal.id;
    for (let data of this.terminalSource) {
      if (data.id == terminalId) {
        data.terminalName = this.terminal.terminalName;
        data.terminalCode = this.terminal.terminalCode;
        data.terminalPrice = this.terminal.terminalPrice;
        // data.variableValenceTheme = this.terminal.variableValenceTheme;
        // data.variableValenceAmount = this.terminal.variableValenceAmount;
        // data.variableValencePrice = this.terminal.variableValencePrice;
        // data.variableValenceTime = this.terminal.variableValenceTime;
      }
    }
    this.closeModal();
    this._state.notify(this.EDITTERMINALEVENT, this.terminalSource); //触发修改发放
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
