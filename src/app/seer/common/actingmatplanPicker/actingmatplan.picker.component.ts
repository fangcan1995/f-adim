import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {BaseService} from "../../base.service";
import {BrandManageService} from "../../basic_info/modules/brand-manage/brand-manage.service";
import {ActingmatPlanService} from "../../plan/modules/actingmat-plan/actingmat-plan.service";
import {SearchActingDto} from "../../plan/modules/actingmat-plan/SearchActingDto";


@Component({
  selector: 'actingmatplanPicker',
  styleUrls: ['./actingmatplan.picker.component.css'],
  templateUrl: './actingmatplan.picker.component.html',
  providers: [BrandManageService, BaseService, ActingmatPlanService],

})
export class actingmatplanPickerComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  errorMessage;
  @Input() selectedIds;
  @Input() hideUsageAmount;
  @ViewChild('childModal') public childModal: ModalDirective;
  source = [];
  titles = [
    {
      key: 'actingMatNum',
      label: '代垫预算编号',
    },
    {
      key: 'actingMatName',
      label: '代垫预算名称',
    },
    {
      key: 'supplierName',
      label: '所属供应商',
    },
    {
      key: 'brandName',
      label: '所属品牌',
    },
    {
      key: 'actingMatMonth',
      label: '所属月份',
    },
    {
      key: 'actingMatAmount',
      label: '预算总金额',
    },
    {
      key: 'actingMatBalance',
      label: '剩余金额',
    },
    {
      key: 'UsageAmount',
      label: '使用金额(元)',
      type: 'input_number'
    },
  ];

  action;
  searchSupplierList = [];
  searchBrandList = [];
  search = {
    supplierId:'',
    brandId:'',
    actingMatMonth:'',
  };
  constructor(private actingmatPlanService: ActingmatPlanService, private baseService: BaseService<any>) {
  }

  ngOnInit() {



    if(this.hideUsageAmount){
      this.titles = [
        {
          key: 'actingMatNum',
          label: '代垫预算编号',
        },
        {
          key: 'actingMatName',
          label: '代垫预算名称',
        },
        {
          key: 'supplierName',
          label: '所属供应商',
        },
        {
          key: 'brandName',
          label: '所属品牌',
        },
        {
          key: 'actingMatMonth',
          label: '所属月份',
        },
        {
          key: 'actingMatAmount',
          label: '预算总金额',
        },
        {
          key: 'actingMatBalance',
          label: '剩余金额',
        },
      ];
    }
    this.actingmatPlanService.getActings().subscribe(
      res => {
        this.source = res.data;
        let source = this.source;
        source.forEach(function (item) {
          item.UsageAmount = Number(item.actingMatBalance);
          if(!item.actingMatBalance){
            item.UsageAmount = Number(item.actingMatAmount);
          }
        });

        this.source = source;
      },
      error => this.errorMessage = <any>error);

    this.getSearchSupplierList();
  }


  getSearchBrandList(supplierId): any {
    this.actingmatPlanService.getBrandList(supplierId)
      .subscribe(
        res => {
          this.searchBrandList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

  getSearchSupplierList(): any {
    this.actingmatPlanService.getSupplierList()
      .subscribe(
        res => {
          this.searchSupplierList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

  public showChildModal(): void {

    this.actingmatPlanService.getActings().subscribe(
      res => {
        this.source = res.data;
        this.search = {
          supplierId:'',
          brandId:'',
          actingMatMonth:'',
        };
        let source = this.source;
        if (this.selectedIds && this.selectedIds.length) {
          this.selectedIds.forEach(function (id) {
            source.forEach(function (item) {
              if (id == item.id) {
                item.selected = true;
              }
            });
          });
        }


        source.forEach(function (item) {
          item.UsageAmount = Number(item.actingMatBalance);
          if(!item.actingMatBalance){
            item.UsageAmount = Number(item.actingMatAmount);
          }
        });


        this.source = source;
        this.childModal.show();


      },
      error => this.errorMessage = <any>error);


  }


  public hideChildModal(): void {
    this.childModal.hide();
  }


  onSelect(event) {
    this.notify.emit(event);
    this.hideChildModal();
  }

  selectActing() {
    //console.log(this.source)
    let data = [];
    this.source.forEach(function (item) {
      if (item.selected) {
        data.push(item);
      }
    });
    console.log('123')
    console.log(data)
    this.notify.emit(data);
    this.hideChildModal();
  }

  monthIsRight = false;
  checkSearchMonth(number): boolean{
    if(number!=null){
      const reg = new RegExp('^(\\d{4})-(0\\d{1}|1[0-2])$');
      if(number.length==7 && number.match(reg)){
        this.monthIsRight = true;
        return false;
      }else{
        this.monthIsRight = false;
        return true;
      }
    }else{
      this.monthIsRight = false;
      return true;
    }
  }

  getActingByTerms(): void{
    let searchActingDto = new SearchActingDto;
    searchActingDto.supplierId = this.search.supplierId;
    searchActingDto.brandId = this.search.brandId;
    if(this.monthIsRight){
      searchActingDto.actingMatMonth = this.search.actingMatMonth;
    }
    this.actingmatPlanService.getActingByTerms(searchActingDto)
      .subscribe(
        res => {
          this.source = res.data;
          let source = this.source;
          if (this.selectedIds && this.selectedIds.length) {
            this.selectedIds.forEach(function (id) {
              source.forEach(function (item) {
                if (id == item.id) {
                  item.selected = true;
                }
              });
            });
          }

          source.forEach(function (item) {
            item.UsageAmount = Number(item.actingMatBalance);
            if(!item.actingMatBalance){
              item.UsageAmount = Number(item.actingMatAmount);
            }
          });

          this.source = source;

        },
        error =>  this.errorMessage = <any>error);
  }


  actingCancel(): void{
    this.search = {
      supplierId:'',
      brandId:'',
      actingMatMonth:'',
    };

    this.searchBrandList=[];

    this.getActingMats();
  }

  getActingMats(): void {
    this.actingmatPlanService.getActings()
      .subscribe(
        res => {
          this.source = res.data;
          let source = this.source;
          if (this.selectedIds && this.selectedIds.length) {
            this.selectedIds.forEach(function (id) {
              source.forEach(function (item) {
                if (id == item.id) {
                  item.selected = true;
                }
              });
            });
          }

          source.forEach(function (item) {
            item.UsageAmount = Number(item.actingMatBalance);
            if(!item.actingMatBalance){
              item.UsageAmount = Number(item.actingMatAmount);
            }
          });


          this.source = source;
        },
        error =>  this.errorMessage = <any>error);
  }
}




