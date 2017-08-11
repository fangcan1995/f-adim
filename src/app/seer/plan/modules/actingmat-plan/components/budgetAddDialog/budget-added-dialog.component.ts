import {
  BaseModalComponent,
  DynamicComponentLoader
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy} from "@angular/core";

import {GlobalState} from "../../../../../../global.state";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {InvActingMatBudgetDto} from "../../InvActingMatBudgetDto";
import {ActingmatPlanService} from "../../actingmat-plan.service";
import {Json} from "../../../../../login/Json";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {StaffListComponent} from "../staffList/staff-list.component";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";
import {ACTINGMAT_PLAN} from "../actingmat-plan.translate";
import {ActingStoreTreeComponent} from "../actingStoreTree/acting-store-tree.component";

/**
 * Created by Administrator on 2016/12/21.
 */
@Component({
  selector: 'budget-added-dialog',
  templateUrl: './budget-added-dialog.component.html',
  styleUrls: ['./budget-added-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [StaffListComponent,ActingStoreTreeComponent]
})
export class BudgetAddedDialogComponent extends BaseModalComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this._state.unsubscribe('getBudgetStaff');
    this._state.unsubscribe('getActingStores');
  }

  @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  loadStoreTree(treeType) {
    this.dynamicComponentLoader.loadComponent(ActingStoreTreeComponent,{budget: this.budget,storeTreeDataList: this.storeTreeDataList,treeType: treeType});
  }

  title: string;

  budget:InvActingMatBudgetDto = new InvActingMatBudgetDto();

  buttonFlag = true;
  checkinput = false;
  flag: string;
  nameCheck: string;
  subjectCheck: string;
  amountCheck: string;
  storeCheck: string;
  animation: boolean = true;
  backdrop: string | boolean = true;
  staffs;
  selectedPermissions = TREE_PERMISSIONS.NOTIFY;
  belongType = '0';
  translate = ACTINGMAT_PLAN;
  treeType;
  storeTreeDataList = [];
  staffNameData = '';
  staffIdData = '';

  constructor(private actingmatPlanService? :ActingmatPlanService, private _state?: GlobalState) {
    super();
    _state.subscribe('getBudgetStaff',(data)=>{
      if(data!=null){
        this.staffNameData = data.staffName;
        this.staffIdData = data.id;
        this.storeTreeDataList = [];
        this.budget.customerStoreNames = '';
      }
    });
    _state.subscribe('getActingStores',(data)=>{
      if(data.length>0){
        this.storeTreeDataList = data;
        this.actingmatPlanService.getStoreNamesByIds(this.storeTreeDataList)
          .subscribe((result:Json)=>{
            if (result.success){
              this.budget.customerStoreNames = result.data.toString();
            }else {
              alert(result.message);
            }
          });
        this.staffIdData = '';
        this.staffNameData = '';
      }else{
        this.budget.customerStoreNames = '';
      }
    });
    // //订阅 选择门店
    // _state.subscribe('getStoreById',(data)=>{
    //   console.log(data);
    //   this.budget.customerStoreId = data.id;
    //   this.budget.storeName = data.storeName;
    // })
  }

  ngOnInit(){
    this.title = this.data.title;
    this.flag = this.data.flag;
    if (this.flag == '1') {
      this.budget =  Object.assign({},this.data.budget);
      if(this.budget.staffId){
        this.belongType = 'STAFF';
      }
      if(this.budget.customerStoreIds){
        if(this.budget.customerStoreIds.length>0){
          this.belongType = 'STORE';
          this.actingmatPlanService.getStoreNamesByIds(this.budget.customerStoreIds)
            .subscribe((result:Json)=>{
              if (result.success){
                this.budget.customerStoreNames = result.data.toString();
              }else {
                alert(result.message);
              }
            });
        }
      }
      if(!this.budget.staffId){
        if(!this.budget.customerStoreIds){
          this.belongType = '0'
        }else{
          if(this.budget.customerStoreIds.length == 0){
            this.belongType = '0'
          }
        }
      }
      this.buttonFlag = false;
      this.treeType = 'update';
    }else{
      this.treeType = 'add';
    }

    this.actingmatPlanService.getStaffs().subscribe((result:Json)=>{
      if (result.success){
        this.staffs = jsonTree(result.data);
      }else {
        alert(result.message);
      }
    });
  }

  loadStaffList() {
    this.dynamicComponentLoader.loadComponent(StaffListComponent);
  }

  SAVEEVENT = 'saveBudget';
  EDITEVENT = 'editBudget';

  onSave(): void {

    //console.log(this.customerStore);

    //alert("On Save");
    // this.service.createUser(this.sysUser).then((param) => {
    //   this.closeModal();
    //   this._state.notify(this.SAVEEVENT, param); //触发新增发放
    // });

    if(this.checkinput&&!this.nameCheck&&!this.amountCheck&&!this.subjectCheck&&!this.storeCheck){
      this.budget.customerStoreIds = this.storeTreeDataList;
      this.budget.staffName = this.staffNameData;
      this.budget.staffId = this.staffIdData;
      let parma = {
        "data":this.budget,
        "flag" : this.flag
      };

      this._state.notify(this.SAVEEVENT, parma); //触发新增发放
      this.closeModal();
    }

  }

  onEdit(): void {
    alert("On Save");
    // this.service.updateUser(this.sysUser).then((param) => {
    //   this.closeModal();
    //   this._state.notify(this.EDITEVENT, param);
    // });
  }

  checkInput(){
    this.checkinput = true;
  }

  //检测方法
  checkValue(){
    if(!this.budget.budgetName&&this.checkinput == true){
      this.checkName();
    }else {
      this.nameCheck = null;
    }

    if(!this.budget.budgetSubject&&this.checkinput == true){
      this.checkSubject();
    }else {
      this.subjectCheck = null;
    }

    if(!this.budget.budgetAmount&&this.checkinput == true){
      this.checkAmount();
    }else {
      this.amountCheck = null;
    }
  }

  checkName(){
    this.nameCheck = '请输入费用名称。';
  }
  checkSubject(){
    this.subjectCheck = '请选择费用科目。';
  }
  checkAmount(){
    this.amountCheck = '请输入费用金额。';
  }

  cancel(): void{

  }
  //
  // loadStoreList() {
  //   this.dynamicComponentLoader.loadComponent(CustomerStoreListComponent);
  // }
}
