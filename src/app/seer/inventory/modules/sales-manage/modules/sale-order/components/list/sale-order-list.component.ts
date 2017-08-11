import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SaleOrderService} from "../../sale-order.service";
import {GlobalState} from "../../../../../../../../global.state";
import {DICT_DATA} from "../dictData";
/**
 * Created by Administrator on 2017/1/13.
 */
@Component({
  selector: 'sale-order-list',
  templateUrl: './sale-order-list.component.html',
  providers: [SaleOrderService],
  styleUrls: ['../../sale-order.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleOrderListComponent implements OnInit{

  source = [];

  titles = [
    {key:'customerName', label:'客户名称'},
    {key:'storeName', label:'门店名称'},
    {key:'soNum', label:'销售编号',},
    {key:'soCategory', label:'销售分类',},
    {key:'soTotalAmount', label:'销售金额',},
    {key:'staffName', label:'销售人员',},
    {key:'soState', label:'订单状态',}
  ];

  UPDATESALEORDERLIST = 'updateSaleOrderList';

  translate = DICT_DATA;

  /** 订单类型 */
  soType = '00';

  editPageUrl = '/seer/inventory/sales-manage/sales-order-manage/add';

  constructor(private service: SaleOrderService, private _router: Router, private _state: GlobalState) {
    this._state.subscribe(this.UPDATESALEORDERLIST, (param) => {
      this.saleOrderList(param);
    });
  }

  ngOnInit() {
    let param = {"soType": this.soType};
    this.saleOrderList(param);
  }

  /*销售订单信息列表*/
  saleOrderList(param) {
    this.service.searchSaleOrder(param).then((result) => {
      this.source = result.data;
    });
  }

  onChange(message):void {
    if(message.type == 'add'){ //新增
      this._router.navigate([this.editPageUrl]);
    }
    if(message.type == 'update'){ //修改
      this._router.navigate([this.editPageUrl, message.data.id]);
    }
    if(message.type == 'delete'){ //删除
      this.service.deleteSaleOrder(message.data.id).then((param) => {
        if (param.success) {
          let param = {"soType": this.soType};
          this.saleOrderList(param);
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      this.service.batchDeleteSaleOrder(ids).then((param) => {
        if (param.success) {
          let param = {"soType": this.soType};
          this.saleOrderList(param);
        }
      })
    }
  }

}
