
import {Component, OnInit} from "@angular/core";
import {IntentionService} from "../../intention.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DELETE, SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
@Component({
  templateUrl: './intention-completion.component.html',
  styleUrls: ['./intention-completion.component.scss']
})
export class IntentionCompletionComponent implements OnInit {

  hasGlobalFilter = true;
  filters = [
    /*{ key: 'name', label: '用户名', type: 'input.text' },
    { key: 'gender', label: '性别', type: 'select', options:
      [ { content: '请选择' },
        { value: '0', content: '男' },
        { value: '1', content: '女', }
      ]
    },
    { key: 'mobile', label: '手机号', type: 'input.text' },*/
  ];

  public memberActions = [ UPDATE ];

  public loanActions = [ UPDATE ];

  public member: any = {};

  public loan: any = {};

  public vehicles: any = [];

  public houses: any = [];

  public credits: any = [];

  public attachment: any = [];

  public intentionId: string;

  public datas = [];

  public titles = [
    {key:'number',label:'编号'},
    {key:'process',label:'审批流程'},
    {key:'time',label:'审批时间'},
    {key:'operator',label:'操作人员'},
    {key:'result',label:'审批结果'},
  ];

  constructor(private service: IntentionService, private route: ActivatedRoute,){}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      params['id']? this.intentionId = params['id']:"";
      //this.getIntentionById(this.intentionId);
    });

  }

  //补填会员基本资料
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

  //通过id获取意向信息
  protected getIntentionById(intentionId :string) {
    this.service.getIntentionById(intentionId).then((result) => {
      if("0" == result.code) {
        this.loan = result.data.loan;
        this.member = result.data.member;
        this.houses = result.data.member.houses;
        this.attachment = result.data.attachment;
        this.credits = result.data.member.credits;
        this.vehicles = result.data.member.vehicles;
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

}
