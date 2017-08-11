import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {BrandManageService} from "../../brand-manage.service";
import {BrandModel} from "../../brand-model.class";
import {GlobalState} from "../../../../../../global.state";

import {DynamicComponentLoader} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {SaleManCListComponent} from "../dept/saleman-list.component";





@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css'],
  entryComponents:[SaleManCListComponent],

})
export class BrandEditComponent implements OnInit {


  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;


  title : string;
  isAdd: boolean;
  editId: string;

  brand:BrandModel = new BrandModel();

  staffs = [];
  constructor(
    private _router: Router,
    private service:BrandManageService,
    private _activatedRoute:ActivatedRoute,
    private _state:GlobalState
  ) {
    _state.subscribe('getOrgId',(data)=>{
      console.log(data);

      this.brand.relatedOrgId = data.id;
      this.brand.relatedOrgName = data.orgName;
    })
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      // this.isAdd = params['isAdd'];
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })

    this.title = this.isAdd ? '新建品牌' : '修改品牌';




    if(!this.isAdd) {
      this.getResourceById(this.editId);
    }else {
      this.brand.brandCountry = "";
      this.brand.brandMode = "";
      this.brand.brandState = "";
    }

  }


  getResourceById(id:string) {
    //alert(id);
    //this.resource.resourceId = id;
    //alert("08");
    this.service.getBrandById(id).then((data) => {
      //console.log(data.success);
      //alert(data.success);
      //alert(data.success);
      this.brand = data.data;


    });
  }


  submitForm() {
    //alert(this.resource.resource_id);
    //alert(this.resource.resource_name);
    if(!this.isAdd){
      this.updateResource();
    }else{
      this.addResource();
    }

  }

  backList() {
    this._router.navigate(['/seer/basic/brand-manage/']);
  }

  updateResource() : void {
    //alert(this.resource.resourceId);
    this.service.updateBrand(this.brand).then((data) => {
      console.log(data.success);
      if(data.success) {
        //alert("1")  //新增成功跳转页面
        this._router.navigate(['/seer/basic/brand-manage/']);
      }else{
        //alert("0")
        alert("更新失败~" + data.message);
        this._router.navigate(['/seer/basic/brand-manage/edit',this.brand.id]);
      }
      //console.log(data.data);
    });
  }


  addResource() : void{

    this.service.createBrand(this.brand).then((data) => {
      console.log(data.success);

      //alert(data.success);

      if(data.success) {
        //alert("1")  //新增成功 跳转页面
        this._router.navigate(['/seer/basic/brand-manage/']);
      }else{
        alert("添加失败~" + data.message);
        this._router.navigate(['/seer/basic/brand-manage/edit']);
      }
      console.log(data.data);
    });
  }

  loadOrgList() {
    this.dynamicComponentLoader.loadComponent(SaleManCListComponent);
  }

  onSelectSupplier( $event) {
    this.brand.supplierName = $event.data.supplierName;
    this.brand.supplierId = $event.data.id;

  }

}
