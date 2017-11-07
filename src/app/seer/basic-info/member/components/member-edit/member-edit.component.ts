import { Component, OnInit,ViewChild } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { MemberService } from '../../member.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import {UPDATE, DELETE,DOWNLOAD, PREVIEW,SAVE} from "../../../../common/seer-table/seer-table.actions"

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('contactTable') contactTable
  @ViewChild('vehicleTable') vehicleTable
  @ViewChild('houseTable') houseTable
  @ViewChild('creditTable') creditTable
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  memberId:any='';
  baseInfo: any = {};  // 基本信息
  emergencyContact: any = [];  //紧急联系人
  workInfo: any = {}; //工作信息
  accountInfo: any = {}; //账号信息
  financialInfo: any = {}; //财务状况
  vehicleInfo: any = []; //车辆信息
  houseInfo: any = [];  //房屋信息
  creditInfo: any = [];//个人征信信息
  simpleTableActions = [UPDATE, DELETE];
  collapseCardActions = [SAVE];
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
    { key:'houseType', label:'房屋类型', isDict: true, category: 'HOUSE_TYPE' },
    { key:'houseAge', label:'房龄' },
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
  constructor(
    private _memberService: MemberService,
    private _messageService: SeerMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
    .subscribe(params => {
      if ( this._editType === 'edit' ) {
        this._memberService.getOne(params.id).then(res => {
          this.memberId=params.id;
          this.member = res.data || {};
          this.baseInfo=this.member.baseInfo|| {};
          this.emergencyContact=this.member.contactList|| [];
          this.workInfo=this.member.workInfo|| {};
          this.accountInfo=this.member.AcBank|| {};
          this.financialInfo=this.member.financialInfo|| {};
          this.vehicleInfo=this.member.carMessageList|| [];
          this.houseInfo=this.member.houseMessageList|| [];
          this.creditInfo=this.member.creditInfo|| [];
          //this.simpleTableActions=[UPDATE, DELETE];
          this.creditInfo=_.map(this.creditInfo, r => _.set(r, 'actions', [DOWNLOAD, PREVIEW]))
          this.forbidSaveBtn = false;
        })
      }
    })
  }
  basicInfoNotify() {
    this._memberService.putBasicInfo(this.memberId,this.baseInfo).then((data:any)=>{
      if(data.code=="0") {
        this.alertSuccess(data.message);
      }else{
        this.alertError(data.message);
      }
    }).catch(err => {
      this.alertError(err.json().message);
    });

  }//保存基本信息
  workInfoNotify() {
    this.workInfo.memberId=this.memberId;
    this._memberService.putWorkInfo(this.memberId,this.workInfo).then((data:any)=>{
      if(data.code=="0") {
        this.alertSuccess(data.message);
      }else{
        this.alertError(data.message);
      }
    }).catch(err => {
      this.alertError(err.json().message);
    });

  }//保存工作信息
  financialInfoNotify() {
    this.financialInfo.memberId=this.memberId;
    this._memberService.putFinancialInfo(this.memberId,this.financialInfo).then((data:any)=>{
      if(data.code=="0") {
        this.alertSuccess(data.message);
      }else{
        this.alertError(data.message);
      }
    }).catch(err => {
      this.alertError(err.json().message);
    });

  }//保存财务状况信息
  contactModifyNotify($event){
    let { type, key } = $event;
    let editData=this.contactTable.getFormatDataByKey(key).editData;
    editData.memberId=this.memberId;
    if(this.memberId){
      //修改
      switch ( type ) {
        case 'save':
          if(editData.id){
            this._memberService.putContact(this.memberId,editData).then((result) => {
            });//修改
          }else{
            this._memberService.postContact(this.memberId,editData).then((result) => {
              console.log(result);
            });//新增
          }
          this.contactTable.save(key);
          break;
        case 'delete':
          this._memberService.deleteContact(editData.id).then((result) => {
            this.contactTable.save(key);
          });
          break;
      }
    }else{
      //新增时
      switch ( type ) {
        case 'save':
          this.contactTable.save(key);
          break;
        case 'cancel':
          break;
      }
    }

  }//联系人增删改
  vehicleInfoModifyNotify($event){
    let { type, key } = $event;
    let editData=this.vehicleTable.getFormatDataByKey(key).editData;
    editData.memberId=this.memberId;
    if(this.memberId){
      //修改
      switch ( type ) {
        case 'save':
          if(editData.id){
            this._memberService.putVehicle(this.memberId,editData).then((result) => {
            });//修改
          }else{
            this._memberService.postVehicle(this.memberId,editData).then((result) => {

            });//新增
          }
          this.vehicleTable.save(key);
          break;
        case 'delete':
          this._memberService.deleteVehicle(editData.id).then((result) => {
            //console.log(editData.id);
            this.vehicleTable.save(key);
          });
          break;
      }
    }else{
      //新增时
      switch ( type ) {
        case 'save':
          this.vehicleTable.save(key);
          break;
        case 'cancel':
          break;
      }
    }

  }//车辆增删改
  houseInfoModifyNotify($event){
    let { type, key } = $event;
    let editData=this.houseTable.getFormatDataByKey(key).editData;
    editData.memberId=this.memberId;
    if(this.memberId){
      //修改
      switch ( type ) {
        case 'save':
          if(editData.id){
            this._memberService.putHouse(this.memberId,editData).then((result) => {
            });//修改
          }else{
            this._memberService.postHouse(this.memberId,editData).then((result) => {
              console.log(result);
            });//新增
          }
          this.houseTable.save(key);
          break;

        case 'delete':
          this._memberService.deleteHouse(editData.id).then((result) => {
            //this.houseInfo.save(key);
            this.houseInfo.delete(key);
          });
          break;
      }
    }else{
      //新增时
      switch ( type ) {
        case 'save':
          this.houseTable.save(key);
          break;
        case 'cancel':
          //this.simpleTable.delete(key);
          break;
      }
    }

  }//房屋增删改
  creditInfoInfoModifyNotify($event){
    let { type, key } = $event;
    let editData=this.creditTable.getFormatDataByKey(key).editData;
    editData.memberId=this.memberId;
    if(this.memberId){
      //修改
      switch ( type ) {
        case 'save':
          if(editData.id){
            this._memberService.putContact(this.memberId,editData).then((result) => {
            });//修改
          }else{
            this._memberService.postContact(this.memberId,editData).then((result) => {
              console.log(result);
            });//新增
          }
          this.creditTable.save(key);
          break;
        case 'delete':
          this._memberService.deleteContact(editData.id).then((result) => {
            this.creditTable.save(key);
          });
          break;
      }
    }else{
      //新增时
      switch ( type ) {
        case 'save':
          this.creditTable.save(key);
          break;
        case 'cancel':
          break;
      }
    }
  }//征信增删改
  passwordReset(){
    this._memberService.putPasswords(this.memberId).then((result:any) => {
      if(result.code=='0'){
        this.alertSuccess(result.message);
      }else{
        this.alertSuccess(result.message);
      }
    }).catch(err => {
      this.alertError(err.json().message);
    });
  }//重置密码
  tradePasswordReset(){
    this._memberService.putTradePasswords(this.memberId).then((result:any) => {
      if(result.code=='0'){
        this.alertSuccess(result.message);
      }else{
        this.alertSuccess(result.message);
      }
    }).catch(err => {
      this.alertError(err.json().message);
    });
  }//重置交易密码
  lock(){
    alert();
  }//解锁/锁定
  handleBackBtnClick() {
    this._location.back()
  }//后退
  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    });
  };//成功提示
  alertError(errMsg:string){
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  };//错误提示
}
