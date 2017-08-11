import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
import {BrandManageService} from "../../../brand-manage/brand-manage.service";
import {Goods} from "../../../../../model/basic_info/goods";
/**
 * Created by Administrator on 2017/1/6.
 */
@Component({
  selector: 'goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GoodsDetailDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  title: string = "商品详情";
  goodsDetail: Goods = new Goods();
  goodsId: string;
  goodsTypeDict = [];
  goodsSeriesDict = [];
  goodsCtnSizeDict = [];
  terminalSource = []; //终端字段数组
  customFieldsList = []; //自定义字段数组

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service: GoodsManageService, private brandManageService: BrandManageService, private _state: GlobalState) {
    super();
  }

  ngOnInit(){
    /*字典查询商品系列*/
    this.service.getDictByKey("GOODS_TYPE").then((result) => {
      this.goodsTypeDict = result.data;
    });
    /*字典查询商品分类*/
    this.service.getDictByKey("GOODS_SERIES").then((result) => {
      this.goodsSeriesDict = result.data;
    });
    /*字典查询包装大小*/
    this.service.getDictByKey("GOODS_CTN_SIZE").then((result) => {
      this.goodsCtnSizeDict = result.data;
    });
    this.goodsId = this.data.goods.id;
    this.getGoodsById(this.goodsId);
  }

  /*查询商品信息*/
  getGoodsById(goodsId: string) {
    this.service.getGoodsById(goodsId).then((result) => {
      this.goodsDetail = result.data;
      this.terminalSource = result.data.storeInfo;
      this.customFieldsList = result.data.extendField;
      let goodsSeriesId = result.data.goodsSeries;
      let goodsSeries = "";
      if(this.goodsSeriesDict.length){
        this.goodsSeriesDict.forEach(function(item){
          if(item.dictValueId == goodsSeriesId){
            goodsSeries = item.dictValueName;
          }
        });
        this.goodsDetail.goodsSeries = goodsSeries;
      }
      let goodsTypeId = result.data.goodsType;
      let goodsType = "";
      if(this.goodsTypeDict.length){
        this.goodsTypeDict.forEach(function(item){
          if(item.dictValueId == goodsTypeId){
            goodsType = item.dictValueName;
          }
        });
        this.goodsDetail.goodsType = goodsType;
      }
      let goodsCtnSizeId = result.data.goodsCtnSize;
      let goodsCtnSize = "";
      if(this.goodsCtnSizeDict.length){
        this.goodsCtnSizeDict.forEach(function(item){
          if(item.dictValueId == goodsCtnSizeId){
            goodsCtnSize = item.dictValueName;
          }
        });
        this.goodsDetail.goodsCtnSize = goodsCtnSize;
      }
    });
  }

}
