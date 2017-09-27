
import {Component, OnInit} from "@angular/core";
import {IntentionService} from "../../intention.service";
import {ActivatedRoute, Params} from "@angular/router";
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

  public member: any = {};

  public loanInfo: any = {};

  public pawnVehicle: any = [];

  public pawnHouse: any = [];

  public creditInfo: any = [];

  public attachment: any = [];

  public intentionId: string;

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
    this.service.updateLoanInfo(this.loanInfo).then((result) => {
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
        this.member = result.data.member;
        this.loanInfo = result.data.loanInfo;
        this.pawnHouse = result.data.pawnHouse;
        this.attachment = result.data.attachment;
        this.creditInfo = result.data.creditInfo;
        this.pawnVehicle = result.data.pawnVehicle;
      }else {
        console.log("fail");
      }
    });
  }

  //新增抵押车辆
  protected createPawnVehicle() {

  }

  //移除抵押车辆
  protected removePawnVehicle() {

  }

  //新增抵押房产
  protected createPawnHouse() {

  }

  //移除抵押房产
  protected removePawnHouse() {

  }

}
