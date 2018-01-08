import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { MemberService } from '../../member.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UPDATE, DELETE,SAVE} from "../../../../common/seer-table/seer-table.actions"

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('contactTable') contactTable;
  @ViewChild('validationForm') form1;
  @ViewChild('validationForm') form2;
  @ViewChild('validationForm') form3;
  @ViewChild('validationForm') form4;
  @ViewChild('validationForm') form5;
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  forbidBaseSaveBtn: boolean = false;
  forbidWorkSaveBtn: boolean = true;
  forbidFinancialSaveBtn: boolean = true;
  memberId:any='';
  baseInfo: any = {};  // 基本信息
  emergencyContact: any = [];  //紧急联系人
  workInfo: any = {}; //工作信息
  accountInfo: any = {}; //账号信息
  financialInfo: any = {}; //财务状况
  vehicleInfo: any = []; //车辆信息列表
  houseInfo: any = [];  //房屋信息列表
  simpleTableActions = [UPDATE, DELETE];
  saveActions=[SAVE];
  saveActionsDistabled=[false];
  titlesEmergencyContact=[
    {key:'contName', label:'姓名'},
    {key:'contRelation', label:'关系'},
    {key:'contPhone', label:'手机号',},
    {key:'contIdnum', label:'身份证号',}
  ];//关系人

  house={}; //房
  vehicle={};//车
  credits: any[] = [];//征信_个人风险报告
  riskReport:any = {};//征信_个人信用报告
  creditReport:any = {};//征信_个人反欺诈报告

  modalRef: BsModalRef;  //弹出层
  vehicleReadOnly: boolean = true;  //车辆弹出层可编辑状态
  houseReadOnly: boolean = true;//房屋弹出层可编辑状态

  public antiFraudReport:any = {};
  constructor(
    private _memberService: MemberService,
    private _messageService: SeerMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.forbidBaseSaveBtn=true;
    this.forbidWorkSaveBtn= true;
    this. forbidFinancialSaveBtn= true;
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
    .subscribe(params => {
      if ( this._editType === 'edit' ) {
        this.getMemberInfo(params.id);
      }
    })
  }
  getMemberInfo(id){
    this._memberService.getOne(id).then(res => {
      this.memberId=id;
      this.member = res.data || {};
      this.baseInfo=this.member.baseInfo|| {};
      this.emergencyContact=this.member.contactList|| [];
      this.workInfo=this.member.workInfo|| {};
      this.accountInfo=this.member.acBank|| {};
      this.financialInfo=this.member.financialInfo|| {};
      this.vehicleInfo=this.member.carMessageList|| [];
      this.houseInfo=this.member.houseMessageList|| [];
      this.forbidSaveBtn = false;

    })
  }
  //保存基本信息
  basicInfoNotify() {
    this.forbidBaseSaveBtn=false;
    this._memberService.putBasicInfo(this.memberId,this.baseInfo).then((data:any)=>{
        this.showSuccess(data.msg || '更新成功');
    }).catch(err => {

      this.showError(err.msg || '更新失败');
    });
    this.forbidBaseSaveBtn=true;
  }
  //保存工作信息
  workInfoNotify() {
    this.forbidWorkSaveBtn=false;
    this.workInfo.memberId=this.memberId;
    this._memberService.putWorkInfo(this.memberId,this.workInfo).then((data:any)=>{
      this.showSuccess(data.msg || '更新成功');
    }).catch(err => {
      this.showError(err.msg || '更新失败');
    });
    this.forbidWorkSaveBtn=true;
  }
  //保存财务状况信息
  financialInfoNotify() {
    this.forbidFinancialSaveBtn=false;
    this.financialInfo.memberId=this.memberId;
    this._memberService.putFinancialInfo(this.memberId,this.financialInfo).then((data:any)=>{
      this.showSuccess(data.msg || '更新成功');
    }).catch(err => {
      this.showError(err.msg || '更新失败');
    });
    this.forbidFinancialSaveBtn=true;
  }
  //联系人增删改
  contactModifyNotify($event){
    let { type, key } = $event;
    let editData=this.contactTable.getFormatDataByKey(key).editData;
    editData.memberId=this.memberId;
    if(this.memberId){
      //修改
      switch ( type ) {
        case 'save':
          if(editData.id){
            if(editData.contName && editData.contName!='' ){
              this._memberService.putContact(this.memberId,editData).then((data:any)=>{
                this.showSuccess(data.msg || '更新成功');
              }).catch(err => {
                this.showError(err.msg || '更新失败');
              });//修改
            }
            else{
              return false;
            }
          }else{
            if(editData.contName && editData.contName!='' ) {
              this._memberService.postContact(this.memberId, editData).then((result) => {
                this.getMemberInfo(this.memberId);
              });//新增
            }else{
              return false;
            }
          }
          this.contactTable.save(key);
          break;
        case 'delete':
          this._memberService.deleteContact(editData.id).then((result) => {
            this.contactTable.delete(key);
            this.showSuccess(result.message || '删除成功');
          }).catch(err=>{
            this.showSuccess(err.json().message || '删除失败');
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

  }
  //车辆增改
  saveVehicle(vehicle){
    vehicle.memberId=this.memberId;
    if(vehicle.id){
      //修改
      this._memberService.putVehicle(this.memberId,vehicle).then((result) => {
        //更新页面显示
        let idIndex=this.vehicleInfo.findIndex(x => x.id == vehicle.id);
        this.vehicleInfo[idIndex]=vehicle;
        this.modalRef.hide();
      }).catch(err=>{
        this.showError(err.msg || '修改失败');
      });
    }else{
      //新增

        this._memberService.postVehicle(this.memberId,vehicle).then((result) => {
          this.vehicleInfo.push(vehicle);
          this.modalRef.hide();
        }).catch(err=>{
          this.showError(err.msg || '新增失败');
        });


    }
  }
  //房产增改
  saveHouse(house){
    house.memberId=this.memberId;
    if(house.id){
      //修改
      this._memberService.putHouse(this.memberId,house).then((result) => {
        //更新页面显示
        let idIndex=this.houseInfo.findIndex(x => x.id == house.id);
        this.houseInfo[idIndex]=house;
        this.modalRef.hide();
      }).catch(err=>{
        this.showError(err.msg || '修改失败');
      });
    }else{
      //新增
      this._memberService.postHouse(this.memberId,house).then((result) => {
        this.houseInfo.push(house);
        this.modalRef.hide();
      }).catch(err=>{
        this.showError(err.msg || '新增失败');
      });
    }
  }
  //车辆删除
  delVehicle(id){
    let idIndex=this.vehicleInfo.findIndex(x => x.id == id);
    this._memberService.deleteVehicle(id).then((result) => {
      this.vehicleInfo.splice(idIndex,1);
      this.showSuccess(result.message || '删除成功');
    }).catch(err=>{
      this.showSuccess(err.json().message || '删除失败');
    });
  }
  //房屋删除
  delHouse(id){
    let idIndex=this.houseInfo.findIndex(x => x.id == id);
    this._memberService.deleteHouse(id).then((result) => {
      this.houseInfo.splice(idIndex,1);
      this.showSuccess(result.message || '删除成功');
    }).catch(err=>{
      this.showSuccess(err.json().message || '删除失败');
    });
  }
  //修改户籍所在地
  domicilePlaceChanged($event) {
    this.baseInfo.domicileProvince = $event.province.item_code;
    this.baseInfo.domicileCity = $event.city.item_code;
    this.baseInfo.domicileDistrict = $event.district.item_code;
    this.baseInfo.domicileAddress = $event.address;
  }
  //修改目前居住地
  currentResidenceChanged($event) {
    this.baseInfo.liveProvince = $event.province.item_code;
    this.baseInfo.liveCity = $event.city.item_code;
    this.baseInfo.liveDistrict = $event.district.item_code;
    this.baseInfo.liveAddress = $event.address;
  }
  //同户籍地址
  shortcut($event): void {
    if($event.toElement.checked) {
      this.baseInfo.liveProvince = this.baseInfo.domicileProvince;
      this.baseInfo.liveCity = this.baseInfo.domicileCity;
      this.baseInfo.liveDistrict = this.baseInfo.domicileDistrict;
      this.baseInfo.liveAddress = this.baseInfo.domicileAddress;
    }
  }

  //弹出层
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  //车辆弹出层
  vehicleModal(template: TemplateRef<any>, vehicleReadOnly: boolean, vehicle?: any) {
    this.vehicle = _.cloneDeep(vehicle)||{};//防止编辑时页面同步更新
    this.vehicleReadOnly = vehicleReadOnly;
    this.openModal(template);
  }
  //房产弹出层
  houseModal(template: TemplateRef<any>,houseReadOnly, house?: any) {
    this.house = _.cloneDeep(house)||{};//防止编辑时页面同步更新
    this.houseReadOnly = houseReadOnly;
    this.openModal(template);
  }

  //重置密码
  passwordReset(){
    this._memberService.putPasswords(this.memberId).then((data:any)=>{
      this.showSuccess(data.msg || '密码已经重置为000000');
    }).catch(err => {
      this.showError(err.msg || '密码重置失败');
    });
  }
  //重置交易密码
  tradePasswordReset(){
    this._memberService.putTradePasswords(this.memberId).then((data:any)=>{
      this.showSuccess(data.msg || '交易密码密码已经重置为身份证后六位');
    }).catch(err => {
      this.showError(err.msg || '交易密码重置失败');
    });
  }
  //解锁/锁定
  lock(status){
    console.log(status);
    let params={
      "memberId":this.memberId,
      "status":'1'
    }
    this._memberService.patchOne(this.memberId,params).then((data:any)=>{
      this.showSuccess(data.msg || '设置成功');
    }).catch(err => {
      this.showError(err.msg || '设置失败');
    });
  }
  //后退
  handleBackBtnClick() {
    this._location.back()
  }
  //成功提示
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  //失败提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}
