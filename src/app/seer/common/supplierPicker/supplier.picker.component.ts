import {Component, ViewEncapsulation, OnInit , Input,Output,EventEmitter,OnChanges} from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {SupplierManageService} from "../../basic_info/modules/supplier-manage/supplier-manage.service";
import {BaseService} from "../../base.service";
import {Supplier} from "../../model/basic_info/supplier";
import {CustomerManageService} from "../../basic_info/modules/customer-manage/customer-manage.service";

@Component({
  selector: 'supplierClientPicker',
  styleUrls: ['./supplier.picker.component.css'],
  templateUrl: './supplier.picker.component.html',
  providers: [SupplierManageService,BaseService,CustomerManageService],

})
export class supplierPickerComponent  implements OnInit ,OnChanges{

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Input() type;
  @Input() buttonWidth;

  @ViewChild('childModal') public childModal:ModalDirective;
  source =[];
  titles = [];

  titlesSupplier = [
    {
      key:'supplierName',
      label:'供应商名称',
    },
    {
      key:'supplierCode',
      label:'企业代码',
    },
    {
      key:'supplierTaxCode',
      label:'税号',
    },
    {
      key:'supplierTel',
      label:'公司电话',
    }
  ];
  titlesClent =[
    {
      key:'customerName',
      label:'客户名称'
    },
    {
      key:'customerCode',
      label:'客户企业代码'
    }
    ,
    {
      key:'customerTaxCode',
      label:'税号'
    }
    ,
    {
      key:'customerAddress',
      label:'客户地址'
    }
    ,
    {
      key:'customerTel',
      label:'办公电话'
    }
  ];
  sourceCustomer = [];
  sourceSupplier = [];
  action;
  constructor(private customerService:CustomerManageService,private service:SupplierManageService, private baseService:BaseService<Supplier>) {
  }

  ngOnInit() {


    this.customerService.getCustomer().then((data) => {
      this.sourceCustomer = data.data;
      if(this.type=='client'){
        this.titles = this.titlesClent;
        this.source = this.sourceCustomer;
      }
    });


    this.service.searchSuppliers({}).then((result) => {
      this.sourceSupplier = result.data;
      if(this.type=='supplier'){
        this.titles = this.titlesSupplier;
        this.source = this.sourceSupplier;
      }
    });



  }


  ngOnChanges(type) {
    if(this.type){
      if(this.type=='client'){
        this.titles = this.titlesClent;
        this.source = this.sourceCustomer;
      }else{
        this.titles = this.titlesSupplier;
        this.source = this.sourceSupplier;
      }
    }
  }

  renderTitle(){
    let res = '供应商';
    if(this.type=='client'){
      res = '客户';
    }
    return res;
  }

  public showChildModal():void {
    if(!this.type){
      this.action = 'show';
    }else{
      this.childModal.show();
    }
  }

  onSelectAlert(event){
    if(event.type=='cancel'){
      this.action = false;
    }
  }


  public hideChildModal():void {
    this.childModal.hide();
  }


  onSelect(event){
    this.notify.emit(event);
    this.hideChildModal();
  }

}




