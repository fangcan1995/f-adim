import {
  Component, ViewEncapsulation, OnInit, ViewChild, Renderer, EventEmitter, ElementRef,
  OnDestroy
} from '@angular/core';
import {Json} from "../../../../../../login/Json";
import {SearchAllocationRepertoryDto} from "../SearchAllocationRepertoryDto";
import {AllocationRepertoryCheckService} from "../allocation-repertory-check.service";
import {
  DynamicComponentLoader
} from "../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GoodsManageService} from "../../../../../../basic_info/modules/goods-manage/goods-manage.service";
import {GlobalState} from "../../../../../../../global.state";
import {BaseService} from "../../../../../../base.service";
import {BrandManageService} from "../../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {MoveRepertoryComponent} from "./move-repertory/move-repertory.component";
import {ALLOCATION_REPERTORYCHECK_TRANSLATE} from "./allocation.repertory.translate";
import {Supplier} from "../../../../../../model/basic_info/supplier";
import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {AllocationGoodsDialogComponent} from "./good-details/allocation-goods.component";


@Component({
  selector: 'allocationRepertoryComponent',
  templateUrl: './allocation.repertory.Component.html',
  styleUrls: ['./allocation.repertory.component.scss','./allocationrepertoryhead.component.css'],
  providers: [AllocationRepertoryCheckService,GoodsManageService,BaseService,BrandManageService],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [AllocationGoodsDialogComponent,MoveRepertoryComponent]
})
export class AllocationRepertoryComponent implements OnInit,OnDestroy{
  //详情因为事件名重复已经订阅了报错，之后添加了这个销毁订阅事件，取消了订阅 直接执行事件
  ngOnDestroy(): void {
    this._state.unsubscribe(this.GOODSDETAIL);
    this._state.unsubscribe(this.GOODSLIST);
  }

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  title = '查询结果列表';
  GOODSDETAIL = "goodsDetail";
  GOODSLIST = 'goodsList';
  searchType = '00';
  translate = ALLOCATION_REPERTORYCHECK_TRANSLATE;
  goodsList=[];
  search = {
    goodsName:'',
    goodsBarCode:'',
    brandList: [],
  };
  supplier: Supplier;
  suppliersData = [];
  brands = [];
  brandOutList = [];
  //下面两个为多个checkbox选择插件配置
  dropdownSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  myRepertoryTexts: IMultiSelectTexts = {
    checkAll: '选中所有',
    uncheckAll: '取消所有',
    checked: '个选中',
    checkedPlural: '个选中',
    searchPlaceholder: '搜索...',
    defaultTitle: '选择品牌',
  };
  private brandsData: IMultiSelectOption[] = [];
  repertoryGoodsNumber = '';
  errorMessage;
  data = [];
  json = Json;
  currentRepertory = [];
  titles = [
    {
      key:'goodsNumber',
      label:'商品编号',
      type: 'link',
    },
    {
      key:'goodsBarCode ',
      label:'条形码',
    },
    {
      key:'goodsName',
      label:'商品名称',
    },
    {
      key:'goodsNum',
      label:'数量(个)',
    },
    {
      key:'goodsPrice',
      label:'成本价(元)',
    },
    {
      key:'storageName',
      label:'库房',
    },
    {
      key:'validityDate',
      label:'有效期',
      type: 'date',
    }
  ];

  titleOption =[
    {
      key:'goodsNumber',
      label:'商品编号',
      type: 'link',
    },
    {
      key:'goodsBarCode ',
      label:'条形码',
    },
    {
      key:'goodsName',
      label:'商品名称',
    },
    {
      key:'goodsNum',
      label:'数量(个)',
    },
    {
      key:'goodsPrice',
      label:'成本价(元)',
    },
    {
      key:'storageName',
      label:'库房',
    },
    {
      key:'validityDate',
      label:'有效期',
      type: 'date',
    },
    {
      key:'validityType',
      label:'效期类型',
    },
    {
      key:'storageAdress ',
      label:'库房地址',
    },
    {
      key:'storageType',
      label:'库房类型',
    },
    {
      key:'storageState',
      label:'库房状态',
    },
    {
      key:'goodsType',
      label:'商品分类',
    },
    {
      key:'goodsSeries',
      label:'系列编号',
    },
    {
      key:'goods2dCode',
      label:'商品二维码',
    },
    {
      key:'goodsUnits',
      label:'基本单位',
    },
    {
      key:'boxRule',
      label:'箱规',
    },
    {
      key:'goodsVolume ',
      label:'体积',
    },
    {
      key:'goodsLength',
      label:'长',
    },
    {
      key:'goodsWidth',
      label:'宽',
    },
    {
      key:'goodsHeight',
      label:'高',
    },
    {
      key:'goodsPacking',
      label:'包装系数',
    },
    {
      key:'goodsWeight',
      label:'重量',
    },
    {
      key:'goodsRetailPrice',
      label:'建议零售价',
    },
    {
      key:'goodsState ',
      label:'商品状态',
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
      type: 'date',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
      type: 'date',
    }
  ];


  constructor(private repertoryCheckService: AllocationRepertoryCheckService, private _state: GlobalState){
    //这里取消订阅
    // /*弹出商品详情页面订阅事件*/
    // this._state.subscribe(this.GOODSDETAIL, (param) => {
    //   this.openModal(param);
    // });
    // /*弹出转仓商品列表*/
    // this._state.subscribe(this.GOODSLIST, (param) => {
    //   this.openListModal(param);
    // });
    this._state.subscribe('getRepertorys',(data)=>{
      if(data == true){
        this.getRepertorys();
      }
    })
  }

  ngOnInit() {
    this.getRepertorys();
    this.getSuppliers();
  }

  //取消加载 到方法中更直接调用
  // public openModal(data) {
  //   this.dynamicComponentLoader.loadComponent(data.component, data.data);
  // }
  //
  // public openListModal(data) {
  //   this.dynamicComponentLoader.loadComponent(data.component, data.data);
  // }

  //请求service
  getRepertorys(): void {
    this.repertoryCheckService.getRepertorys()
      .subscribe(
        res => {
          this.data = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {//TODO 添加移库方法
    if(message.type=='update'){
      this.currentRepertory = message.data;
    }
    if(message.type=='link'){
      //这里直接加载model
      // let param: DynamicComponentParam = {component: AllocationGoodsDialogComponent, data: {goods: message.data} };
      //this._state.notify(this.GOODSDETAIL,param);//下面加载component时候会报错需要到component里面的service变量后加?到AllocationGoodsDialogComponent中查看即可。
      this.dynamicComponentLoader.loadComponent(AllocationGoodsDialogComponent, {goods: message.data});
    }
    if(message.type=='select_item'){
      this.goodsList = message.data;
      // let param: DynamicComponentParam = {component: MoveRepertoryComponent, data: {goods: this.goodsList}};
      // this._state.notify(this.GOODSLIST,param);
      this.dynamicComponentLoader.loadComponent(MoveRepertoryComponent, {goods: this.goodsList});
    }
  }

  onChangeColonne(event): void {
    this.search.brandList = event;
  }

  isBrand(){
    if(this.searchType == '02'){
      this.getSuppliers();
      this.search.goodsBarCode = '';
      this.search.goodsName = '';
    }
    if(this.searchType == '00'){
      this.search.brandList = [];
      this.search.goodsBarCode = '';
    }
    if(this.searchType == '01'){
      this.search.brandList = [];
      this.search.goodsName = '';
    }
  }

  cancel(): void{
    this.currentRepertory = [];
    this.repertoryGoodsNumber = '';
    this.getRepertorys();
    this.search.goodsName = '';
    this.search.goodsBarCode = '';
    this.search.brandList = [];
    this.getSuppliers();
  }

  renderSearch() {
    if(this.search.goodsName||this.search.brandList.length!=0||this.search.goodsBarCode){
      return false;
    }else{
      return true;
    }
  }

  noSearch() {
    if(!this.search.goodsName&&!this.search.goodsBarCode&&this.search.brandList.length==0){
      this.getRepertorys();
    }
  }

  getSuppliers(): void{
    this.repertoryCheckService.getAllSuppliers()
      .subscribe(
        res => {
          this.suppliersData = res.data;
          this.supplier = null;
          this.supplier = {supplierName:'请选择'};
          this.suppliersData.push(this.supplier);
          // this.searchStorageAreas = null;
          // this.searchStorageAreas = {storageAreaName:'请选择'};
          // this.searchStorageAreaData.push(this.searchStorageAreas);
          // console.log(this.searchStoragesData)
        },
        error =>  this.errorMessage = <any>error)
  }

  getBrands(brandId): void{
    this.repertoryCheckService.getBrandsById(brandId)
      .subscribe(
        res => {
          let mulitiColloneArray = [];
          let mulitiColloneOptions = [];
          this.brands.forEach(function (title) {
            mulitiColloneOptions.push(title.key);
          });
          if(res.data){
            res.data.forEach(function (brand) {
              mulitiColloneArray.push({id: brand.id, name: brand.brandName});
            });
          }
          this.brandsData = mulitiColloneArray;
          this.brandOutList = mulitiColloneOptions;
        },
        error =>  this.errorMessage = <any>error)
  }

  getAllocationRepertoryByTerms(): void{
      let searchAllocationRepertoryDto = new SearchAllocationRepertoryDto;
      searchAllocationRepertoryDto.goodsBarCode = this.search.goodsBarCode;
      searchAllocationRepertoryDto.goodsName = this.search.goodsName;
      searchAllocationRepertoryDto.brandList = this.search.brandList;
      this.repertoryCheckService.getAllocationRepertoryByTerms(searchAllocationRepertoryDto)
        .subscribe(
          res => {
            this.data = res.data;
          },
          error =>  this.errorMessage = <any>error);
  }

}

