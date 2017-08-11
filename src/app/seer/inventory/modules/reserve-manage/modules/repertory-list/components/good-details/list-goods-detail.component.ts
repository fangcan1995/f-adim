import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {BaseModalComponent} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../../../theme/components/ng2-bs4-modal/modal";
import {Goods} from "../../../../../../../model/basic_info/goods";
import {GoodsManageService} from "../../../../../../../basic_info/modules/goods-manage/goods-manage.service";
/**
 * Created by Administrator on 2017/1/6.
 */
@Component({
  selector: 'list-goods-detail',
  templateUrl: './list-goods-detail.component.html',
  styleUrls: ['./list-goods-detail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListGoodDetailsDialogComponent extends BaseModalComponent implements OnInit{

  @ViewChild(ModalComponent) modal: ModalComponent;

  title: string = "商品详情";
  goodsDetail: Goods = new Goods();
  goodsId: string;
  goodsTypeDict = [];
  goodsSeriesDict = [];
  terminalSource = []; //终端字段数组
  customFieldsList = []; //自定义字段数组

  animation: boolean = true;
  backdrop: string | boolean = true;

  constructor(private service?: GoodsManageService) {
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
    this.goodsId = this.data.goods.goodsId;
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
    });
  }

}
