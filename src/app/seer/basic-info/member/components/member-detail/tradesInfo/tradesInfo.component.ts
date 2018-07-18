import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';

@Component({
  selector: 'tradesInfo',
  templateUrl: './tradesInfo.component.html',
  styleUrls: ['./tradesInfo.component.scss']

})
export class TradesInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  tradesRecord: any = [];  //借款记录
  titlesTradesRecord=[
    {
      key:'createTime',
      label:'交易时间',
      textAlign:'center'
    },
    {
      key:'payType',
      label:'交易类型',
      textAlign:'center'
    },
    {
      key:'transAmt',
      label:'交易金额(元)',
      textAlign:'right'
    },
    {
      key:'transState',
      label:'状态',
      textAlign:'center'
    }
  ];
  memberId:any='';
  className=["common active","common", "common", "common", "common","common","common"];
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "-createTime",
    "total": "",
    "startTime":"",
    "endTime":"",
    "transState":"",
    "payType":""
  }; //分页、排序、检索
  tradeTypes = [
    {
      "code":"1",
      "category":"01",
      "tradeTypeName":"充值记录",
    },
    {
      "code":"2",
      "category":"02",
      "tradeTypeName":"资费记录",
    },
    {
      "code":"3",
      "category":"03",
      "tradeTypeName":"提现记录",
    },
    {
      "code":"4",
      "category":"04",
      "tradeTypeName":"投资记录",
    },
    {
      "code":"5",
      "category":"05",
      "tradeTypeName":"回款记录",
    },
    {
      "code":"6",
      "category":"06",
      "tradeTypeName":"奖励记录",
    }
  ];

  currentType="all";  //当前选中类型
  oldCallRecord:number = 0;
  startTime:any;
  endTime:any;
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
          this.memberId=params.id;
          // this.getRecordList();
      })
  }
  toggle(category:any,index?){
    if(this.currentType!=category){
      if(category=="all"){
        this.currentType='all';
        this.className = ["common active", "common", "common", "common", "common","common","common"];
        this.pageInfo.payType = "";
      }else{
        this.currentType=category;
        this.className = ["common", "common", "common", "common", "common","common","common"];
        this.className[index]="common active";
        this.pageInfo.payType = category;
      }
    }
    this.getRecordList();
  }//选框点击

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

  //格式化金额+—
  formateAmt(recode:any){
    for (let index = 0; index < recode.length; index++) {
      if(recode[index].amountState === "1"){
        recode[index].transAmt = "+"+recode[index].transAmt
      }else{
        recode[index].transAmt = "-"+recode[index].transAmt
      }
      
    }
  }

  handleStartFilterChange(){
    let currentTime = (new Date()).getTime();
    if(currentTime - this.oldCallRecord < 1500){
      return;
    }
    if(this.startTime){
      this.oldCallRecord = currentTime;
      this.getRecordList();
    }   
  }

  handleEndFilterChange(){
    let currentTime = (new Date()).getTime();
    if(currentTime - this.oldCallRecord < 1500){
      return;
    }
    if(this.endTime){
      this.oldCallRecord = currentTime;
      this.getRecordList();
    }   
  }

  getRecordList(){
      this.pageInfo.startTime =  this.startTime ? (formatDate( new Date(this.startTime),'YYYY-MM-DD 00:00:00')) : '';
      this.pageInfo.endTime =  this.endTime ? (formatDate( new Date(this.endTime),'YYYY-MM-DD 23:59:59')) : '';
      this._memberService.getTrades(this.memberId, this.pageInfo)
      .then(res => {
        this.member = res.data || {};
        this.tradesRecord=res.data.list;
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        this.formateAmt(this.tradesRecord);
        this.forbidSaveBtn = false;
      }).catch(err=>{
      this.showError(err.msg || '查询交易记录失败！');
    });
  }

  /**
   * 选择状态
   */
  transStateChange(){
    this.getRecordList();
  }

  /**
   * 重置
   */
  resetSelect(){
    this.pageInfo.transState = "";
    this.endTime = "";
    this.startTime = "";
    this.pageInfo.startTime = "";
    this.pageInfo.endTime = "";
    this.getRecordList();
  }

  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getRecordList();
  }
}
