import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {BaseService} from "../../base.service";
import {BrandManageService} from "../../basic_info/modules/brand-manage/brand-manage.service";
import {ActingmatPlanService} from "../../plan/modules/actingmat-plan/actingmat-plan.service";
import {ActivityPlanService} from "../../plan/modules/activity-plan/activity.plan.service";


@Component({
  selector: 'storePicker',
  styleUrls: ['./store.picker.component.css'],
  templateUrl: './store.picker.component.html',
  providers: [BrandManageService, BaseService, ActingmatPlanService],

})
export class storePickerComponent implements OnInit  ,OnChanges{

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  errorMessage;
  @Input() id;
  @Input() selectedIds;

  @ViewChild('childModal') public childModal: ModalDirective;
  source = [];
  titles = [
    {
      key:'storeName',
      label:'客户门店名称'
    },
    {
      key:'channelId',
      label:'渠道/业态'
    },
    {
      key:'storeLevel',
      label:'	门店级别'
    }
    ,
    {
      key:'staffName',
      label:'	开拓人员'
    }
  ];

  action;

  constructor(private activityPlanService: ActivityPlanService, private baseService: BaseService<any>) {
  }

  ngOnChanges(id) {
    if(this.id){
      this.activityPlanService.getStoresByCustomerId(this.id)
        .subscribe(
          res => {
            this.source = res.data
          },
          error => this.errorMessage = <any>error);
    }
  }

  ngOnInit() {
    if(this.id){
      this.activityPlanService.getStoresByCustomerId(this.id)
        .subscribe(
          res => {
            this.source = res.data
          },
          error => this.errorMessage = <any>error);
    }

  }


  public showChildModal(): void {
    if(this.id){
      let source = this.source;
      if (this.selectedIds&&this.selectedIds.length) {
        this.selectedIds.forEach(function (id) {
          source.forEach(function (item) {
            if (id == item.id) {
              item.selected = true;
            }
          });
        });
      }

      this.source = source;
      this.childModal.show();
    }else{
      this.action = 'show';
    }

  }


  public hideChildModal(): void {
    this.childModal.hide();
  }


  onSelect(event) {
    this.notify.emit(event);
    this.hideChildModal();
  }

  selectStore() {
    //console.log(this.source)
    let data = [];
    this.source.forEach(function (item) {
      if (item.selected) {
        data.push(item);
      }
    });
    this.notify.emit(data);
    this.hideChildModal();
  }

  onSelectAlert(event){
    if(event.type=='cancel'){
      this.action = false;
    }
  }

}




