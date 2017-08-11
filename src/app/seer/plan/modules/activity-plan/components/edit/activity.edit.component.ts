import {Component, Input, ViewChild, ElementRef, EventEmitter, Output, OnChanges, Renderer} from "@angular/core";
import {RoleManageService} from "../../../../../sys/modules/role-manage/role-manage.service";
import {ActivityPlanService} from "../../activity.plan.service";
import {ActingmatPlanService} from "../../../actingmat-plan/actingmat-plan.service";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {ModalDirective} from "ng2-bootstrap";
import {Ng2Uploader} from "ng2-uploader";
import {contractService} from "../../../../../basic_info/modules/contract-manage/contrat-manage.service";

@Component({
  selector: 'activity-edit',
  styleUrls: ['./activity.edit.component.scss'],
  templateUrl: './activity.edit.component.html',
  providers: [RoleManageService, ActingmatPlanService, contractService, Ng2Uploader],
})
export class ActivityEditComponent implements OnChanges {


  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() currentActivityPlan;
  @ViewChild('fileUpload') protected _fileUpload: ElementRef;
  onUpload: EventEmitter<any> = new EventEmitter();
  onUploadCompleted: EventEmitter<any> = new EventEmitter();
  showerror;
  activityPlanGoods = [];
  currentAttachments = [];
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  private myOptions: IMultiSelectOption[] = [];
  actingMatList = [];
  errorMessage;
  actingMatBudgets = [];
  brandGoods = [];
  alertAction;
  alertContent = '';
  budgetTitle = [
    {
      key: 'budgetName',
      label: '费用名称',
      type: 'text_input',
    },
    {
      key: 'budgetSubject',
      label: '费用科目',
      isDict: true,
    },
    {
      key: 'budgetAmountTotal',
      label: '关联代垫预算总金额(元)',
    },
    {
      key: 'budgetAmount',
      label: '费用金额(元)',
      type: 'text_input',
    },
    /*    {
     key:'budgetBalance',
     label:'剩余金额',
     },*/
    /*    {
     key:'storeName',
     label:'所属门店',
     },*/
  ];
  goodsTitles = [
    {
      key: 'goodsNumber',
      label: '商品编号',
    },
    {
      key: 'goodsName',
      label: '商品名称',
    },
    {
      key: 'goodsPrice',
      label: '商品进货价(元)',
    },
    {
      key: 'goodsRetailPrice',
      label: '商品零售价(元)',
    },
  ];


  activityPlanGoodsTitles = [
    {
      key: 'goodsNumber',
      label: '商品编号',
    },
    {
      key: 'goodsName',
      label: '商品名称',
    },
    {
      key: 'goodsPrice(元)',
      label: '商品进货价',
    },
    {
      key: 'goodsRetailPrice',
      label: '商品零售价(元)',
    },
    {
      key: 'goodsNum',
      label: '库存数量',
    },
    {
      key: 'activityDiscount',
      label: '活动折扣 %',
    },
    {
      key: 'activityDiscountPrice',
      label: '折扣价格(元)',
    },
    {
      key: 'activityDiscountNum',
      label: '商品数量',
    },
    {
      key: 'startTime',
      label: '开始时间',
    },
    {
      key: 'endTime',
      label: '结束时间',
    },
  ];

  constructor(private actingmatPlanService: ActingmatPlanService,
              private activityPlanService: ActivityPlanService
    , private contractService: contractService, private renderer: Renderer, protected _uploader: Ng2Uploader) {
  }


  ngOnChanges(currentActivityPlan) {
    if (this.currentActivityPlan.id) {

      this.contractService.getContractAttach(this.currentActivityPlan.id)
        .subscribe(
          res => {
            this.currentAttachments = res.data;

          },
          error => this.errorMessage = <any>error);


      if (this.currentActivityPlan.actingMatIds) {
        this.onChangeMatColonne(this.currentActivityPlan.actingMatIds,null);
      }
      if (this.currentActivityPlan.brandId) {
        this.activityPlanService.getGoodsByBrandId(this.currentActivityPlan.brandId)
          .subscribe(
            res => {
              this.brandGoods = res.data;
            },
            error => this.errorMessage = <any>error);
      }

      this.activityPlanService.getActivityGoodsByActivityId(this.currentActivityPlan.id)
        .subscribe(
          res => {
            this.activityPlanGoods = res.data;
          },
          error => this.errorMessage = <any>error);

      this.activityPlanService.getActivityBudgetsByActivityId(this.currentActivityPlan.id)
        .subscribe(
          res => {
            this.actingMatBudgets = res.data;
          },
          error => this.errorMessage = <any>error);

    }
  }

  ngOnInit() {
    this.actingmatPlanService.getActings()
      .subscribe(
        res => {
          let myOptions = [];
          if (res.data.length) {
            res.data.forEach(function (mat) {
              myOptions.push({id: mat.id, name: mat.actingMatName});
            })
          }
          this.actingMatList = myOptions;
        },
        error => this.errorMessage = <any>error);
  }


  onSelectBrand(event) {
    if (event.type == 'select') {
      this.currentActivityPlan.brandId = event.data.id;
      this.currentActivityPlan.brandName = event.data.brandName;

      this.activityPlanService.getGoodsByBrandId(event.data.id)
        .subscribe(
          res => {
            console.log('8888')
            console.log(res.data)
            //if (this.currentActivityPlan.id) {
            this.brandGoods = res.data;
            //}

          },
          error => this.errorMessage = <any>error);
    }
  }

  onSelectSupplier(event) {
    if (event.type == 'select') {
      this.currentActivityPlan.supplierId = event.data.id;
      this.currentActivityPlan.supplierName = event.data.supplierName;
    }

  }

  onSelectClient(event) {
    if (event.type == 'select') {
      this.currentActivityPlan.customerId = event.data.id;
      this.currentActivityPlan.customerName = event.data.customerName;

      this.activityPlanService.getStoresByCustomerId(event.data.id)
        .subscribe(
          res => {
            let myOptions = [];
            if (res.data.length) {
              res.data.forEach(function (store) {
                myOptions.push({id: store.id, name: store.storeName});
              })
            }
            this.myOptions = myOptions;
          },
          error => this.errorMessage = <any>error);
    }
  }


  onChangeColonne(event) {
    console.log(event)
  }


  onChangeMatColonne(event,obj) {
    //if (!this.currentActivityPlan.id) {
    this.actingmatPlanService.getActingByIds(event)
      .subscribe(
        res => {
          if (res.data && res.data.length) {
            res.data.forEach(function (item,i) {

              item.actingMatBudgetId = item.id;
              item.budgetAmountTotal = item.budgetAmount;
              if(item.budgetBalance){
                item.budgetAmount = item.budgetBalance;
              }
              if(obj&&obj.length){
                obj.forEach(function(o){
                  if(o.id==item.actingMatId){
                    item.actingMatName = o.name
                  }
                });

                //item.actingMatName = names[i];
              }


            })
          }
          if (!this.currentActivityPlan.id) {
            this.actingMatBudgets = res.data;
          }
        },
        error => this.errorMessage = <any>error);
    //}

  }


  cancel() {
    this.currentActivityPlan = false;
    this.notify.emit({type: 'cancel'});
  }

  save() {
    this.showerror = true;


    if (!this.currentActivityPlan.activityPlanName
      || !this.currentActivityPlan.activityPlanLocation || !this.currentActivityPlan.startTime || !this.currentActivityPlan.endTime) {

      return false;
    }
    this.currentActivityPlan.activityAmount = this.renderTotalPrice();
    this.currentActivityPlan.activityCostAmount = this.renderActingMatBudgetsPrice();
    this.currentActivityPlan.activityGoodsAmount = this.renderActivityPlanGoodsPrice();
    if (!this.currentActivityPlan.id) {
      this.activityPlanService.addActivityPlan(this.currentActivityPlan)
        .subscribe(
          res => {
            let id = res.data;
            let startTime = this.currentActivityPlan.startTime;
            let endTime = this.currentActivityPlan.endTime;
            //goods
            this.activityPlanGoods.forEach(function (good) {
              good.activityPlanId = id;
              good.activityAmount = Number(good.activityPrice) * Number(good.activityQuantity);
             // good.startTime = startTime;
              //good.endTime = endTime;
            });
            this.actingMatBudgets.forEach(function (budget) {
              budget.activityPlanId = id;
              budget.startTime = startTime;
              budget.endTime = endTime;
            });

            this.currentAttachments.forEach(function (x) {
              x.buzId = id;
            });

            if (this.activityPlanGoods.length) {
              this.activityPlanService.updateActivyGoods(this.activityPlanGoods)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }
            if (this.actingMatBudgets.length) {
              this.activityPlanService.updateActivityBudgets(this.actingMatBudgets)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }

            if (this.currentAttachments.length) {
              this.contractService.updateAttach(this.currentAttachments)
                .subscribe(
                  res1 => {
                    console.log(res1.data)
                  },
                  error => this.errorMessage = <any>error);
            }

  /*          if(this.currentSelectedMats.length){
              this.activityPlanService.updateActingMatBalanceById(this.currentSelectedMats)
                .subscribe(
                  res1 => {
                  },
                  error => this.errorMessage = <any>error);
            }*/




            this.currentActivityPlan = false;
            this.notify.emit({type: 'cancel'});
          },
          error => this.errorMessage = <any>error);
    } else if (this.currentActivityPlan.id) {

      if (this.currentAttachments.length) {
        this.contractService.updateAttach(this.currentAttachments)
          .subscribe(
            res1 => {
              console.log(res1.data)
            },
            error => this.errorMessage = <any>error);
      } else {

        this.contractService.deleteByBuzId(this.currentActivityPlan.id)
          .subscribe(
            res1 => {
              console.log(res1.data)
            },
            error => this.errorMessage = <any>error);
      }


      this.activityPlanService.updateActivityPlan(this.currentActivityPlan)
        .subscribe(
          res => {
            let id = this.currentActivityPlan.id;
            let startTime = this.currentActivityPlan.startTime;
            let endTime = this.currentActivityPlan.endTime;
            this.activityPlanGoods.forEach(function (good) {
              good.activityPlanId = id;
              good.activityAmount = Number(good.activityPrice) * Number(good.activityQuantity);
              //good.startTime = startTime;
              //good.endTime = endTime;
            });
            this.actingMatBudgets.forEach(function (budget) {
              budget.activityPlanId = id;
              budget.startTime = startTime;
              budget.endTime = endTime;
            });
            if (this.activityPlanGoods.length) {
              this.activityPlanService.updateActivyGoods(this.activityPlanGoods)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }else{
              this.activityPlanService.deleteActivityGoodsByActivityId(id)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }
            if (this.actingMatBudgets.length) {
              this.activityPlanService.updateActivityBudgets(this.actingMatBudgets)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }else{
              this.activityPlanService.deleteActivityBudgetsByActivityId(id)
                .subscribe(
                  res => {
                  },
                  error => this.errorMessage = <any>error);
            }

            this.currentActivityPlan = false;
            this.notify.emit({type: 'cancel'});

          },
          error => this.errorMessage = <any>error);
    }

  }

  openBrandGoodsModal() {
    this.showChildModal();
  }

  public showChildModal(): void {
    this.childModal.show();
  }


  public hideChildModal(): void {
    this.childModal.hide();
  }

  selectGoods() {
    console.log(this.brandGoods);
    let activityPlanGoods = [];
    let startTime = this.currentActivityPlan.startTime;
    let endTime = this.currentActivityPlan.endTime;
    this.brandGoods.forEach(function (good) {
      if (good.selected) {
        good.goodsId = good.id;
        good.startTime = startTime;
        good.endTime = endTime;
        activityPlanGoods.push(good);
      }
    });
    this.activityPlanGoods = activityPlanGoods;
    this.hideChildModal();
  }


  activityGoodDiscountChange(item) {
    if (item.activityDiscount > 0) {
      item.activityPrice = ((item.activityDiscount * Number(item.goodsRetailPrice)) / 100).toFixed(2);
    }
  }

  currentSelectedMats = [];
  onSelectActing(event) {
    let ids = [];
    let obj = [];
    if (event && event.length) {
      event.forEach(function (e) {
        ids.push(e.id)
        obj.push(e.actingMatName)
        obj.push({
          id:e.id,
          name:e.actingMatName
        })
      })
    }
    this.currentSelectedMats = event;
    this.currentActivityPlan.actingMatIds = ids;
    this.onChangeMatColonne(this.currentActivityPlan.actingMatIds,obj);
  }


  renderActingMatBudgetsPriceTotal(){
    let total = 0;

    this.currentSelectedMats.forEach(function (e) {
      if(e.UsageAmount){
        total = total + e.UsageAmount;
      }
    });
    return total.toFixed(2);
  }


  onSelectStores(event) {
    let ids = [];
    let customerStoreNames = '';
    if (event && event.length) {
      event.forEach(function (e) {
        customerStoreNames = customerStoreNames + e.storeName + ';';
        ids.push(e.id)
      })
    }
    this.currentActivityPlan.customerStoreNames = customerStoreNames;
    this.currentActivityPlan.customerStoreIds = ids;
  }


  addActingMatBudget() {
    console.log(this.actingMatBudgets)
    this.actingMatBudgets.push({});
  }


  removeActivityPlanGoods(index) {
    this.activityPlanGoods.splice(index, 1);
  }


  removeActingMatBudgets(index) {
    this.actingMatBudgets.splice(index, 1);
  }


  public uploadInProgress: boolean = false;

  public onFiles(): void {

    let files = this._fileUpload.nativeElement.files;

    if (files && files[0]) {

      if (files[0].size < 1048576) {
        if (files[0].type == ("image/png") ||
          files[0].type == ("image/jpeg") ||
          files[0].type == ("image/jpg") ||
          files[0].type == ("image/bmp") ||
          files[0].type == ("image/gif")) {

          let fd = new FormData();
          fd.append('file', files[0]);
          console.log(fd)

          this.contractService.updateAttachFile(fd)
            .subscribe(
              res1 => {
                this.currentAttachments.push({
                  buzId: this.currentActivityPlan.id,
                  attachUrl: res1.data,
                  attachSize: files[0].size,
                  attachType: res1.data.split('.')[1],
                  attachName: new Date().getTime(),
                });

              },
              error => this.errorMessage = <any>error);
        } else {
          this.alertAction = 'show';
          this.alertContent = '图片类型错误！';
        }
      } else {
        this.alertAction = 'show';
        this.alertContent = '图片太大了！';
      }


    }

  }

  onSelectAlert() {
    this.alertAction = false;
  }

  removeAttach(index) {
    this.currentAttachments.splice(index, 1);
  }

  downloadAttach(attach) {
    window.open(attach.attachUrl);
  }


  public bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }


  picture;

  protected _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  protected _onUploadCompleted(data): void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  public uploaderOptions: any = {
    // url: 'http://website.com/upload'
  };

  protected _canUploadOnServer(): boolean {
    return !!this.uploaderOptions['url'];
  }


  previewAttachPicture(attach) {
    window.open(attach.attachUrl);
  }


  renderActingMatBudgetsPrice() {
    let total = 0;
    this.actingMatBudgets.forEach(function (item) {
      if (item.budgetAmount && item.budgetAmount != '') {
        total = total + Number(item.budgetAmount);
      }
    });
    return total.toFixed(2);
  }


  renderActivityPlanGoodsPrice() {
    let total = 0;
    this.activityPlanGoods.forEach(function (item) {
      if (item.activityPrice  && item.activityQuantity) {
        total = total + Number(item.activityPrice) * item.activityQuantity;
      }

    });
    return total.toFixed(2);
  }


  renderTotalPrice(){
    return (Number(this.renderActingMatBudgetsPrice())+Number(this.renderActivityPlanGoodsPrice())).toFixed(2);
  }
}


