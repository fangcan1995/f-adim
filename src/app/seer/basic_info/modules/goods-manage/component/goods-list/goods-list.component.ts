import {ViewEncapsulation, Component, OnInit, ViewChild} from "@angular/core";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
import {Router} from "@angular/router";
import {
  DynamicComponentLoader,
  DynamicComponentParam
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GoodsDetailDialogComponent} from "../goods-detail/goods-detail.component";
import {GOODS_DICT_DATA} from "../dictData";

/**
 * Created by Administrator on 2017/1/4.
 */
@Component({
  selector: 'goods-list',
  templateUrl: './goods-list.component.html',
  providers: [GoodsManageService],
  styleUrls: ['./goods-list.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [GoodsDetailDialogComponent]
})
export class GoodsListComponent implements OnInit{
  title = '商品管理';
  translate = {};
  GOODSDETAIL = "goodsDetail";
  UPDATEGOODSLIST = 'updateGoodsList';
  source = [];

  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  titles = [
    {key:'goodsName', label:'商品名称', type: 'link'},
    {key:'supplierName', label:'所属供应商'},
    {key:'brandName', label:'所属品牌'},
    {key:'goodsNumber', label:'商品编号'},
    {key:'goodsType', label:'商品分类'},
    {key:'isGift', label:'是否赠品'},
    {key:'isMaterial', label:'是否物料'}
  ];

  constructor(private service: GoodsManageService, private _router: Router, private _state: GlobalState) {
    this._state.subscribe(this.UPDATEGOODSLIST, (param) => {
      this.goodsList(param);
    });
    /*弹出商品详情页面订阅事件*/
    this._state.subscribe(this.GOODSDETAIL, (param) => {
      this.openModal(param);
    });
  }

  /*初始化*/
  ngOnInit() {
    this.translate = GOODS_DICT_DATA;
    let param = {};
    this.goodsList(param);
  }

  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component, data.data);
  }

  /*弹出商品详情模态窗口*/
  popupDetail(event): void {
    let param: DynamicComponentParam = {component: GoodsDetailDialogComponent, data: {goods: event, title:'新增用户', flag: '0'} };
    this._state.notify(this.GOODSDETAIL, param);
  }

  /*商品信息列表*/
  goodsList(param) {
    this.service.searchGoods(param).then((result) => {
      this.source = result.data;
    });
  }

  onChange(message):void {
    if(message.type == 'link'){
      this.popupDetail(message.data);
    }
    if(message.type == 'add'){ //新增
      this._router.navigate(['/seer/basic/goods-manage/add']);
    }
    if(message.type == 'update'){ //修改
      this._router.navigate(['/seer/basic/goods-manage/edit', message.data.id]);
    }
    if(message.type == 'delete'){ //删除
      this.service.deleteGoods(message.data.id).then((param) => {
        if (param.success) {
          let param = {};
          this.goodsList(param);
        }
      })
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      this.service.batchDeleteGoods(ids).then((param) => {
        if (param.success) {
          let param = {};
          this.goodsList(param);
        }
      })
    }
    // if(message.type=='detail'){ //详情
    //   this.popupDetail(message.data);
    // }
  }

}
