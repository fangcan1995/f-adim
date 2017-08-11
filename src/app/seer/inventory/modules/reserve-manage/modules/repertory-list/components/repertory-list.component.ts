import {
  Component, ViewEncapsulation, OnInit, ViewChild, Renderer, EventEmitter, ElementRef,
  OnDestroy
} from '@angular/core';
import {Json} from "../../../../../../login/Json";
import {SearchRepertoryDto} from "../SearchRepertoryDto";
import {RepertoryListTableService} from "../repertory-list-table.service";
import {
  DynamicComponentLoader,
  DynamicComponentParam
} from "../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GoodsManageService} from "../../../../../../basic_info/modules/goods-manage/goods-manage.service";
import {GlobalState} from "../../../../../../../global.state";
import {ListGoodDetailsDialogComponent} from "./good-details/list-goods-detail.component";
import {BaseService} from "../../../../../../base.service";
import {BrandManageService} from "../../../../../../basic_info/modules/brand-manage/brand-manage.service";
import {REPERTORYLIST_TRANSLATE} from "./repertory-list.translate";
import {StorageArea} from "../../../../../../model/basic_info/StorageArea";
import {Storage} from "../../../../../../model/basic_info/Storage";
import {log} from "util";
import {RepertoryListTableDto} from "../RepertoryListTableDto";
import {TREE_PERMISSIONS} from "../../../../../../../theme/modules/seer-tree/constants/permissions";
import {jsonTree} from "../../../../../../../theme/utils/json-tree";
import {TREE_EVENTS} from "../../../../../../../theme/modules/seer-tree/constants/events";
import {StorageRepertoryListComponent} from "./storageList/storage-repertory-list.component";


@Component({
  selector: 'repertoryListComponent',
  templateUrl: './repertory-list.Component.html',
  styleUrls: ['./repertory-list.component.scss','./repertorylisthead.component.css'],
  providers: [RepertoryListTableService,GoodsManageService,BaseService,BrandManageService],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [ListGoodDetailsDialogComponent,StorageRepertoryListComponent]
})
export class RepertoryListComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this._state.unsubscribe(this.GOODSDETAIL);
  }

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  loadStorageList() {
    this.dynamicComponentLoader.loadComponent(StorageRepertoryListComponent);
  }

  title = '查询结果列表';
  updateTitle = '';
  GOODSDETAIL = "goodsDetail";
  translate = REPERTORYLIST_TRANSLATE;
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
  currentRepertory: RepertoryListTableDto;
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
      key:'supplierName',
      label:'供应商',
    },
    {
      key:'brandName',
      label:'品牌',
    },
    {
      key:'boxRule',
      label:'箱规',
    },
    {
      key:'goodsCtnSize',
      label:'包装大小',
    },
    {
      key:'goodsSeries',
      label:'系列编号',
    },
    {
      key:'goodsType',
      label:'商品分类',
    },
    {
      key:'isGift',
      label:'是否是赠品',
    },
    {
      key:'isMaterial',
      label:'是否是物料',
    },
    {
      key:'goodsWeight',
      label:'重量',
    },
    {
      key:'goodsVolume',
      label:'体积',
    },
    {
      key:'goodsPrice',
      label:'进价',
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
      key:'cqkcsl',
      label:'期初库存数量',
    },
    {
      key:'cqkccb',
      label:'期初库存成本',
    },
    {
      key:'mqkcsl',
      label:'期末库存数量',
    },
    {
      key:'mqkccb',
      label:'期末库存成本',
    },
    {
      key:'bdkcsl',
      label:'变动库存数量',
    },
    {
      key:'bdkcje',
      label:'变动库存金额',
    },
    {
      key:'ztkcsl',
      label:'在途库存数量',
    },
    {
      key:'ztkcje',
      label:'在途库存金额',
    },
    {
      key:'djkcsl',
      label:'冻结库存数量',
    },
    {
      key:'djkcje',
      label:'冻结库存金额',
    },
    {
      key:'kykcsl',
      label:'可以库存数量',
    },
    {
      key:'kykccb',
      label:'可用库存成本',
    },
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
      key:'supplierName',
      label:'供应商',
    },
    {
      key:'brandName',
      label:'品牌',
    },
    {
      key:'boxRule',
      label:'箱规',
    },
    {
      key:'goodsCtnSize',
      label:'包装大小',
    },
    {
      key:'goodsSeries',
      label:'系列编号',
    },
    {
      key:'goodsType',
      label:'商品分类',
    },
    {
      key:'isGift',
      label:'是否是赠品',
    },
    {
      key:'isMaterial',
      label:'是否是物料',
    },
    {
      key:'goodsWeight',
      label:'重量',
    },
    {
      key:'goodsVolume',
      label:'体积',
    },
    {
      key:'goodsPrice',
      label:'进价',
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
      key:'cqkcsl',
      label:'期初库存数量',
    },
    {
      key:'cqkccb',
      label:'期初库存成本',
    },
    {
      key:'mqkcsl',
      label:'期末库存数量',
    },
    {
      key:'mqkccb',
      label:'期末库存成本',
    },
    {
      key:'bdkcsl',
      label:'变动库存数量',
    },
    {
      key:'bdkcje',
      label:'变动库存金额',
    },
    {
      key:'ztkcsl',
      label:'在途库存数量',
    },
    {
      key:'ztkcje',
      label:'在途库存金额',
    },
    {
      key:'djkcsl',
      label:'冻结库存数量',
    },
    {
      key:'djkcje',
      label:'冻结库存金额',
    },
    {
      key:'kykcsl',
      label:'可以库存数量',
    },
    {
      key:'kykccb',
      label:'可用库存成本',
    },
  ];


  constructor(private repertoryCheckService: RepertoryListTableService, private _state: GlobalState){
    // /*弹出商品详情页面订阅事件*/
    // this._state.subscribe(this.GOODSDETAIL, (param) => {
    //   this.openModal(param);
    // });
    _state.subscribe('getStorageById',(data)=>{
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
    this.repertoryCheckService.getRepertoryList()
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
      this.dynamicComponentLoader.loadComponent(ListGoodDetailsDialogComponent,{goods: message.data});
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
      this.repertoryCheckService.getRepertoryListByTerms(searchRepertoryDto)
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

