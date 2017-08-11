import {Component, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";

import {Router} from "@angular/router";
import {ShippingListManageService} from "../shippinglist-manage.service";
import {GlobalState} from "../../../../../../../../global.state";
import {
  DynamicComponentParam,
  DynamicComponentLoader
} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {CustomerStoreDialogComponent} from "../customer-store-dialog/customerstore-added-dialog.component";
import {CustomerDialogComponent} from "../customer-dialog/customer-dialog.component";



@Component({
  selector: 'shippinglist-list',
  templateUrl: './shippinglist-list.component.html',
  providers: [ShippingListManageService],
  styleUrls: ['./shippinglist-list.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [CustomerStoreDialogComponent,CustomerDialogComponent]
})


export class ShippingListComponent implements OnInit{


  resource = [];
  data = [];

  constructor(
    protected service: ShippingListManageService,private _router: Router,private _state:GlobalState) {
      this.getAllDate();

    /*弹出新增、修改页面订阅事件*/
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });


  }


  ngOnInit() {
    this._state.subscribe('search-shippinglist-list',param=> {

        // "customerinfo": this.shippinglist.customerinfo,
        // "customerStoreId": this.shippinglist.customerStoreId,
        // "staffId": this.shippinglist.staffId,
        // "startData": this.shippinglist.startData,
        // "endData": this.shippinglist.endData,
        // "acceptState": this.shippinglist.acceptState,

      console.log(param);

      if (param.customerinfo || param.customerStoreId || param.staffId || param.startData || param.endData || param.acceptState) {
        this.getDateByCondition(param);
      }else {
        this.getDateByCondition(param);
        //this.getAllDate();
      }
    });
  }

  getAllDate() {
    this.service.getShipping().then((data) => {
      console.log(data.data);
      this.data = data.data;
    });
  }

  getDateByCondition(condition:any) {
    this.service.searchShipping(condition).then((data) => {

      console.log(data.data);
      this.data = data.data;
    });
  }

  titles = [
    {
      key:'customerName',
      label:'门店系统',
      type: 'link',
    },
    {
      key:'customerStoreName',
      label:'门店名称',
      type: 'link',
    },
    {
      key:'soNum',
      label:'销售订单号',
      type: 'link',
    }
    ,
    {
      key:'staffName',
      label:'销售人员'
    }
    ,
    {
      key:'soTotalAmount',
      label:'总定金'
    }
    ,
    {
      key:'acceptState',
      label:'验收'
    }
    // ,
    // {
    //   key:'isDelete',
    //   label:'删除标识'
    // }
    // ,
    // {
    //   key:'createTime',
    //   label:'创建时间'
    // }
  ];


  titleOption = [
    {
      key:'customerStoreId',
      label:'门店系统'
    },
    {
      key:'customerStoreName',
      label:'门店名称'
    },
    {
      key:'soNum',
      label:'销售订单号'
    }

    ,
    {
      key:'staffId',
      label:'销售人员'
    }
    ,
    {
      key:'soTotalAmount',
      label:'总定金'
    }
    ,
    {
      key:'acceptState',
      label:'验收'
    }
    ,
    {
      key:'isDelete',
      label:'删除标识'
    }
    ,
    {
      key:'createTime',
      label:'创建时间'
    }
    ,
    {
      key:'createUser',
      label:'创建人'
    }
    ,
    {
      key:'operateTime',
      label:'更新时间 '
    },

    {
      key:'operator',
      label:'更新人'
    }
  ];


  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }


  EVENT = 'openCustomerAddedDialog';
  /*弹出新增客户门店模态窗口*/
  popupAdd(customerId,storeId): void {
    //alert("popupAdd");
    let param: DynamicComponentParam = {component: CustomerStoreDialogComponent, data: {title:'门店详细', flag: storeId ,customerId:customerId } };
    this._state.notify(this.EVENT, param);
  }


  /*弹出客户门店模态窗口*/
  popupCustomerAdd(customerId): void {
    //alert("popupAdd");
    let param: DynamicComponentParam = {component: CustomerDialogComponent, data: {title:'客户详细', flag: customerId} };
    this._state.notify(this.EVENT, param);
  }



  onChange(message):void {

    if(message.type=='link'){
      //alert(message.key);
      if (message.key ==  'customerStoreName') {
        console.log(message.data);
        this.popupAdd(message.data.customerId,message.data.storeId);
      }
      if (message.key ==  'customerName'){
        console.log(message.data);
        this.popupCustomerAdd(message.data.customerId);
      }
      //console.log(message.data);
    }

    if(message.type=='add'){
      //alert("add");
      this._router.navigate(['/seer/basic/shippinglist-manage/edit']);
    }

    if(message.type=='update'){
      // let param:DynamicComponentParam = {component: ResourceEditComponent, data: { data: message.data } };
      // this._state.notify('create.dynamic.component',param);//现在通过广播动态加载
      this._router.navigate(['/seer/basic/shippinglist-manage/edit',message.data.id]);
    }

    if(message.type=='delete'){
      //alert(message.data.resourceId);
      //alert("delete");
      this.service.deleteShipping(message.data.id).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success ){
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }


    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      //alert(ids.toString());
      //alert(message.data.resourceId);


      this.service.deleteShipping(ids.toString()).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success) {
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
