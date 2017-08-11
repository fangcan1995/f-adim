import {Component, ViewEncapsulation, OnInit , ViewChild} from '@angular/core';
import {ActingmatPlanService} from "../actingmat-plan.service";
import {Json} from "../../../../login/Json";
import {ActingAndBudgetDto} from "../ActingAndBudgetDto";
import {Router, ActivatedRoute} from "@angular/router";
import {GlobalState} from "../../../../../global.state";
import {
  DynamicComponentLoader,
  DynamicComponentParam
} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {BudgetAddedDialogComponent} from "./budgetAddDialog/budget-added-dialog.component";
import {forEach} from "@angular/router/src/utils/collection";
import {SearchActingDto} from "../SearchActingDto";
import {AttachDetailComponent} from "./attachDetail/attach-detail.component";
import {InvActingMatBudgetDto} from "../InvActingMatBudgetDto";


@Component({
  selector: 'actingmatComponent',
  styleUrls: ['./actingmat.component.scss','./actingmathead.component.css'],
  templateUrl: './actingmatComponent.html',
  providers: [],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [BudgetAddedDialogComponent,AttachDetailComponent]
})
export class ActingmatComponent{
  titleSearch = '查询区域';
  title = '代垫计划';
  detailTitle = '代垫预算详情';
  addTitle: string;
  data = [];
  json = Json;
  currentActingmat;
  currentActingmatDetail;
  currentBudget = [];
  currentBudgetDetail = [];
  budget;
  actingmatMonthCheck: string;
  currentBrandList = [];
  searchSupplierList = [];
  searchBrandList = [];
  search = {
    supplierId:'',
    brandId:'',
    actingMatMonth:'',
  };

  titles = [
    {
      key:'actingMatNum',
      label:'代垫预算编号',
    },
    {
      key:'actingMatName',
      label:'代垫预算名称',
      type: 'link',
    },
    {
      key:'supplierName',
      label:'所属供应商',
    },
    {
      key:'brandName',
      label:'所属品牌',
    },
    {
      key:'actingMatMonth',
      label:'所属月份',
    },
    {
      key:'actingMatAmount',
      label:'预算总金额',
    },
  ];

  titleOption =[
    {
      key:'actingMatNum',
      label:'代垫预算编号',
    },
    {
      key:'actingMatName',
      label:'代垫预算名称',
      type: 'link',
    },
    {
      key:'supplierName',
      label:'所属供应商',
    },
    {
      key:'brandName',
      label:'所属品牌',
    },
    {
      key:'actingMatMonth',
      label:'所属月份',
    },
    {
      key:'actingMatAmount',
      label:'预算总金额',
    },
    {
      key:'actingMatBalance',
      label:'代垫预算剩余金额',
    },
    {
      key:'start_time',
      label:'开始时间',
    },
    {
      key:'end_time',
      label:'结束时间',
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
    }
  ];

  BudgetTitle = [
    {
      key:'budgetName',
      label:'费用名称',
    },
    {
      key:'budgetSubject',
      label:'费用科目',
      isDict: true,
    },
    {
      key:'budgetAmount',
      label:'费用金额',
    },
    {
      key:'budgetBalance',
      label:'剩余金额',
    },
    {
      key:'staffName',
      label:'所属人员',
    },
    {
      key:'customerStoreNames',
      label:'所属门店',
    },
  ];

  BudgetTitleOption =[
    {
      key:'budgetName',
      label:'费用名称',
    },
    {
      key:'budgetSubject',
      label:'费用科目',
      isDict: true,
    },
    {
      key:'budgetAmount',
      label:'费用金额',
    },
    {
      key:'budgetBalance',
      label:'剩余金额',
    },
    {
      key:'staffName',
      label:'所属人员',
    },
    {
      key:'customerStoreNames',
      label:'所属门店',
    },
    {
      key:'start_time',
      label:'开始时间',
    },
    {
      key:'end_time',
      label:'结束时间',
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
    }
  ];

  errorMessage;
  checkAllinput = false;
  checkSearchAllinput = false;

  isAdd: boolean;
  editId: string;
  EVENT = 'openBudgetAddedDialog';
  ATTACHEVENT = 'openActingAttachDetail';
  SAVEEVENT = 'saveBudget';
  EDITEVENT = 'editBudget';

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  constructor(private _router: Router,
              private _activatedRoute:ActivatedRoute,
              private _state: GlobalState,
              private actingmatPlanService: ActingmatPlanService){

    /*弹出新增、修改页面订阅事件*/
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });

    /*弹出添加附件页面订阅事件*/
    this._state.subscribe(this.ATTACHEVENT, (param) => {
      this.openModal(param);
    });

    /*新增方法订阅事件*/
    this._state.subscribe(this.SAVEEVENT, (param) => {
      if(param.flag == "1") {
        //修改
        let list = [];
        let amount = 0;
        let amountEdit = 0;
        this.currentBudget.forEach(function(item){
          if(item.indexDelete == param.data.indexDelete){
            list.push(param.data);
            amount += parseInt(item.budgetAmount);
            amountEdit += parseInt(param.data.budgetAmount);
          }else{
            list.push(item);
            amount += parseInt(item.budgetAmount);
            amountEdit += parseInt(item.budgetAmount);
          }
        });
        this.currentBudget = list;
        if(this.currentActingmat.actingMatAmount == amount.toString()){
          this.currentActingmat.actingMatAmount = amountEdit.toString();
        }
      }else {
        //新增
        param.data.indexDelete = this.currentBudget.length;
        param.data.actingMatId = this.currentActingmat.id;
        //总金额不为零或不为空时，同时满足list长度不为0的时候 才循环求和，比较两个值，如果相同说明继续累加，不同则不累加。
        if((this.currentActingmat.actingMatAmount != ''||this.currentActingmat.actingMatAmount != '0') && this.currentBudget.length>0){
          let amount = 0;
          this.currentBudget.forEach(function(item){
            amount += parseInt(item.budgetAmount);
          });
          if(this.currentActingmat.actingMatAmount == amount.toString()){
            this.currentActingmat.actingMatAmount = (parseInt(this.currentActingmat.actingMatAmount)+parseInt(param.data.budgetAmount)).toString();
          }
        }
        if((!this.currentActingmat.actingMatAmount || this.currentActingmat.actingMatAmount=='' || this.currentActingmat.actingMatAmount == '0')&&this.currentBudget.length==0){
          this.currentActingmat.actingMatAmount = (parseInt(param.data.budgetAmount)).toString();
        }
        this.currentBudget.push(param.data);
      }
    });
  }

  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }
  /*弹出新增代垫预算费用模态窗口*/
  budgetAdd(): void {
    let param: DynamicComponentParam = {component: BudgetAddedDialogComponent, data: {title:'新增代垫预算费用', flag: '0'} };
    this._state.notify(this.EVENT, param);
  }

  /*弹出修改用户模态窗口*/
  budgetEdit(event):void {
    let param: DynamicComponentParam = {component: BudgetAddedDialogComponent, data: {budget: event, title:'修改代垫预算费用', flag: '1'} };
    this._state.notify(this.EVENT, param);
  }

  /*弹出修改用户模态窗口*/
  attachDetail(event):void {
    let param: DynamicComponentParam = {component: AttachDetailComponent, data: {budget: event} };
    this._state.notify(this.ATTACHEVENT, param);
  }

  ngOnInit() {
    this.getActingMats();
    this.getSearchSupplierList();
  }

  checkSearchAllInput(){
    this.checkSearchAllinput = true;
  }

  checkAllInput(){
    this.checkAllinput = true;
  }

  getActingMats(): void {
    this.actingmatPlanService.getActings()
      .subscribe(
        res => {
          this.data = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {
    if(message.type=='add'){
      this.addTitle = "新建代垫预算单";
      this.currentActingmat= {
        brandId : ''
      };
      this.currentBudget = [];
      this.checkAllinput = false;
    }

    if(message.type=='update'){
      this.addTitle = "修改代垫预算单";
      this.currentActingmat = message.data;
      this.getBrandList(message.data.supplierId);
      this.getBudgetList(message.data.id);
      this.checkAllinput = false;
    }
    if(message.type=='delete'){
      this.actingmatPlanService.removeActing(message.data.id)
        .subscribe(
          res => {
            this.getActingMats();
          },
          error =>  this.errorMessage = <any>error);
    }
    if(message.type=='delete_all'){

      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      this.actingmatPlanService.removeAllSelectedActings(ids)
        .subscribe(
          res => {
            this.getActingMats();
          },
          error =>  this.errorMessage = <any>error);

    }
    if(message.type=='link'){
      this.currentActingmatDetail = message.data;
      this.getBudgetList(message.data.id);
      this.checkAllinput = false;
    }
  }

  onBudgetChange(message):void {
      if(message.type=='add'){
      this.budgetAdd();
    }

    if(message.type=='update'){
      this.budgetEdit(message.data);
    }

    if(message.type=='delete'){

      //alert(message.data.indexDelete);
      //alert("delete");
      //this.listStore.pop();
      //alert(message.data.id);
      let amountDelete = 0;
      this.currentBudget.splice(message.data.indexDelete,1);
      for ( var i = 0; i < this.currentBudget.length; i ++ ) {
        this.currentBudget[i].indexDelete = i;
        amountDelete += parseInt(this.currentBudget[i].budgetAmount);
      }
      if(this.currentActingmat.actingMatAmount == (amountDelete + parseInt(message.data.budgetAmount)).toString()){
        this.currentActingmat.actingMatAmount = amountDelete.toString();
      }
    }

    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      //alert(ids.toString());
      //alert(message.data.resourceId);
    }
    if(message.type=='addNewButton'){
      this.attachDetail(message.data);
    }
  }

  getBudgetList(actingMatId): any{
    this.actingmatPlanService.getBudgetByActingMatId(actingMatId)
      .subscribe(
        res => {//获取数据的时候给数据加入indexDelete排序字段用来修改方法时做临时id
          for ( var i = 0; i < res.data.length; i ++ ) {
            res.data[i].indexDelete = i;
            let budgetI = new InvActingMatBudgetDto();
            budgetI = res.data[i];
            if(res.data[i].customerStoreIds){
              if(res.data[i].customerStoreIds.length>0){
                this.actingmatPlanService.getStoreNamesByIds(res.data[i].customerStoreIds)
                  .subscribe((result:Json)=>{
                    if (result.success){
                      budgetI.customerStoreNames = result.data.toString();
                    }else {
                      alert(result.message);
                    }
                  });
              }
            }
            res.data[i] = budgetI;
          }
          this.currentBudget = res.data;
          this.currentBudgetDetail = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  actingCancel(): void{
    this.search = {
      supplierId:'',
      brandId:'',
      actingMatMonth:'',
    };
    this.actingmatMonthCheck = null;
    this.searchBrandList=[];
    this.currentActingmat = false;
    this.currentBrandList = [];
    this.currentBudget = [];
    this.checkAllinput = false;
    this.checkSearchAllinput = false;
    this.currentActingmatDetail = false;
    this.currentBudgetDetail = [];
    this.getActingMats();
  }

  saveActing(): void{
    let actingAndBudgetDto = new ActingAndBudgetDto;
    actingAndBudgetDto.invActingMatDto = this.currentActingmat;
    actingAndBudgetDto.budgetDtoList = this.currentBudget;
    if(this.currentActingmat.id){
      this.actingmatPlanService.updateActing(actingAndBudgetDto)
        .subscribe(
          res => {
            this.currentActingmat = false;
            this.currentBudget = [];
            this.checkAllinput = false;
            this.getActingMats();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.actingmatPlanService.addActing(actingAndBudgetDto)
        .subscribe(
          res => {
            this.currentActingmat = false;
            this.currentBudget = [];
            this.checkAllinput = false;
            this.getActingMats();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  onSelectSupplier($event) {
    this.currentActingmat.supplierId = $event.data.id;
    this.currentActingmat.supplierName = $event.data.supplierName;
    this.currentActingmat.brandId ='';
    this.getBrandList($event.data.id);
  }

  getSearchSupplierList(): any{
      this.actingmatPlanService.getSupplierList()
        .subscribe(
          res => {
            this.searchSupplierList = res.data;
          },
          error =>  this.errorMessage = <any>error);
  }

  getSearchBrandList(supplierId): any{
    if(supplierId!=''){
      this.actingmatPlanService.getBrandList(supplierId)
        .subscribe(
          res => {
            this.searchBrandList = res.data;
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.searchBrandList = [];
      this.search.brandId = '';
      this.getActingByTerms()
    }
  }

  getBrandList(supplierId): any{
    this.actingmatPlanService.getBrandList(supplierId)
      .subscribe(
        res => {
          this.currentBrandList = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  checkActingmatMonth(){
    if(this.checkSearchAllinput&&this.search.actingMatMonth){
      if(!this.checkSearchMonth(this.search.actingMatMonth)){
        this.actingmatMonthCheck = null;
      }else {
        this.actingmatMonthCheck = '请输入正确月份格式，例如：2017-01。';
      }
    }else{
      this.actingmatMonthCheck = null;
    }
  }

  getActingByTerms(): void{
    let searchActingDto = new SearchActingDto;
    searchActingDto.supplierId = this.search.supplierId;
    searchActingDto.brandId = this.search.brandId;
    if(!this.actingmatMonthCheck){
      searchActingDto.actingMatMonth = this.search.actingMatMonth;
    }
    this.actingmatPlanService.getActingByTerms(searchActingDto)
      .subscribe(
        res => {
          this.data = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  renderSearch() {
    if(this.search.supplierId||this.search.brandId||this.search.actingMatMonth){
      return false;
    }else{
      return true;
    }
  }

  noSearch() {
    if(!this.search.supplierId&&!this.search.brandId&&!this.search.actingMatMonth){
      this.checkSearchAllinput = false;
      this.actingmatMonthCheck = null;
      this.getActingMats();
    }
  }

  checkValueId(number): boolean{
    if(number!=null){
      const reg = new RegExp('^(0|[0-9][0-9]*)$');
      if(number.length==2 && number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkSearchMonth(number): boolean{
    if(number!=null){
      const reg = new RegExp('^(\\d{4})-(0\\d{1}|1[0-2])$');
      if(number.length==7 && number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkSort(number): boolean{
    if(number!=null){
      if(number>=0){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

}

