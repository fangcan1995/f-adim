
import {Component, OnChanges, OnInit} from "@angular/core";
import {IntentionService} from "../../intention.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import { Location } from '@angular/common';
@Component({
  templateUrl: './second-audit.component.html',
  styleUrls: ['./second-audit.component.scss']
})
export class SecondAuditComponent implements OnInit, OnChanges {

  public member: any = {}; //会员信息

  public loan: any = {}; //借款信息

  public vehicles: any = []; //车辆信息

  public houses: any = []; //房屋信息

  public credits: any = []; //信用信息

  public attachment: any = []; //审核资料（附件）

  public investRecords: any = []; //投资信息

  public auditHistory: any = []; //审核记录

  public loanType: any = {};

  public pawn: any = {}; //抵押物信息

  public id: string;

  public submitData: any = {};

  public titles = [
    {key:'number',label:'编号'},
    {key:'process',label:'审批流程'},
    {key:'time',label:'审批时间'},
    {key:'operator',label:'操作人员'},
    {key:'result',label:'审批结果'},
  ];

  constructor(
    private service: IntentionService,
    private route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    private _location: Location){}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      params['id']? this.id = params['id']:"";
      this.getIntentionById(this.id);
    });

    //this.getDicts();
  }

  ngOnChanges() {
    //this.getDicts();
  }

  //通过id获取意向信息
  protected getIntentionById(id :string) {
    this.service.getIntentionById(id).then((res) => {
      if("0" == res.code) {
        this.loan = res.data.loanInfo;
        this.member = res.data.memberInfo;
        this.attachment = res.data.attachment || [];
        this.credits = res.data.memberInfo.credits;
        this.pawn = res.data.pawnInfo;
        this.auditHistory = res.data.auditHistory;
        this.investRecords = res.data.invests;
        if(this.loan.loanApplyType == 1) { this.vehicles = res.data.memberInfo.vehicles }
        if(this.loan.loanApplyType == 2) { this.houses = res.data.memberInfo.houses }
      }else {
        console.log("fail");
      }
    });
  }

  private getDicts(): void {
    let loanApplyType = [{"fieldName": "loanApplyType","category": "LOAN_APPLY_TYPE"}];
    this.service.getDictTranslate(loanApplyType).then(res =>{
      if(0 == res.code) {
        this.loanType = res.data.loanApplyType;
      }else {
        console.log(res.message);
      }
    });
  }

  private loanTypeChange($event): void {
    if(1 == $event) {
      this.vehicles = this.member.vehicles;
      this.houses = [];
    }

    else if(2 == $event) {
      this.vehicles = [];
      this.houses = this.member.houses;
    }

    else if(3 == $event) {
      this.vehicles = [];
      this.houses = [];
    }
    this.loan.loanApplyType = $event;
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

  handleBackBtnClick() {
    this._location.back();
  }

  private handleSaveBtnClick(){
    this.service.completion(this.submitData).then(res => {
      if(0 == res.code) {
        this.showSuccess(res.msg || '已提交');
        this._router.navigate(['business/intention']);
      } else {
        this.showError(res.msg || '提交失败');
      }
    });
  }
}
