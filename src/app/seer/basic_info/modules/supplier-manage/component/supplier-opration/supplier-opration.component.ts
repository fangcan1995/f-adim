import {ViewEncapsulation, Component, OnInit} from "@angular/core";
import {SupplierManageService} from "../../supplier-manage.service";
import {GlobalState} from "../../../../../../global.state";
/**
 * Created by Administrator on 2016/12/26.
 */
@Component({
  selector: 'supplier-opration',
  templateUrl: './supplier-opration.component.html',
  providers: [SupplierManageService],
  styleUrls: ['./supplier-opration.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierOprationComponent implements OnInit{
  title = '查询区域';
  UPDATELIST = 'updateList';
  supplierNature: string = '';
  supplierState: string = '';
  supplierNatureDict = [];
  supplierStateDict = [];

  constructor(private service: SupplierManageService, private _state: GlobalState){}

  ngOnInit(): void {
    /*字典查询企业性质*/
    this.service.getDictByKey("SUPPLIER_NATURE").then((result) => {
      this.supplierNatureDict = result.data;
    });
    /*字典查询供应商状态*/
    this.service.getDictByKey("SUPPLIER_STATE").then((result) => {
      this.supplierStateDict = result.data;
    });
  }

  /*查询*/
  searchSupplier() {
    let param = {"supplierNature": this.supplierNature, "supplierState": this.supplierState};
    this._state.notify(this.UPDATELIST, param);
  }

  /*重置*/
  reset() {
    this.supplierNature = "";
    this.supplierState = "";
    this.searchSupplier();
  }

}
