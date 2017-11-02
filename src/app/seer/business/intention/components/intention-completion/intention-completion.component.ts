
import {Component, OnChanges, OnInit} from "@angular/core";
import {IntentionService} from "../../intention.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DELETE, SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
@Component({
  templateUrl: './intention-completion.component.html',
  styleUrls: ['./intention-completion.component.scss']
})
export class IntentionCompletionComponent implements OnInit, OnChanges {

  private member: any = {}; //会员信息

  private loan: any = {}; //借款信息

  private vehicles: any = []; //车辆信息

  private houses: any = []; //房屋信息

  private credits: any = []; //信用信息

  private attachment: any = []; //审核资料（附件）

  private investRecords: any = []; //投资信息

  private auditHistory: any = []; //审核记录

  private loanType: any = {};

  private pawn: any = {}; //抵押物信息

  private id: string;

  private datas = [];

  private titles = [
    {key:'number',label:'编号'},
    {key:'process',label:'审批流程'},
    {key:'time',label:'审批时间'},
    {key:'operator',label:'操作人员'},
    {key:'result',label:'审批结果'},
  ];

  constructor(private service: IntentionService, private route: ActivatedRoute,){}

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
        this.houses = res.data.memberInfo.houses;
        this.vehicles = res.data.memberInfo.vehicles;
        this.attachment = res.data.attachment;
        this.credits = res.data.memberInfo.credits;
        this.pawn = res.data.pawnInfo;
        this.auditHistory = res.data.auditHistory;
        this.investRecords = res.data.invests;
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
  /*//补填会员基本资料
  protected updateMember() {
    this.service.updateMember(this.member).then((result) => {
      if(result.code == 0) {
        console.log("success");
      }else {
        console.log("fail");
      }
    });
  }

  //补填贷款资料
  protected updateLoanInfo() {
    this.service.updateLoanInfo(this.loan).then((result) => {
      if(result.code == 0) {
        console.log("success");
      }else {
        console.log("fail");
      }
    });
  }



  //新增抵押物
  protected createPawn() {

  }

  //移除抵押物
  protected removePawn() {

  }

  //会员操作（修改保存）
  protected handleMemberCardNotify($event){
    console.log($event)
  }

  //借款操作（修改保存）
  protected handleLoanCardNotify($event){
    console.log($event)
  }
*/
}
