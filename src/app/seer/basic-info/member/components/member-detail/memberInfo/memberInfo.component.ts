import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { MemberService } from '../../../member.service';

@Component({
  selector: 'memberInfo',
  templateUrl: './memberInfo.component.html',

})
export class MemberInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
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
      key:'name',
      label:'姓名',
    },
    {
      key:'relation',
      label:'关系',
    },
    {
      key:'phone',
      label:'手机号',
    },
    {
      key:'idcode',
      label:'身份证号',
    }
  ];//关系人
  titlesVehicleInfo= [
    { key:'aaa', label:'车辆品牌' },
    { key:'bbb', label:'车辆型号' },
    { key:'ccc', label:'车架号' },
    { key:'ddd', label:'车牌号'},
    { key:'eee', label:'登记证号' },
    { key:'fff', label:'车龄' },
    { key:'ggg', label:'行驶里程' },
    { key:'hhh', label:'评估价格' },
  ]; //车
  titlesHouseInfo= [
    { key:'fcdz', label:'房产地址' },
    { key:'jzmj', label:'建筑面积' },
    { key:'aaa', label:'房屋类型' },
    { key:'aaa', label:'房龄'},
    { key:'aaa', label:'尚欠贷余额' },
    { key:'aaa', label:'土地所有证号' },
    { key:'aaa', label:'房屋产权所有证号' },
    { key:'aaa', label:'评估价格' },
    { key:'aaa', label:'贷款年限' },
    { key:'aaa', label:'按揭银行' },
    { key:'aaa', label:'产权份额' },
    { key:'aaa', label:'所有权1' },
    { key:'aaa', label:'所有权2' },
    { key:'aaa', label:'所有权3' },
  ];//房
  titlesCreditInfo=[
    { key:'aaa', label:'信用报告' },
    { key:'bbb', label:'综合信用等级' },
    { key:'ccc', label:'有效日期' },
  ];//征信
  constructor(
    private _memberService: MemberService,
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
        console.log(this._editType);
        if ( this._editType === 'detail' ) {
          this._memberService.getOne(params.id)
            .then(res => {
              console.log('*********************');
              console.log(res);
              this.member = res.data || {};
              this.baseInfo=this.member.baseInfo|| {};
              this.emergencyContact=this.member.contactList|| [];
              this.workInfo=this.member.workInfo|| {};
              this.accountInfo=this.member.AcBank|| {};
              this.financialInfo=this.member.financialInfo|| {};
              this.vehicleInfo=this.member.carMessageList|| [];
              this.houseInfo=this.member.houseMessageList|| [];
              this.creditInfo=this.member.creditInfo|| [];
              this.forbidSaveBtn = false;
            })
        }
      })
  }
  handleBackBtnClick() {
    this._location.back()
  }

}
