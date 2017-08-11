import {
  Component, ViewEncapsulation, OnInit, ViewChild, Renderer, EventEmitter, ElementRef,
  OnDestroy
} from '@angular/core';
import {Json} from "../../../../../../login/Json";
import {SearchRepertoryDto} from "../SearchRepertoryDto";
import {RepertoryCheckService} from "../repertory-check.service";
import {
  DynamicComponentLoader,
  DynamicComponentParam
} from "../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GoodsManageService} from "../../../../../../basic_info/modules/goods-manage/goods-manage.service";
import {GlobalState} from "../../../../../../../global.state";
import {GoodDetailsDialogComponent} from "./good-details/goods-detail.component";
import {BaseService} from "../../../../../../base.service";
import {BrandManageService} from "../../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {REPERTORYCHECK_TRANSLATE} from "./repertory.translate";
import {StorageArea} from "../../../../../../model/basic_info/StorageArea";
import {Storage} from "../../../../../../model/basic_info/Storage";
import {log} from "util";
import {RepertoryCheckDto} from "../RepertoryCheckDto";
import {TREE_PERMISSIONS} from "../../../../../../../theme/modules/seer-tree/constants/permissions";
import {jsonTree} from "../../../../../../../theme/utils/json-tree";
import {TREE_EVENTS} from "../../../../../../../theme/modules/seer-tree/constants/events";
import {StoragesListComponent} from "./storageList/storage-list.component";


@Component({
  selector: 'repertoryComponent',
  templateUrl: './repertory.Component.html',
  styleUrls: ['./repertory.component.scss','./repertoryhead.component.css'],
  providers: [RepertoryCheckService,GoodsManageService,BaseService,BrandManageService],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [GoodDetailsDialogComponent,StoragesListComponent]
})
export class RepertoryComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this._state.unsubscribe(this.GOODSDETAIL);
  }

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  loadStorageList() {
    this.dynamicComponentLoader.loadComponent(StoragesListComponent);
  }

  title = '查询结果列表';
  updateTitle = '';
  GOODSDETAIL = "goodsDetail";
  translate = REPERTORYCHECK_TRANSLATE;
  goodsList=[];
  search = {
    goodsName:'',
    validity:'0',
    storageId: '',
  };
  searchStorages: Storage;
  repertoryGoodsNumber = '';
  errorMessage;
  data = [];
  json = Json;
  currentRepertory: RepertoryCheckDto;
  checkAllinput = false;

  storageName;

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


  constructor(private repertoryCheckService: RepertoryCheckService, private _state: GlobalState){
    // /*弹出商品详情页面订阅事件*/
    // this._state.subscribe(this.GOODSDETAIL, (param) => {
    //   this.openModal(param);
    // });
    this._state.subscribe('getRepertorys',(data)=>{
      if(data == true){
        this.getRepertorys();
      }
    })
    _state.subscribe('getStorageId',(data)=>{
      if(data!=null){
        this.storageName = data.storageName;
        this.search.storageId = data.id;
      }
    })
  }

  ngOnInit() {
    this.getRepertorys();
  }

  // public openModal(data) {
  //   this.dynamicComponentLoader.loadComponent(data.component, data.data);
  // }

  checkAllInput(){
    this.checkAllinput = true;
  }

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
      this.updateTitle='修改库存信息'+'('+'库房：'+message.data.storageName+'，商品名称：'+message.data.goodsName+')';
      this.currentRepertory = message.data;
      this.checkAllinput = false;
    }
    if(message.type=='link'){
      this.dynamicComponentLoader.loadComponent(GoodDetailsDialogComponent,{goods: message.data});
    }
    if(message.type=='delete'){
      this.repertoryCheckService.deleteRepertoryCheck(message.data.id)
        .subscribe(
          res => {
            this.getRepertorys();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  saveRepertory(): void{
    if(this.currentRepertory.id){
      this.repertoryCheckService.updateRepertoryCheck(this.currentRepertory)
        .subscribe(
          res => {
            this.currentRepertory = null;
            this.checkAllinput = false;
            this.updateTitle = '';
            this.getRepertorys();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  cancel(): void{
    this.currentRepertory = null;
    this.checkAllinput = false;
    this.repertoryGoodsNumber = '';
    this.getRepertorys();
    this.search.goodsName = '';
    this.search.validity = '0';
    this.search.storageId = '';
    this.storageName = '';
  }

  renderSearch() {
    if(this.search.goodsName||this.search.storageId||this.search.validity!='0'){
      return false;
    }else{
      return true;
    }
  }

  noSearch() {
    if(!this.search.goodsName&&!this.search.storageId&&this.search.validity=='0'){
      this.getRepertorys();
    }
  }

  getStaffByTerms(): void{
      let searchRepertoryDto = new SearchRepertoryDto;
      searchRepertoryDto.storageId = this.search.storageId;
      searchRepertoryDto.validity = this.search.validity;
      searchRepertoryDto.goodsName = this.search.goodsName;
      console.log(searchRepertoryDto);
      this.repertoryCheckService.getRepertoryByTerms(searchRepertoryDto)
        .subscribe(
          res => {
            this.data = res.data;
          },
          error =>  this.errorMessage = <any>error);
  }

  checkGoodsNum(number): boolean{
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

