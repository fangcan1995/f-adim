import {Component, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";

import {Router} from "@angular/router";
import {ShippingListManageService} from "../shippinglist-manage.service";
import {GlobalState} from "../../../../../../../../global.state";
import {DynamicComponentLoader} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {SaleManListComponent} from "../saleman/saleman-list.component";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";

@Component({
  selector: 'shippinglist-operation',
  templateUrl: './shippinglist-operation.component.html',
  providers: [ShippingListManageService],
  styleUrls: ['./shippinglist-operation.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents:[SaleManListComponent],

})
export class ShippingListOperationComponent implements OnInit{


  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;


  title = '发货查询';

  shippinglistCountry:string;
  supplierId:string;

  shippinglist:any = {
    startData:'',
    endData:''
  };

  constructor(
    private _router: Router,
    private service:ShippingListManageService,
    private _customerService:CustomerManageService,
    private _state:GlobalState
  ){
    _state.subscribe('getOrgId',(data)=>{
        console.log(data);
        this.shippinglist.staffId = data.id;
        this.shippinglist.staffName = data.staffName;
    })

  }




  ngOnInit(): void {
    this.shippinglist.customerinfo = "";
    this.shippinglist.customerStoreId = "";
    this.shippinglist.acceptState = "";
    this.getCustomer();
  }

  getCustomer() {
    this._customerService.getCustomer().then((data) => {
      console.log("customer" + data.data);
      this.shippinglist.customerdata = data.data;
    });
  }

  typeChange(customerinfo) {
     //alert(customerinfo);
    if( customerinfo != "") {
      this._customerService.getCustomerById(customerinfo).then((data) => {
        console.log("customerbyId" + data.data);
        this.shippinglist.customerstoredata = data.data.listStore;
      });
    }else {
      this.shippinglist.customerstoredata = [];
    }
    this.shippinglist.customerStoreId = "";

  }

  onSubmit(){

    // alert(this.shippinglist.shippinglistCountry);
    // alert(this.shippinglist.supplierId);

    //this._router.navigate(['/seer/basic/shippinglist-manage/'],this.shippinglist.shippinglistCountry + '/' + this.shippinglist.supplierId);
    //alert(this.shippinglist.shippinglistCountry + '/' + this.shippinglist.supplierId);

    let param = {
      "customerinfo": this.shippinglist.customerinfo,
      "customerStoreId": this.shippinglist.customerStoreId,
      "staffId": this.shippinglist.staffId,
      "startData": this.shippinglist.startData.toString(),
      "endData": this.shippinglist.endData.toString(),
      "acceptState": this.shippinglist.acceptState
    };
    this._state.notify('search-shippinglist-list',param);//现在通过广播动态加载
  }

  reset() {
    this.shippinglist.customerinfo = "";
    this.shippinglist.customerStoreId = "";
    this.shippinglist.staffId = "";
    this.shippinglist.staffName = "";
    this.shippinglist.startData = "";
    this.shippinglist.endData = "";
    this.shippinglist.acceptState = "";

    this.onSubmit();
  }


  loadOrgList() {
    this.dynamicComponentLoader.loadComponent(SaleManListComponent);
  }
}
