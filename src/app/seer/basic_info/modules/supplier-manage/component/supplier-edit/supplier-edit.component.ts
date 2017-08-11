/**
 * Created by Administrator on 2016/12/26.
 */
import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {SupplierManageService} from "../../supplier-manage.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Supplier} from "../../../../../model/basic_info/supplier";

@Component({
  selector: 'supplier-edit',
  templateUrl: './supplier-edit.component.html',
  providers: [SupplierManageService],
  styleUrls: ['./supplier-edit.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierEditComponent implements OnInit{
  title: string;
  supplierNatureDict = [];
  supplierStateDict = [];
  supplierBankDict = [];
  supplierId: string;
  addFlag: boolean;
  checkAllInput = false;
  supplier: Supplier = new Supplier();

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private service: SupplierManageService){}

  ngOnInit() {
    /*字典查询企业性质*/
    this.service.getDictByKey("SUPPLIER_NATURE").then((result) => {
      this.supplierNatureDict = result.data;
    });
    /*字典查询供应商状态*/
    this.service.getDictByKey("SUPPLIER_STATE").then((result) => {
      this.supplierStateDict = result.data;
    });
    /*字典查询开户行*/
    this.service.getDictByKey("SUPPLIER_BANK").then((result) => {
      this.supplierBankDict = result.data;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.supplierId = params['id'];
      this.addFlag = !this.supplierId;
    });
    this.title = this.addFlag?'新增供应商':'修改供应商';

    if (!this.addFlag) {
      this.getSupplierById(this.supplierId);
    }
  }

  /*查询修改供应商信息*/
  getSupplierById(supplierId: string) {
    this.service.getSupplierById(supplierId).then((data) => {
      this.supplier = data.data;
    });
  }

  /*返回信息列表*/
  cancel() {
    this.checkAllInput = false;
    this._router.navigate(['/seer/basic/supplier-manage/']);
  }

  /*表单提交方法*/
  submitForm() {
    if(!this.addFlag){
      this.updateSupplier();
    }else{
      this.addSupplier();
    }
  }

  /*修改供应商*/
  updateSupplier() : void {
    this.service.updateSupplier(this.supplier).then((data) => {
      // console.log(data.success);
      if(data.success) {
        this._router.navigate(['/seer/basic/supplier-manage/']);
      }else{
        alert("更新失败~" + data.message);
        this._router.navigate(['/seer/basic/supplier-manage/edit',this.supplier.id]);
      }
      this.checkAllInput = false;
    });
  }

  /*新增供应商*/
  addSupplier() : void{
    this.service.createSupplier(this.supplier).then((data) => {
      if(data.success) {
        this._router.navigate(['/seer/basic/supplier-manage/']);
      }else{
        alert("添加失败~" + data.message);
        this._router.navigate(['/seer/basic/supplier-manage/add']);
      }
      this.checkAllInput = false;
    });
  }

  allInput(){
    this.checkAllInput = true;
  }

  checkEmail(number): boolean{
    if(number != null){
      const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
      if(number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

}
