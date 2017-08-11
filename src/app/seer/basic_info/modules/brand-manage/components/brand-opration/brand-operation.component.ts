import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {BrandManageService} from "../../brand-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../global.state";
@Component({
  selector: 'brand-operation',
  templateUrl: './brand-operation.component.html',
  providers: [BrandManageService],
  styleUrls: ['./brand-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandOperationComponent implements OnInit{


  title = '品牌查询';

  brandCountry:string;
  supplierId:string;
  supplierName:string;

  brand:any = {};

  constructor(
    private _router: Router,
    private service:BrandManageService,
    private _state:GlobalState
  ){
  }


  ngOnInit(): void {
    this.brand.brandCountry = "";
  }

  onSubmit(){

    // alert(this.brand.brandCountry);
    // alert(this.brand.supplierId);

    //this._router.navigate(['/seer/basic/brand-manage/'],this.brand.brandCountry + '/' + this.brand.supplierId);
    //alert(this.brand.brandCountry + '/' + this.brand.supplierId);

    let param = {
      "brandCountry": this.brand.brandCountry,
      "supplierId": this.brand.supplierId
    };

    this._state.notify('search-brand-list',param);//现在通过广播动态加载

  }

  onSelectSupplier( $event) {

    this.brand.supplierName = $event.data.supplierName;
    this.brand.supplierId = $event.data.id;

  }

  reset() {
    this.brand.brandCountry = "";
    this.brand.supplierId = "";
    this.brand.supplierName = "";

    this.onSubmit();
  }

  // newResource() {
  //     this._router.navigate(['/seer/basic/brand-manage/edit']);
  // }
  //
  // deleteResource() {
  //     this._router.navigate(['/seer/basic/brand-manage/']);
  // }

  // searchResource() {
  //   this._router.navigate(['/seer/basic/brand-manage/']);
  // }

}
