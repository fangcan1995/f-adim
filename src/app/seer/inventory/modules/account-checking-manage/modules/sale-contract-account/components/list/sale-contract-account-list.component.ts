import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {SaleContractAccountService} from "../../sale-contract-account.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../../../global.state";
/**
 * Created by Administrator on 2017/3/1.
 */
@Component({
  selector: 'sale-contract-account-list',
  templateUrl: './sale-contract-account-list.component.html',
  providers: [SaleContractAccountService],
  styleUrls: ['../../sale-contract-account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleContractAccountListComponent implements OnInit{

  SEARCHCONTRACTACCOUNT = 'searchContractAccount';

  source = [];
  titles = [
    {key:'reconciliationNum', label:'对账编号'},
    {key:'customerStoreName', label:'门店名称'},
    {key:'brandName', label:'品牌名称'},
    {key:'orderAmount', label:'订单总金额(元)'},
    {key:'contractRebate', label:'合同返利(%)'},
    {key:'reconcicliationAmount', label:'对账总金额(元)'}
  ];

  editPageUrl = '/seer/inventory/account-checking-manage/sale-contract-account/add';

  constructor(private service: SaleContractAccountService, private _router: Router,
              private _state: GlobalState) {
    this._state.subscribe(this.SEARCHCONTRACTACCOUNT, (param) => {
      this.contractAccountList(param);
    });
  }

  ngOnInit() {
    let param = {};
    this.contractAccountList(param);
  }

  /*订单信息列表*/
  contractAccountList(param) {
    this.service.searchContractAccount(param).then((result) => {
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
      this.service.deleteContractAccount(message.data.id).then((param) => {
        if (param.success) {
          let param = {};
          this.contractAccountList(param);
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      this.service.batchDeleteContractAccount(ids).then((param) => {
        if (param.success) {
          let param = {};
          this.contractAccountList(param);
        }
      })
    }
  }

}
