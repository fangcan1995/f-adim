import {ViewEncapsulation, Component, OnInit} from "@angular/core";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
/**
 * Created by Administrator on 2017/1/4.
 */
@Component({
  selector: 'goods-operation',
  templateUrl: './goods-operation.component.html',
  providers: [GoodsManageService],
  styleUrls: ['./goods-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsOperationComponent implements OnInit{
  title = '查询区域';
  UPDATEGOODSLIST = 'updateGoodsList';
  brandId: string = '';
  goodsType: string = '';
  isGift: string = '';
  isMaterial: string = '';
  brandIdDict = [];
  goodsTypeDict = [];
  isGiftDict = [];
  isMaterialDict = [];

  constructor(private service: GoodsManageService, private _state: GlobalState){}

  ngOnInit(): void {
    /*查询所有品牌名称*/
    this.service.getBrand().then((result) => {
      this.brandIdDict = result.data;
    });
    /*字典查询供商品分类*/
    this.service.getDictByKey("GOODS_TYPE").then((result) => {
      this.goodsTypeDict = result.data;
    });
    /*字典查询供商品分类*/
    this.service.getDictByKey("IS_GIFT").then((result) => {
      this.isGiftDict = result.data;
    });
    /*字典查询供商品分类*/
    this.service.getDictByKey("IS_MATERIAL").then((result) => {
      this.isMaterialDict = result.data;
    });
  }

  /*查询*/
  searchGoods() {
    let param = {
      "brandId": this.brandId,
      "goodsType": this.goodsType,
      "isGift": this.isGift,
      "isMaterial": this.isMaterial
    };
    this._state.notify(this.UPDATEGOODSLIST, param);
  }

  /*重置*/
  reset() {
    this.brandId = "";
    this.goodsType = "";
    this.isGift = "";
    this.isMaterial = "";
    this.searchGoods();
  }

}
