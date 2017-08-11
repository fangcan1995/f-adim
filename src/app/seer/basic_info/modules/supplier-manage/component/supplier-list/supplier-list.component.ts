import {ViewEncapsulation, Component, OnInit} from "@angular/core";
import {SupplierManageService} from "../../supplier-manage.service";
import {GlobalState} from "../../../../../../global.state";
import {Router} from "@angular/router";
import {DICT_DATA} from "../dictData";

/**
 * Created by Administrator on 2016/12/26.
 */
@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  providers: [SupplierManageService],
  styleUrls: ['./supplier-list.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierListComponent implements OnInit{
  title = '供应商列表';
  UPDATELIST = 'updateList';
  source = [];

  translate = DICT_DATA;

  titles = [
    {key:'supplierName', label:'供应商名称'},
    {key:'supplierNature', label:'企业性质'},
    {key:'supplierCode', label:'组织机构代码'},
    {key:'supplierTaxCode', label:'税号'},
    {key:'supplierTel', label:'公司电话'}
  ];

  titleOption =[
    {key:'supplierName', label:'供应商名称'},
    {key:'supplierNature', label:'企业性质'},
    {key:'supplierAddress', label:'公司地址'},
    {key:'supplierDcAddress', label:'库房地址'},
    {key:'supplierCode', label:'企业代码'},
    {key:'supplierTaxCode', label:'税号'},
    {key:'supplierBank', label:'开户银行'},
    {key:'supplierBankAccount', label:'银行账户'},
    {key:'supplierMail', label:'企业邮箱'},
    {key:'supplierWebsite', label:'公司网址'},
    {key:'supplierTel', label:'公司电话'},
    {key:'supplierState', label:'供应商状态'}
    // {key:'createUser', label:'创建人'},
    // {key:'createTime', label:'创建时间'},
    // {key:'operator', label:'更新人'},
    // {key:'operateTime', label:'更新时间'}
  ];

  constructor(private service: SupplierManageService, private _router: Router, private _state: GlobalState) {
    this._state.subscribe(this.UPDATELIST, (param) => {
      this.supplierList(param);
    });
  }

  /*初始化*/
  ngOnInit() {
    /*字典查询企业性质*/
    // this.service.getDictByKey("SUPPLIER_NATURE").then((result) => {
    //   this.translate = {supplierNature: result.data};
    let param = {};
    this.supplierList(param);
    // });
  }

  /*供应商列表*/
  supplierList(param) {
    this.service.searchSuppliers(param).then((result) => {
      this.source = result.data;
    });
  }

  onChange(message):void {
    if(message.type == 'add'){ //新增
      this._router.navigate(['/seer/basic/supplier-manage/add']);
    }
    if(message.type == 'update'){ //修改
      this._router.navigate(['/seer/basic/supplier-manage/edit', message.data.id]);
    }
    if(message.type == 'delete'){ //删除
      this.service.deleteSupplier(message.data.id).then((param) => {
        if (param.success) {
          let param = {};
          this.supplierList(param);
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      this.service.batchDeleteSupplier(ids).then((param) => {
        if (param.success) {
          let param = {};
          this.supplierList(param);
        }
      })
    }
  }

}
