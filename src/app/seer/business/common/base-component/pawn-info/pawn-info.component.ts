
import {Component, Input, OnChanges, OnInit, TemplateRef} from "@angular/core";

import {CommonService} from "../../common.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'pawn-info',
  templateUrl: './pawn-info.component.html',
})
export class PawnInfoComponent implements OnInit, OnChanges{

  @Input()
  public disabled: boolean = false;

  @Input() loan = {};

  @Input() memberId : string;

  @Input() vehicles = [];

  @Input() houses = [];

  @Input() pawn = {};

  public actions = [ UPDATE ];

  public vehicle:any = {};

  public house:any = {};

  vehicle_form : FormGroup;

  house_form : FormGroup;

  constructor(
    private service: CommonService,
    private modalService: BsModalService,
    private _messageService: SeerMessageService,){

    //新增车辆表单验证
    this.vehicle_form = new FormGroup({

      //车辆品牌
      carBrand: new FormControl('', Validators.required),

      //车辆型号
      carModel: new FormControl('', Validators.required),

      //车架号
      viNumber: new FormControl('', Validators.required),

      //车牌号
      carNumber: new FormControl('', Validators.required),

      //登记证号
      carRegNumber: new FormControl('', Validators.required),

      //车龄
      //carAge: new FormControl('', Validators.required),

      //购车年份
      purchaseYear: new FormControl('', Validators.required),

      //行驶里程
      mileage: new FormControl('', Validators.required),

      //评估价格
      pricePotential: new FormControl('', Validators.required),

    });

    //新增房屋表单验证
    this.house_form = new FormGroup({

      //房产地址
      houseAdress: new FormControl('', Validators.required),

      //房屋类型
      houseType: new FormControl('', CustomValidators.min(0)),

      //建筑面积
      area: new FormControl('', Validators.required),

      //房龄
      //houseAge: new FormControl('', Validators.required),

      //购车年份
      completionYear: new FormControl('', Validators.required),

      //尚欠贷余额
      debtMoney: new FormControl('', Validators.required),

      //土地所有证号
      landNo: new FormControl('', Validators.required),

      //房屋产权所有证号
      houseBelongNo: new FormControl('', Validators.required),

      //评估价格
      pricePotential: new FormControl('', Validators.required),

    });


  }

  ngOnInit() { if(!this.disabled) { this.actions = [ UPDATE ]; } else {this.actions = []; } }

   ngOnChanges() {
    //console.log(this.pawn);
   }
  //设置抵押物车辆
  private setVehicle($event, vehicle) {
    $event.preventDefault();
    this.service.pawnVehicle(vehicle.id, this.loan['projectId']).then(res => {
      if("0" == res.code) {
        this.pawn = vehicle;
        this.pawn['pawnType'] = "1";
      }else {
        console.log(res.message);
      }
    }).catch(err => {
      this.showError( err.msg || '设置抵押物失败' );
    });
  }

  //设置抵押物房产
  private setHouse($event, house) {
    $event.preventDefault();
    this.service.pawnHouse(house.id, this.loan['projectId']).then(res => {
      if("0" == res.code) {
        this.pawn = house;
        this.pawn['pawnType'] = "2";
      }else {
        console.log(res.message);
      }
    }).catch(err => {
      this.showError( err.msg || '设置抵押物失败' );
    });
  }

  //弹出层
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //新增车辆弹出层
  private vehicleReadOnly: boolean = true;
  public vehicleModal(template: TemplateRef<any>, vehicleReadOnly: boolean, vehicle?: any) {

    if(vehicleReadOnly) {
      this.vehicle = vehicle;
    }else {
      this.vehicle = {};
    }
    this.vehicleReadOnly = vehicleReadOnly;
    this.openModal(template);
  }

  //新增房产弹出层
  private houseReadOnly: boolean = true;
  public houseModal(template: TemplateRef<any>,houseReadOnly, house?: any) {

    if(houseReadOnly) {
      this.house = house;
    }else {
      this.house = {};
    }
    this.houseReadOnly = houseReadOnly;
    this.openModal(template);
  }

  //添加车辆
  private saveVehicle(vehicle) {
    vehicle['memberId'] = this.memberId;
    this.service.addVehicle(this.memberId, vehicle).then(res =>{
      if(0 == res.code) {
        vehicle.id = res.data.id;
        console.log(res.data);
        this.vehicles.push(vehicle);
        this.modalRef.hide();
      }else {
        console.log(res.message);
        this.showSuccess(res.message || '车辆添加失败');
      }
    }).catch(error => {
      console.log(error);
      this.showError(error.msg || '操作失败')
    });
  }

  //添加房产
  private saveHouse(house) {
    house['memberId'] = this.memberId;
    this.service.addHouse(this.memberId, house).then(res =>{
      if(0 == res.code) {
        house.id = res.data.id;
        this.houses.push(house);
        this.modalRef.hide();
      }else {
        console.log(res.message);
        this.showSuccess(res.message || '房屋添加失败');
      }
    }).catch(error => {
      console.log(error);
      this.showError(error.msg || '操作失败')
    });
  }

  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}
