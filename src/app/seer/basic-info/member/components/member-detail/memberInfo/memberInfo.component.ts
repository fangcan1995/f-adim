import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';
import { PREVIEW } from '../../../../../common/seer-table/seer-table.actions';
import * as _ from 'lodash';
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
      label:'联系人姓名',
      textAlign:'left',
    },
    {
      key:'contRelation',
      label:'与会员关系',
      textAlign:'center',
    },
    {
      key:'contPhone',
      label:'联系人联系电话',
      textAlign:'center',
    },
    {
      key:'contIdnum',
      label:'联系人身份证号',
      textAlign:'center',
    }
  ];//关系人

  titlesVehicleInfo= [
    { key:'carBrand', label:'车辆品牌',textAlign:'center' },
    { key:'carModel', label:'车辆型号' },
    { key:'viNumber', label:'车架号',textAlign:'center' },
    { key:'carNumber', label:'车牌号',textAlign:'center'},
    { key:'carRegNumber', label:'登记证号',textAlign:'center' },
    { key:'carAge', label:'购车年份',textAlign:'center' },
    { key:'mileage', label:'行驶里程',textAlign:'right' },
    { key:'pricePotential', label:'评估价格' ,textAlign:'right'},
  ]; //车
  titlesHouseInfo= [
    { key:'houseAdress', label:'房产地址' },
    { key:'area', label:'建筑面积',textAlign:'right' },
    { key:'houseType', label:'房屋类型', isDict: true, category: 'HOUSE_TYPE' ,textAlign:'center'  },
    { key:'houseAge', label:'竣工年份',textAlign:'center'},
    { key:'debtMoney', label:'尚欠贷余额',textAlign:'right' },
    { key:'landNo', label:'土地所有证号' ,textAlign:'center'},
    { key:'houseBelongNo', label:'房屋所有权证号',textAlign:'center' },
    { key:'pricePotential', label:'评估价格' ,textAlign:'right'},
    // { key:'loanYear', label:'贷款年限' },
    // { key:'debtBank', label:'按揭银行' },
    // { key:'houseScale', label:'产权份额' },
    // { key:'belongTo1', label:'所有权1' },
    // { key:'belongTo2', label:'所有权2' },
    // { key:'belongTo3', label:'所有权3' },
  ];//房
  titlesCreditInfo=[
    { key:'creditType', label:'信用报告',textAlign:'center' },
    // { key:'creditLevel', label:'综合信用等级',textAlign:'center' },
    { key:'creditExpire', label:'有效日期',textAlign:'center' },
  ];//征信

  creditActions:any = [PREVIEW];
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
            this.baseInfo.mSex = this._memberService.cardGetSex(this.baseInfo.idNumber);
            this.baseInfo.mAge = this._memberService.cardGetAge(this.baseInfo.idNumber);
            this.emergencyContact=this.member.contactList|| [];
            this.workInfo=this.member.workInfo|| {};
            this.accountInfo=this.member.acBank|| {};
            this.financialInfo=this.member.financialInfo|| {};
            if(this.financialInfo.hasCar==""||this.financialInfo.hasCar==null){
              this.financialInfo.hasCar = 0;
            }
            if(this.financialInfo.hasHouse==""||this.financialInfo.hasHouse==null){
              this.financialInfo.hasHouse = 0;
            }
            this.vehicleInfo=this.member.carMessageList|| [];
            this.formatNum(this.vehicleInfo);
            this.houseInfo=this.member.houseMessageList|| [];
            this.formatNum(this.houseInfo);
            this.creditInfo=this.member.creditInfo|| [];
            this.forCreditList();
            this.creditInfo = _.map(this.creditInfo, r => _.set(r, 'actions', [PREVIEW]));
          }).catch(err=>{
            this.showError(err.msg || '连接失败');
          });
        }
      })
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
  change(){
    alert();
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
  //对应报告类型
  forCreditList(){
      for (let index = 0; index < this.creditInfo.length; index++) {
        if(this.creditInfo[index]!==null && this.creditInfo[index].creditType!==null&&this.creditInfo[index].creditType!==undefined){
          if(this.creditInfo[index].creditType==1){
            this.creditInfo[index].creditType = "个人风险报告"
          }else if (this.creditInfo[index].creditType==2){
            this.creditInfo[index].creditType = "个人信用报告"
          }else if (this.creditInfo[index].creditType==3){
            this.creditInfo[index].creditType = "个人反欺诈报告"
          }
      }
      if(this.creditInfo[index] === null){
        this.creditInfo.splice(index, 1);
        index--;
      }
    }
  }
  //预览
  openLink($event){
    window.open(this.creditInfo[$event.key].creditReport);
  }
}
