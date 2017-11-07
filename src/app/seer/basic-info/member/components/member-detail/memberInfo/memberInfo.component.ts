import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';
@Component({
  selector: 'memberInfo',
  templateUrl: './memberInfo.component.html',
  styleUrls: ['./memberInfo.component.scss']

})
export class MemberInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = '';
  public forbidSaveBtn: boolean = true;
  baseInfo: any = {};  // 基本信息
  emergencyContact: any = [];  //紧急联系人
  workInfo: any = {}; //工作信息
  accountInfo: any = {}; //账号信息
  financialInfo: any = {}; //财务状况
  vehicleInfo: any = []; //车辆信息
  houseInfo: any = [];  //房屋信息
  creditInfo: any = [];//个人征信信息
  titlesEmergencyContact=[
    {
      key:'contName',
      label:'姓名',
    },
    {
      key:'contRelation',
      label:'关系',
    },
    {
      key:'contPhone',
      label:'手机号',
    },
    {
      key:'contIdnum',
      label:'身份证号',
    }
  ];//关系人
  titlesVehicleInfo= [
    { key:'carBrand', label:'车辆品牌' },
    { key:'carModel', label:'车辆型号' },
    { key:'viNumber', label:'车架号' },
    { key:'carNumber', label:'车牌号'},
    { key:'carRegNumber', label:'登记证号' },
    { key:'carAge', label:'车龄' },
    { key:'mileage', label:'行驶里程' },
    { key:'pricePotential', label:'评估价格' },
  ]; //车
  titlesHouseInfo= [
    { key:'houseAdress', label:'房产地址' },
    { key:'area', label:'建筑面积' },
    { key:'houseType', label:'房屋类型' },
    { key:'houseAge', label:'房龄'},
    { key:'debtMoney', label:'尚欠贷余额' },
    { key:'landNo', label:'土地所有证号' },
    { key:'houseBelongNo', label:'房屋产权所有证号' },
    { key:'pricePotential', label:'评估价格' },
    { key:'loanYear', label:'贷款年限' },
    { key:'debtBank', label:'按揭银行' },
    { key:'houseScale', label:'产权份额' },
    { key:'belongTo1', label:'所有权1' },
    { key:'belongTo2', label:'所有权2' },
    { key:'belongTo3', label:'所有权3' },
  ];//房
  titlesCreditInfo=[
    { key:'creditValue', label:'信用报告' },
    { key:'creditLevel', label:'综合信用等级' },
    { key:'creditExpire', label:'有效日期' },
  ];//征信
  memberId:any='';
  constructor(
    private _memberService: MemberService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _messageService: SeerMessageService,
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params

    })
      .subscribe(params => {
        if ( this._editType === 'detail' ) {
          this.memberId=params.id;
          this._memberService.getOne(params.id).then(res => {
            this.member = res.data || {};
            this.baseInfo=this.member.baseInfo|| {};
            this.emergencyContact=this.member.contactList|| [];
            this.workInfo=this.member.workInfo|| {};
            this.accountInfo=this.member.AcBank|| {};
            this.financialInfo=this.member.financialInfo|| {};
            this.vehicleInfo=this.member.carMessageList|| [];
            this.houseInfo=this.member.houseMessageList|| [];
            this.creditInfo=this.member.creditInfo|| [];
          }).catch(err=>{
            this.showError(err.msg || '连接失败');
          });
        }
      })
  }
  handleBackBtnClick() {
    this._router.navigate([`../../`], {relativeTo: this._route});
  }
  memberInfoClick(){
    this._router.navigate([`../../detail/${this.memberId}`], {relativeTo: this._route});
  }
  investInfoClick(){
    this._router.navigate([`../../invests/${this.memberId}`], {relativeTo: this._route});
  }
  loanInfoClick(){
    this._router.navigate([`../../loans/${this.memberId}`], {relativeTo: this._route});
  }
  tradeInfoClick(){
    this._router.navigate([`../../trades/${this.memberId}`], {relativeTo: this._route});
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
