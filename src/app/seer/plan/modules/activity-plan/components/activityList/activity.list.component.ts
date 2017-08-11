import {Component} from "@angular/core";
import {ActivityPlanService} from "../../activity.plan.service";
import {BrandManageService} from "../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {CustomerManageService} from "../../../../../basic_info/modules/customer-manage/customer-manage.service";
@Component({
  selector: 'activity-list',
  styleUrls: ['./activity.list.component.css'],
  templateUrl: './activity.list.component.html',
  providers: [BrandManageService, CustomerManageService],
})
export class ActivityListComponent {
  currentActivityPlan;//当前活动计划
  search = {
    supplierId: '',
    brandId: '',
    startTime: '',
    endTime: '',
  }; //搜索对象
  supplierName;//供应商名称
  currentBrands; //所有品牌
  customerList;
  brandName;
  activityPlanList;
  errorMessage;
  titles = [
    {key: 'activityPlanNum', label: '活动计划编号'},
    {key: 'activityPlanName', label: '活动计划名称'},
    {key: 'supplierName', label: '所属供应商'},
    {key: 'brandName', label: '所属品牌'},
    {key: 'customerName', label: '活动客户'},
    {key: 'customerStoreNames', label: '活动门店'},
    {key: 'activityAmount', label: '活动总金额(元)'},
  ];

  constructor(private _customerService: CustomerManageService, private brandManageService: BrandManageService, private activityPlanService: ActivityPlanService) {
  }

  ngOnInit() {
    this.brandManageService.getBrand().then((res) => {
      this.currentBrands = res.data;
    });
    this._customerService.getCustomer().then((res) => {
      this.customerList = res.data;
    });
    this.getAllActivityPlan();
  }

  getAllActivityPlan() {
/*    this.activityPlanService.getAllActivityPlan()
      .subscribe(
        res => {
          this.activityPlanList = res.data;
        },
        error => this.errorMessage = <any>error);*/
    this.activityPlanService.searchActivity({})
      .subscribe(
        res => {
          this.activityPlanList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

  onChange(event) {
    if (event && event.type == 'update') {
      this.currentActivityPlan = event.data;
    }
    if (event && event.type == 'add') {
      this.currentActivityPlan = {
        activityPlanNum: 'AP' + new Date().getTime()
      };
    }

    if (event && event.type == 'delete') {
      this.activityPlanService.deleteActivityById(event.data.id)
        .subscribe(
          res => {
          },
          error => this.errorMessage = <any>error);
    }


    if (event && event.type == 'delete_all') {
      let ids = [];
      event.data.forEach(function(item){
        ids.push(item.id);
      });
      this.activityPlanService.deleteActivityByIds(ids)
        .subscribe(
          res => {
          },
          error => this.errorMessage = <any>error);
    }

  }

  onSelectBrand(event) {
    if (event.type == 'select') {
      this.search.brandId = event.data.id;
      this.brandName = event.data.brandName;
    }
  }

  onSelectSupplier(event) {
    if (event.type == 'select') {
      this.search.supplierId = event.data.id;
      this.supplierName = event.data.supplierName;
    }

  }

  onChangeCurrentActivityPlan(event) {
    if (event && event.type == 'cancel') {
      this.getAllActivityPlan();
      this.currentActivityPlan = false;
    }
  }

  searchData() {
    this.activityPlanService.searchActivity(this.search)
      .subscribe(
        res => {
          this.activityPlanList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

  cancelSearch() {
    this.getAllActivityPlan();
    this.search = {
      supplierId: '',
      brandId: '',
      startTime: '',
      endTime: '',
    };
    this.supplierName = '';
    this.brandName = '';
  }

}

