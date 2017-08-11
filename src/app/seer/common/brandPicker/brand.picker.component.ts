import {Component, ViewEncapsulation, OnInit , Input,Output,EventEmitter,OnChanges} from '@angular/core';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {BaseService} from "../../base.service";
import {BrandManageService} from "../../basic_info/modules/brand-manage/brand-manage.service";


@Component({
  selector: 'brandPicker',
  styleUrls: ['./brand.picker.component.css'],
  templateUrl: './brand.picker.component.html',
  providers: [BrandManageService,BaseService],

})
export class brandPickerComponent  implements OnInit ,OnChanges{

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Input() id;



  @ViewChild('childModal') public childModal:ModalDirective;
  source = [];
  titles = [
    {
      key:'brandName',
      label:'品牌名称'
    },
    {
      key:'brandShortName',
      label:'品牌简称'
    },
    {
      key:'brandNumber',
      label:'品牌编号'
    }
    ,
    {
      key:'supplierName',
      label:'所属供应商'
    }
    ,
    {
      key:'brandCountry',
      label:'原产地',
      isDict:true,
    }
    ,
    {
      key:'brandMode',
      label:'合作方式',
      isDict:true
    }
    ,
    {
      key:'brandState',
      label:'品牌状态',
      isDict:true
    }
  ];

  action;
  constructor(private brandManageService: BrandManageService,private baseService:BaseService<any>) {
  }

  ngOnInit() {
    if(this.id){
      this.brandManageService.searchBrand({supplierId:this.id}).then((res) => {
        this.source = res.data;
      });
    }
  }


  ngOnChanges(id) {
   if(this.id){
     this.brandManageService.searchBrand({supplierId:this.id}).then((res) => {
       this.source = res.data;
     });
   }
  }



  public showChildModal():void {
    if(!this.id){
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




