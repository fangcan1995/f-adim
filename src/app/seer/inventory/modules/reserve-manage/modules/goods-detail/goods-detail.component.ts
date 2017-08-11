import {Component} from "@angular/core";
import {GoodsDetailService} from "./goods-detail.service";
import {GoodsManageService} from "../../../../../basic_info/modules/goods-manage/goods-manage.service";
import {BaseService} from "../../../../../base.service";
import {BrandManageService} from "../../../../../basic_info/modules/brand-manage/brand-manage.service";
@Component({
  selector: 'storage-manage',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.css'],
  providers: [GoodsManageService,BaseService,BrandManageService],
})
export class GoodsDetailComponent {
  goodsList;
  brandIdDict = [];
  search = {
    brandId:'',
    goodsType:'',
    isGift:'',
    isMaterial:''
  };
  titles = [
    {key:'goodsName', label:'商品名称'},
    {key:'supplierName', label:'所属供应商'},
    {key:'brandName', label:'所属品牌'},
    {key:'goodsNumber', label:'商品编号'},
    {key:'goodsBarCode', label:'商品条形码'},
    {key:'goodsUnits', label:'基本单位'},
    {key:'boxRule', label:'箱规'},
    {key:'goodsVolume', label:'体积'},
    {key:'goodsLength', label:'长度'},
    {key:'goodsWidth', label:'宽度'},
    {key:'goodsHeight', label:'高度'},
    {key:'goodsType', label:'商品分类',isDict: true},
    {key:'goodsPrice', label:'进价'},
    {key:'goodsRetailPrice', label:'建议零售价'},
    {key:'goodsState', label:'商品状态',isDict: true},
    {key:'goodsSeries', label:'商品系列',isDict: true},
    {key:'isGift', label:'是否赠品',isDict: true},
    {key:'isMaterial', label:'是否物料',isDict: true},
  ];
  constructor(private goodsManageService:GoodsManageService,private goodsDetailService:GoodsDetailService, private baseService:BaseService<any>, private brandService: BrandManageService) {
  }

  ngOnInit() {
    this.goodsList = [];
    this.getGoodsList({});
    /*查询所有品牌名称*/
    this.goodsManageService.getBrand().then((result) => {
      this.brandIdDict = result.data;
    });
  }

  getGoodsList(param){
    if(!param) param = {};
    this.goodsManageService.searchGoods(param).then((res) => {
      this.goodsList = res.data;
    });
  }

  searchGoods(){
    this.getGoodsList(this.search);
  }

  reset(){
    this.search = {
      brandId:'',
      goodsType:'',
      isGift:'',
      isMaterial:''
    };
    this.getGoodsList({});
  }

}


