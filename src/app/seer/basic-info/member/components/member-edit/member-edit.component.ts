import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import {SeerDialogService} from '../../../../../theme/services';
import { MemberService } from '../../member.service';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UPDATE, DELETE,SAVE} from "../../../../common/seer-table/seer-table.actions"
import { parseQueryString } from '../../../../../theme/libs';
import { retry } from 'rxjs/operator/retry';
import { de } from 'ngx-bootstrap/locale';

@Component({
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('contactTable') contactTable;
  @ViewChild('form1') form1;
  @ViewChild('from2') form2;
  @ViewChild('form3') form3;
  @ViewChild('form4') form4;
  @ViewChild('form5') form5;
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  forbidBaseSaveBtn: boolean = false;
  forbidWorkSaveBtn: boolean = true;
  forbidFinancialSaveBtn: boolean = true;
  memberId:any='';
  baseInfo: any = {};  // 基本信息
  baseInfoSave: boolean = false;//判断是否保存过基本信息
  emergencyContact: any = [];  //紧急联系人
  workInfo: any = {}; //工作信息
  accountInfo: any = {}; //账号信息
  financialInfo: any = {}; //财务状况
  vehicleInfo: any = []; //车辆信息列表
  houseInfo: any = [];  //房屋信息列表
  currentYear: any = new Date().getFullYear();//获取当前时间
  isLoading: boolean = false;
  simpleTableActions = [UPDATE, DELETE];
  saveActions=[SAVE];
  saveActionsDistabled=[false];
  titlesEmergencyContact=[
    {key:'contName', label:'联系人姓名'},
    {key:'contRelation', label:'与会员关系',textAlign:'center'},
    {key:'contPhone', label:'联系人联系电话',textAlign:'center',},
    {key:'contIdnum', label:'联系人身份证号',textAlign:'center',}
  ];//关系人

  house={}; //房
  vehicle={};//车
  credits: any[] = [];//征信_个人风险报告
  riskReport:any = {};//征信_个人风险报告
  creditReport:any = {};//征信_个人信用报告
  public antiFraudReport:any = {};//征信_个人反欺诈报告

  modalRef: BsModalRef;  //弹出层
  vehicleReadOnly: boolean = true;  //车辆弹出层可编辑状态
  houseReadOnly: boolean = true;//房屋弹出层可编辑状态


  constructor(
    private _memberService: MemberService,
    private _messageService: SeerMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private modalService: BsModalService,
    private _dialogService:SeerDialogService
  ) {}
  ngOnInit() {
    this.form1.valueChanges.subscribe(change=>{
    });
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
      this.baseInfo.mSex = this._memberService.cardGetSex(this.baseInfo.idNumber);
      this.baseInfo.mAge = this._memberService.cardGetAge(this.baseInfo.idNumber);
      this.baseInfo.yearIncome =  this.formateCurrency(this.baseInfo.yearIncome);
      this.emergencyContact=this.member.contactList|| [];
      this.workInfo=this.member.workInfo|| {};
      this.workInfo.monthIncome =  this.formateCurrency(this.workInfo.monthIncome);
      this.accountInfo=this.member.acBank|| {};
      this.financialInfo=this.member.financialInfo|| {};
      this.financialInfo.unsecuredRepayMonth =  this.formateCurrency(this.financialInfo.unsecuredRepayMonth);
      this.financialInfo.cardRepayMonth =  this.formateCurrency(this.financialInfo.cardRepayMonth);
      this.financialInfo.houseRepayMonth =  this.formateCurrency(this.financialInfo.houseRepayMonth);
      this.financialInfo.carRepayMonth =  this.formateCurrency(this.financialInfo.carRepayMonth);
      this.vehicleInfo=this.member.carMessageList|| [];
      this.formatNum(this.vehicleInfo);
      this.houseInfo=this.member.houseMessageList|| [];
      this.formatNum( this.houseInfo);
      this.forbidSaveBtn = false;
      this.riskReport = this.findReport("1",this.member.creditInfo||[]);
      this.creditReport = this.findReport("2",this.member.creditInfo||[]);
      this.antiFraudReport = this.findReport("3",this.member.creditInfo||[]);

    })
  }

  //查找征信
  findReport(type,reportList){
    let index = reportList.findIndex(report=>report!=null&&report.creditType == type);
    if(index >= 0){
      return reportList[index];
    }else{
      return {};
    }
  }
  //保存基本信息
  basicInfoNotify() {
    this.forbidBaseSaveBtn=false;
    this.isLoading = true;
    this._memberService.putBasicInfo(this.memberId,this.baseInfo).then((data:any)=>{
        this.isLoading = false;
        this.baseInfoSave = true;
        this.showSuccess(data.msg || '更新成功');
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '更新失败');
    });
    this.forbidBaseSaveBtn=true;
  }
  //保存工作信息
  workInfoNotify() {
    this.forbidWorkSaveBtn=false;
    this.isLoading = true;
    this.workInfo.memberId=this.memberId;
    this._memberService.putWorkInfo(this.memberId,this.workInfo).then((data:any)=>{
      this.isLoading = false;
      this.showSuccess(data.msg || '更新成功');
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '更新失败');
    });
    this.forbidWorkSaveBtn=true;
  }
  //保存财务状况信息
  financialInfoNotify() {
    this.forbidFinancialSaveBtn=false;
    this.financialInfo.memberId=this.memberId;
    this.isLoading = true;
    this._memberService.putFinancialInfo(this.memberId,this.financialInfo).then((data:any)=>{
      this.isLoading = false;
      this.showSuccess(data.msg || '更新成功');
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '更新失败');
    });
    this.forbidFinancialSaveBtn=true;
  }
  //联系人增删改(需要添加电话和身份证号码验证！)
  contactModifyNotify($event){
    let { type, key } = $event;
    let editData=this.contactTable.getFormatDataByKey(key).editData;
    if(key <= this.emergencyContact.length-1){
      editData.id = this.emergencyContact[key].id;
    }
    editData.memberId=this.memberId;
    if(this.memberId){
      editData.contPhone = (editData.contPhone||"").trim();
      editData.contIdnum = (editData.contIdnum||"").trim();
      editData.contName = (editData.contName||"").trim();
      //修改
      switch ( type ) {
        case 'save':
          if((editData.contName+"").length===0||(editData.contName+"").length>6){
            this.showError('联系人姓名格式错误！');
            return;
          }
          if(editData.contRelation===null){
            this.showError('请选择与会员关系！');
            return;
          }
          if(!this._memberService.validatePhone(editData.contPhone)){
            this.showError('电话格式错误！');
            return;
          }
          if(!this._memberService.validateIdCard(editData.contIdnum)){
            this.showError('身份证号码格式错误！');
            return;
          }
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
                editData.id = result.data;
                this.emergencyContact.push(editData);
                this.emergencyContact[this.emergencyContact.length-1].id = result.data;
                this.contactTable.getFormatDataByKey(key).editData.id = result.data;
                // this.getMemberInfo(this.memberId);
                this.showSuccess(result.message || '更新成功');
              }).catch(
                err => {
                  this.showError(err.msg || '修改失败');
                });//新增
            }else{
              return false;
            }
          }
          this.contactTable.save(key);
          break;
        case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
              if (action === 1) {
                this._memberService.deleteContact(editData.id).then((result) => {
                  this.contactTable.delete(key);
                  this.showSuccess(result.message || '删除成功');
                }).catch(err=>{
                  this.showSuccess(err.json().message || '删除失败');
                });
              }
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
      this._memberService.putVehicle(this.memberId,vehicle.id, vehicle).then((result) => {
        //更新页面显示
        let idIndex=this.vehicleInfo.findIndex(x => x.id == vehicle.id);
        vehicle.pricePotential =  this.formateCurrency(vehicle.pricePotential);
        this.vehicleInfo[idIndex]=vehicle;
        this.modalRef.hide();
        this.showSuccess(result.message || '修改成功');
      }).catch(err=>{
        this.showError(err.msg || '修改失败');
      });
    }else{
      //新增
        this._memberService.postVehicle(this.memberId,vehicle).then((result) => {
          vehicle.id = result.data.id;
          vehicle.pricePotential =  this.formateCurrency(vehicle.pricePotential);
          this.vehicleInfo.push(vehicle);
          this.modalRef.hide();
          this.showSuccess(result.message || '新增成功');
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
      this._memberService.putHouse(this.memberId, house.id, house).then((result) => {
        //更新页面显示
        let idIndex=this.houseInfo.findIndex(x => x.id == house.id);
        house.pricePotential =  this.formateCurrency(house.pricePotential);
        this.houseInfo[idIndex]=house;
        this.modalRef.hide();
        this.showSuccess(result.message || '修改成功');
      }).catch(err=>{
        this.showError(err.msg || '修改失败');
      });
    }else{
      //新增
      this._memberService.postHouse(this.memberId,house).then((result) => {
        house.id=result.data.id;
        house.pricePotential =  this.formateCurrency(house.pricePotential);
        this.houseInfo.push(house);
        this.modalRef.hide();
        this.showSuccess(result.message || '新增成功');
      }).catch(err=>{
        this.showError(err.msg || '新增失败');
      });
    }
  }
  //车辆删除
  delVehicle(id){
    this._dialogService.confirm('确定删除吗？')
    .subscribe(action => {
        if (action === 1) {
          let idIndex=this.vehicleInfo.findIndex(x => x.id == id);
          this._memberService.deleteVehicle(this.memberId, id).then((result) => {
            this.vehicleInfo.splice(idIndex,1);
            this.showSuccess(result.message || '删除成功');
          }).catch(err=>{
            this.showSuccess(err.json().message || '删除失败');
          });
        }
      });
  }
  //房屋删除
  delHouse(id){
    this._dialogService.confirm('确定删除吗？')
    .subscribe(action => {
        if (action === 1) {
          let idIndex=this.houseInfo.findIndex(x => x.id == id);
          this._memberService.deleteHouse(this.memberId, id).then((result) => {
            this.houseInfo.splice(idIndex,1);
            this.showSuccess(result.message || '删除成功');
          }).catch(err=>{
            this.showSuccess(err.json().message || '删除失败');
          });
        }
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
    // let params={
    //   "memberId":this.memberId,
    //   "status":'1'
    // }
    this._memberService.patchOne(this.memberId,status).then((data:any)=>{
      this.showSuccess(data.msg || '设置成功');
      this.baseInfo.status = status;
    }).catch(err => {
      this.showError(err.msg || '设置失败');
    });
  }
  //后退
  handleBackBtnClick() {
    if(this.form1.dirty && !this.baseInfoSave){
      this._dialogService.confirm('你有编辑的内容还没有保存确认要返回吗？')
      .subscribe(action => {
        if (action === 1) {
          this._location.back()
          }
        });
    }else{
      this._location.back()
    }
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

  //修改房子和车金钱格式
  formatNum(lists){
    for (let index = 0; index < lists.length; index++) {
        lists[index].pricePotential = this.formateCurrency(lists[index].pricePotential);
    }
  }

  //格式金钱
  formateCurrency(num){
    if(num===null || num == undefined || num ===""){
      return 0;
    }else{
      return parseFloat(num).toFixed(2);
    }
  }
  //查询征信信息
  requery(type){
    //提示用户是否重新获取
    this._dialogService.confirm('获取信用报告是要收取一定费用且24小时之内获取的报告相同是否继续查询？')
    .subscribe(action => {
        if (action === 1) {
          this._memberService.getCreditByType(this.memberId, type).then((data:any)=>{
            switch(type){
              case 1: 
              this.riskReport = data.data;
              break;
              case 2:
              this.creditReport =  data.data;
              break;
              case 3:
              this.antiFraudReport =  data.data;
              break
            }  
            this.showSuccess(data.msg || '查询成功！');
          }).catch(err => {
            this.showError(err.msg || '查询失败！');
          });
        }else{
          return;
        }
      });
  }
}
