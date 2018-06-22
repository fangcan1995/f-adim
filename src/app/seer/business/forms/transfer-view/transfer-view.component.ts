
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import { FileUploader} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";
import {ABORTIVE, PREVIEW} from "../../../common/seer-table/seer-table.actions";

@Component({
  templateUrl: './transfer-view.component.html',
  styleUrls: ['./transfer-view.component.scss']
})
export class TransferViewComponent implements OnInit , OnChanges{
  public id: string;
  public method: string;
  public transStatus: string;
  public currentNode:number=0;
  isLoading: boolean = true;
  //流程信息
  transferProgres:any;

  //会员信息
  public member: any = {};
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式

  //申请信息
  public loan: any = {};
  public transfer:any={};

  //投资记录
  public investRecords = [];
  public investTitle = [
    {key:'account',label:'投资人账号'},
    {key:'trueName',label:'投资人姓名'},
    {key:'phoneNumber',label:'投资人手机号'},
    {key:'investAmount',label:'投资金额（元）'},
    {key:'investTime',label:'投资时间'},
    {key:'investWay',label:'投资方式',isDict: true, category: 'INVEST_WAY' },
  ];
  public investTransferRecords = [];
  public investTransferTitle = [
    {key:'userName',label:'投资人账号'},
    {key:'trueName',label:'投资人姓名'},
    {key:'phone',label:'投资人手机号'},
    {key:'investAmt',label:'投资金额（元）'},
    {key:'investTime',label:'投资时间'},
    {key:'investWay',label:'投资方式',isDict: true, category: 'INVEST_WAY' },
  ];

  //还款记录
  public repayRecords = [];
  public repayTitle = [
    {key:'rpmtIssue',label:'期数'},
    {key:'shdRpmtDate',label:'应还日期'},
    {key:'realRpmtDate',label:'实还日期'},
    {key:'rpmtCapital',label:'已还本金（元）'},
    {key:'rpmtIint',label:'已还利息（元）'},
    {key:'rpmtTotal',label:'已还总额（元）',isDict: true, category: 'INVEST_WAY' },
    {key:'statusName',label:'还款状况',isDict: true, category: 'RPMT_STATUS' },
  ];

  //审核记录
  public auditProcessRecords = [];
  public auditProcessTitle = [
    {key:'taskName',label:'审批流程'},
    {key:'completeTime',label:'审批时间'},
    {key:'account',label:'操作账号'},
    {key:'operatorName',label:'操作人员'},
    {key:'opinion',label:'审批结果'}];

  constructor(private service: FormsService, private route: ActivatedRoute, private _dialogService: SeerDialogService,
              private _location: Location, private modalService: BsModalService, private _messageService: SeerMessageService){
  }

  ngOnInit() {
    //this.currentNode = 1;
    this.transferProgres = [
      {text:"债转审核/发布"},
      {text:"转让中"},
      {text:"满标审核"},
      {text:"还款中"},
      {text:"已结清"}
    ];

    this.route.params.subscribe((params: Params) =>
      {
        params['id']? this.id = params['id']:"";
        params['method']? this.method = params['method']:"";


        this.getTransferDetail(this.id);
        this.getTransferAuditRecords(this.id);



      }
    );

  }

  ngOnChanges() { }

  //查询会员信息
  public getProjectMember(projectId: string) {
    this.isLoading = true;
    this.service.getProjectMember(projectId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.baseInfo;
        this.getRepaymentRecords(projectId,this.member.memberId);
      }else {
        console.log("fail");
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '获取贷款信息失败！' )
    });
  }

  //查询项目信息（借款信息）
  public getProjectDetail(projectId: string) {
    this.service.getProjectDetail(projectId).then((res) => {
      if("0" == res.code) {
        this.loan = res.data.loanBase;
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取申请信息失败！' ) });
  }

  //查询债转项目信息（借款信息）
  public getTransferDetail(id: string) {
    this.service.getTransferDetail(id).then((res) => {
      if("0" == res.code) {
        this.transfer = res.data;
        this.transfer.minInvestAmount=100;
        console.log('当前方法')
        console.log(this.method);
        switch (this.method) {
          case `be_audit`:
            //console.log('债转标预览');
             this.currentNode=1;
            break;
          case `full_audit`:
             this.currentNode=3;
            break;
          case `preview`:
            if(this.transfer.transStatus==5){
              this.transferProgres = [
                {text:"债转审核/发布"},
                {text:"债转失败"},
              ];
              this.currentNode=2;
            }else{
              this.currentNode=this.transfer.transStatus;
            }



            break;
          case `abortive`:
            //this.currentNode=3;
            this.transferProgres = [
              {text:"债转审核/发布"},
              {text:"转让中"},
              {text:"债转失败"},
            ];
            this.currentNode=this.transfer.transStatus+1;
            this.auditResult='refuse';
            //流标
            break;
          default:

            break;
        }
        this.investTransferRecords=this.transfer.investList; //债转标投资记录
        let projectId=this.transfer.projectId;
        console.log('债转标信息');
        console.log(this.transfer);
        this.getProjectDetail(projectId);
        this.getProjectMember(projectId);
        this.getInvestRecords(projectId);
        //this.getRepaymentRecords(projectId)
      }else {
        //console.log("fail");
      }
    }).catch(err => { this.showError('获取债转信息失败！' ) });
  }

  //查询原标的投资记录
  public getInvestRecords(projectId: string) {
    this.service.getLoanInvestRecords(projectId).then((res) => {
      if("0" == res.code) {
        this.investRecords = res.data;

      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取投资记录失败！' ) });
  }

  //查询标的还款记录
  public getRepaymentRecords(projectId: string,memberId:string) {
    this.service.getLoanRepaymentRecords(projectId,memberId).then((res) => {
      if("0" == res.code) {
        this.repayRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取投资记录失败！' ) });
  }

  //查询债转标的审批记录
  public getTransferAuditRecords(projectId: string) {
    this.service.getTransferProjectAuditRecords(projectId).then((res) => {
      if("0" == res.code) {
        /*res.data[0].taskName=`债权转让审核`;
        res.data[0].opinion=`同意发布`;
        res.data[1].taskName=`满标`;
        res.data[1].account=``;
        res.data[1].operatorName=``;
        res.data[1].completeTime="2018-05-30 12:30:25";
        res.data[1].opinion=``;
        res.data.push({account:`admin`,taskName:`满标审核`,opinion:`同意划转`,operatorName: "方灿",assigneeId: "0e86acccf5864557abf51b54a9669f00",
          completeTime: "2018-05-30 14:56:52"})
        console.log('审批信息');
        console.log(res.data);*/
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取债转审批记录失败！' ) });
  }

  //提交审核
  public auditResult: string = "pass";
  public auditOpinion: string = "";
  public auditReason: string = "";
  public submitAudit(){
    this._dialogService.confirm('是否确认提交审核?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        this.isLoading = true;
        let param = {
          "auditResult": this.auditResult,
          "opinion": this.auditReason + " " + this.auditOpinion
        };
        this.service.transferAudit(this.id, param).then(res =>{
          if(0 == res.code) {
            this.showSuccess(res.message);
            this.handleBackBtnClick();
          }else {
            this.showError(res.message);
          }
          this.isLoading = false;
        }).catch(error => {
          this.isLoading = false;
          this.showError('操作失败')
        });
      }
    })
  }


  //返回
  handleBackBtnClick() {this._location.back();}

  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000,})}

  //失败提示
  showError(message: string) { return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000,})}

}
