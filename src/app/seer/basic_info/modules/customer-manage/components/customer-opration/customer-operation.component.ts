import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {CustomerManageService} from "../../customer-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../global.state";
@Component({
  selector: 'customer-operation',
  templateUrl: './customer-operation.component.html',
  providers: [CustomerManageService],
  styleUrls: ['./customer-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerOperationComponent implements OnInit{


  title = '客户查询';

  customerNatureNatureDict = [];
  customer:any = {};

  constructor(
    private _router: Router,
    private service:CustomerManageService,
    private _state:GlobalState
  ){
  }


  ngOnInit(): void {
    this.customer.customerNature = "";
    /*字典查询企业性质*/
    this.service.getDictByKey("SUPPLIER_NATURE").then((result) => {
      console.log(result.data);
      this.customerNatureNatureDict  = result.data;
    });

  }

  onSubmit(){

    // alert(this.customer.customerCountry);
    // alert(this.customer.supplierId);

    //this._router.navigate(['/seer/basic/customer-manage/'],this.customer.customerCountry + '/' + this.customer.supplierId);
    //alert(this.customer.customerCountry + '/' + this.customer.supplierId);

    let param = {
      "customerName": this.customer.customerName,
      "customerNature": this.customer.customerNature
    };

    this._state.notify('search-customer-list',param);//现在通过广播动态加载



  }


  reset() {
    this.customer.customerName = "";
    this.customer.customerNature = "";

    this.onSubmit();

  }

  // newResource() {
  //     this._router.navigate(['/seer/basic/customer-manage/edit']);
  // }
  //
  // deleteResource() {
  //     this._router.navigate(['/seer/basic/customer-manage/']);
  // }

  // searchResource() {
  //   this._router.navigate(['/seer/basic/customer-manage/']);
  // }

}
