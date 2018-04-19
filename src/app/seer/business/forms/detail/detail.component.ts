
import {Component, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private member: any = {}; //会员信息

  private loan: any = {}; //借款信息

  private vehicles: any = []; //车辆信息

  private houses: any = []; //房屋信息

  private credits: any = []; //信用信息

  private attachment: any = []; //审核资料（附件）

  private investRecords: any = []; //投资信息

  private auditHistory: any = []; //审核记录

  private pawn: any = {}; //抵押物信息

  private id: string;

  constructor(
    private service: FormsService,
    private route: ActivatedRoute,
    private _location: Location){}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      params['id']? this.id = params['id']:"";
      this.getIntentionById(this.id);
    });

  }

  //通过id获取意向信息
  protected getIntentionById(id :string) {
    /*this.service.getProjectById(id).then((res) => {
      if("0" == res.code) {

        this.loan = res.data;
        console.log(this.loan);
       /!* this.loan = res.data.loanInfo;
        this.member = res.data.memberInfo;
        this.attachment = res.data.attachment || [];
        this.credits = res.data.memberInfo.credits;
        this.pawn = res.data.pawnInfo;
        this.auditHistory = res.data.auditHistory;
        this.investRecords = res.data.invests;
        if(this.loan.loanApplyType == 1) { this.vehicles = res.data.memberInfo.vehicles }
        if(this.loan.loanApplyType == 2) { this.houses = res.data.memberInfo.houses }*!/
      }else {
        console.log("fail");
      }
    });*/
  }

  handleBackBtnClick() {this._location.back();}

}
