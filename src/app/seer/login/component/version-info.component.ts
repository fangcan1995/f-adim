import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {
  BaseModalComponent,
  DynamicComponentLoader
} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../theme/components/ng2-bs4-modal/modal";
import {GlobalState} from "../../../global.state";


@Component({
  selector: 'version-info',
  templateUrl: './version-info.component.html',
  styleUrls: ['./style.scss'],
  styles: [
    `.input-group-btn{
      font-size: 14px;
    }`,
    `.input-group-btn > .btn{
        height: 35px;
        margin-left: -1px !important;
    }`],
  encapsulation: ViewEncapsulation.None,

})
export class VersionInfoComponent  extends BaseModalComponent implements OnInit{

  /**
   * 1.找到modal组件
   */
  @ViewChild(ModalComponent) modal;

  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  title : string = "版本详情";

  constructor(private gs?:GlobalState) {
    super();
  }

  ngOnInit() {


  }

}

