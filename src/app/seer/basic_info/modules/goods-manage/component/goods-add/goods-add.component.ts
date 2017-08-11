import {ViewEncapsulation, Component, OnInit, ViewChild, ElementRef, Renderer, EventEmitter} from "@angular/core";
import {GoodsManageService} from "../../goods-manage.service";
import {GlobalState} from "../../../../../../global.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Goods} from "../../../../../model/basic_info/goods";
import {
  DynamicComponentParam,
  DynamicComponentLoader
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GoodsTerminalDialogComponent} from "../goods-terminal-dialog/goods-terminal-dialog";
import {BrandManageService} from "../../../brand-manage/brand-manage.service";
import {GoodsCustomFieldsDialogComponent} from "../goods-add-customFields/goods-add-customFields.component";
import {Ng2Uploader} from "ng2-uploader";
/**
 * Created by Administrator on 2017/1/4.
 */
@Component({
  selector: 'goods-add',
  templateUrl: './goods-add.component.html',
  providers: [GoodsManageService, Ng2Uploader],
  styleUrls: ['./goods-add.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [GoodsTerminalDialogComponent, GoodsCustomFieldsDialogComponent]
})
export class GoodsAddComponent implements OnInit{
  title: string;
  TERMINALEVENT = "terminal";
  SAVETERMINALEVENT = 'saveTerminal';
  EDITTERMINALEVENT = 'editTerminal';
  CUSTOMFIELDSEVENT = "customfields";
  SAVECUSTOMFIELDSEVENT = "saveCustomFields";
  goodsId: string;
  addFlag: boolean;
  goods: Goods = new Goods();
  goodsTypeDict = [];
  goodsSeriesDict = [];
  goodsCtnSizeDict = [];
  isGiftDict = [];
  isMaterialDict = [];
  currentBrands = []; //品牌数组
  currentBrandList = []; //当前供应商下所有品牌数组
  terminalSource = []; //终端字段数组
  customFieldsList = []; //自定义字段数组
  currentSupplierId: string;
  buttonFlag = true;

  checkAllInput = false;

  /*上传图片变量*/
  imageError;
  canDelete:boolean = true;
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public picture = 'assets/img/app/profile/Nasta.png';
  public uploaderOptions:any = {};
  public uploadInProgress:boolean = false;
  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  terminalTitles = [
    {key:'terminalName', label:'终端名称'},
    {key:'terminalCode', label:'终端编码'},
    {key:'terminalPrice', label:'终端价格'}
    // ,
    // {key:'variableValenceTheme', label:'变价主题'},
    // {key:'variableValenceAmount', label:'变价商品数量'},
    // {key:'variableValencePrice', label:'变价价格'},
    // {key:'variableValenceTime', label:'变价时段',}
  ];

  constructor(private _activatedRoute: ActivatedRoute, private brandManageService: BrandManageService,
              private service: GoodsManageService, private _state: GlobalState, private _router: Router,
              protected _uploader: Ng2Uploader, private renderer: Renderer){
    /*弹出终端添加/修改页面订阅事件*/
    this._state.subscribe(this.TERMINALEVENT, (param) => {
      this.openModal(param);
    });
    /*弹出自定义字段添加页面订阅事件*/
    this._state.subscribe(this.CUSTOMFIELDSEVENT, (param) => {
      this.openModal(param);
    });
    /*新增商品自定义字段订阅事件*/
    this._state.subscribe(this.SAVECUSTOMFIELDSEVENT, (param) => {
      this.customFieldsList.push(param);
    });
    /*新增终端订阅事件*/
    this._state.subscribe(this.SAVETERMINALEVENT, (param) => {
      this.terminalSource.push(param);
    });
    /*修改终端订阅事件*/
    this._state.subscribe(this.EDITTERMINALEVENT, (param) => {
      this.terminalSource = param;
    });
  }

  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component, data.data);
  }

  /*弹出商品终端新增模态窗口*/
  popupTerminalAdd(): void {
    let param: DynamicComponentParam = {component: GoodsTerminalDialogComponent, data: {title:'新增终端', flag: '0'} };
    this._state.notify(this.TERMINALEVENT, param);
  }

  /*弹出商品终端修改模态窗口*/
  popupTerminalAlert(event, terminalSource): void {
    let param: DynamicComponentParam = {component: GoodsTerminalDialogComponent, data: {terminal: event, terminalSource: terminalSource,
      title:'修改终端', flag: '1'} };
    this._state.notify(this.TERMINALEVENT, param);
  }

  /*弹出自定义字段新增模态窗口*/
  popupCustomFieldsAdd(): void {
    let param: DynamicComponentParam = {component: GoodsCustomFieldsDialogComponent, data: {title:'新增自定义字段'} };
    this._state.notify(this.CUSTOMFIELDSEVENT, param);
  }

  ngOnInit(): void {
    /*查询所有商品品牌信息*/
    this.brandManageService.getBrand().then((result) => {
      this.currentBrands = result.data;
    });
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
    /*字典查询赠品FLAG*/
    this.service.getDictByKey("IS_GIFT").then((result) => {
      this.isGiftDict = result.data;
    });
    /*字典查询物料FLAG*/
    this.service.getDictByKey("IS_MATERIAL").then((result) => {
      this.isMaterialDict = result.data;
    });
    this._activatedRoute.params.subscribe((params) => {
      this.goodsId = params['id'];
      this.addFlag = !this.goodsId;
    });
    this.title = this.addFlag?'新增商品':'修改商品';

    if (!this.addFlag) {
      this.getGoodsById(this.goodsId);
      this.buttonFlag = false;
    } else {
      this.picture = 'assets/img/app/profile/Nasta.png';
    }
    if (this._canUploadOnServer()) {
      setTimeout(() => {
        this._uploader.setOptions(this.uploaderOptions);
      });

      this._uploader._emitter.subscribe((data) => {
        this._onUpload(data);
      });
    } else {
      console.warn('Please specify url parameter to be able to upload the file on the back-end');
    }
  }

  public onFiles():void {
    let files = this._fileUpload.nativeElement.files;
    if(files[0].size < 1048576){
      if(files[0].type == ("image/png")||
        files[0].type == ("image/jpeg")||
        files[0].type == ("image/jpg")||
        files[0].type == ("image/bmp")||
        files[0].type == ("image/gif")){
        this.imageError = false;
        if (files.length) {
          const file = files[0];
          this._changePicture(file);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>{
            this.goods.file = reader.result;
          };
          if (this._canUploadOnServer()) {
            this.uploadInProgress = true;
            this._uploader.addFilesToQueue(files);
          }
        }
      }else {
        this.imageError = "请您选择格式为jpeg、jpg、bmp、gif、png的图片。";
      }
    }else{
      this.imageError = "请您选择小于1Mb的图片。";
    }
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture():boolean {
    this.picture = '';
    return false;
  }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  protected _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

  /*查询修改商品信息*/
  getGoodsById(goodsId: string) {
    this.service.getGoodsById(goodsId).then((result) => {
      this.goods = result.data;
      this.picture = result.data.goodsPhoto;
      this.terminalSource = result.data.storeInfo;
      this.customFieldsList = result.data.extendField;
      this.currentSupplierId = result.data.supplierId;
      let currentBrandList = [];
      let supplierId = this.currentSupplierId;
      if(this.currentBrands.length){
        this.currentBrands.forEach(function(item){
          if(item.supplierId == supplierId){
            currentBrandList.push(item);
          }
        });
        this.currentBrandList = currentBrandList;
      }
    });
  }

  /*终端Table操作方法*/
  terminalOnChange(message):void {
    if(message.type == 'add'){ //新增
      this.popupTerminalAdd();
    }
    if(message.type == 'update'){ //修改
      this.popupTerminalAlert(message.data, this.terminalSource);
    }
    if(message.type == 'delete'){ //删除
      this.deleteTerminal(message.data.id, this.terminalSource);
    }
    if(message.type=='delete_all'){ //批量删除
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id);
      });
      for (let terminalId of ids) {
        this.deleteTerminal(terminalId, this.terminalSource);
      }
    }
  }

  /*删除终端*/
  deleteTerminal(terminalId, terminalSource):void {
    for (let i = 0; i < terminalSource.length; i++) {
      if (terminalId == terminalSource[i].id) {
        terminalSource.splice(i, 1);
      }
    }
  }

  onSelect(event){
    if(event.type == 'select'){
      this.currentSupplierId = event.data.id;
      this.goods.supplierName = event.data.supplierName;
      console.log(event.data);
      let currentBrandList = [];
      if(this.currentBrands.length){
        this.currentBrands.forEach(function(item){
          if(item.supplierId == event.data.id){
            currentBrandList.push(item);
          }
        });
        this.currentBrandList = currentBrandList;
      }
    }
  }

  /*删除自定义字段*/
  removeCustomFields(customFieldsId):void {
    for (let i = 0; i < this.customFieldsList.length; i++) {
      if (customFieldsId == this.customFieldsList[i].id) {
        this.customFieldsList.splice(i, 1);
      }
    }
  }

  /*返回信息列表*/
  cancel() {
    this.checkAllInput = false;
    this._router.navigate(['/seer/basic/goods-manage/']);
  }

  /*表单提交方法*/
  submitForm() {
    if(!this.buttonFlag){
      this.updateGoods();
    }else{
      this.saveGoods();
    }
  }

  allInput(){
    this.checkAllInput = true;
  }

  saveGoods():void {
    this.goods.extendField =  this.customFieldsList //自定义字段
    this.goods.storeInfo =  this.terminalSource //终端字段
    this.service.createGoods(this.goods).then((result) => {
      if(result.success) {
        this._router.navigate(['/seer/basic/goods-manage/']);
      }else{
        alert("添加失败~" + result.message);
        this._router.navigate(['/seer/basic/goods-manage/add']);
      }
      this.checkAllInput = false;
    });
  }

  updateGoods():void {
    this.goods.extendField =  this.customFieldsList //自定义字段
    this.goods.storeInfo =  this.terminalSource //终端字段
    this.service.updateGoods(this.goods).then((result) => {
      if(result.success) {
        this._router.navigate(['/seer/basic/goods-manage/']);
      }else{
        alert("更新失败~" + result.message);
        this._router.navigate(['/seer/basic/goods-manage/edit',this.goods.id]);
      }
      this.checkAllInput = false;
    });
  }

  /**
   * 长宽高计算体积
   */
  goodsVolumeCount() {
    if (typeof(this.goods.goodsLength) != "undefined" && typeof(this.goods.goodsWidth) != "undefined" && typeof(this.goods.goodsHeight) != "undefined") {
      this.goods.goodsVolume = this.goods.goodsLength * this.goods.goodsWidth * this.goods.goodsHeight;
    } else {
      this.goods.goodsVolume = 0;
    }
  }

  priceFormat(goodsPrice) {
    goodsPrice = parseFloat((goodsPrice + "").replace(/[^\d\.-]/g, "")).toFixed(4) + "";
    let l = goodsPrice.split(".")[0].split("").reverse();
    let r = goodsPrice.split(".")[1];
    let t = "";
    for(let i = 0; i < l.length; i ++ )
    {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    this.goods.goodsPrice = t.split("").reverse().join("") + "." + r;
  }

}
