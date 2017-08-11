import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../../../global.state";
import {SaleAccountService} from "../../sale-account.service";
/**
 * Created by Administrator on 2017/2/20.
 */
@Component({
  selector: 'sale-account-list',
  templateUrl: './sale-account-list.component.html',
  providers: [SaleAccountService],
  styleUrls: ['../../sale-account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleAccountListComponent implements OnInit{

  SEARCHCONTRACTACCOUNT = 'searchContractAccount';

  source = [];
  titles = [
    {key:'reconciliationNum', label:'对账编号'},
    {key:'customerStoreName', label:'门店名称'},
    {key:'brandName', label:'品牌名称'},
    {key:'orderAmount', label:'订单总金额(元)'},
    {key:'costAmount', label:'费用总金额(元)'},
    {key:'reconcicliationAmount', label:'对账总金额(元)'}
  ];

  editPageUrl = '/seer/inventory/account-checking-manage/sale-account/add';

  constructor(private service: SaleAccountService, private _router: Router,
              private _state: GlobalState) {
    this._state.subscribe(this.SEARCHCONTRACTACCOUNT, (param) => {
      this.saleAccountList(param);
    });
  }

  ngOnInit() {
    let param = {};
    this.saleAccountList(param);
  }

  /*销售订单信息列表*/
  saleAccountList(param) {
    this.service.searchSaleAccount(param).then((result) => {
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
      this.service.deleteSaleAccount(message.data.id).then((param) => {
        if (param.success) {
          let param = {};
          this.saleAccountList(param);
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      this.service.batchDeleteSaleAccount(ids).then((param) => {
        if (param.success) {
          let param = {};
          this.saleAccountList(param);
        }
      })
    }
  }

}
