import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';

@Component({
  selector: 'investsInfo',
  templateUrl: './investsInfo.component.html',
  styleUrls: ['./investsInfo.component.scss']

})
export class InvestsInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  investsRecord: any = [];  //借款记录
  investAllStatistic: any = {}; //出借统计
  titlesInvestsRecord=[
    {
      key:'projectName',
      label:'项目编号',
      textAlign:'center'
    },
    {
      key:'investStatus',
      label:'投资状态',
      textAlign:'center'
    },
    {
      key:'investAmt',
      label:'投资金额',
    },
    {
      key:'investExpiry',
      label:'投资期限(月)',
      textAlign:'center'
    },
    {
      key:'receivedCapital',
      label:'已收本金',
      textAlign:'right'
    },
    {
      key:'receivedNum',
      label:'已收利息笔数',
      textAlign:'center'
    },
    {
      key:'receivedIint',
      label:'已收利息',
      textAlign:'right'
    }
  ];
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "-createTime",
    "total": ""
  }; //分页、排序、检索
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
          this.memberId=params.id;
          // this.getInvestAllStatistic();
          // this.getInvestAllListStatistic()
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

  getInvestAllStatistic(){
    this._memberService.getInvestAllStatistic(this.memberId)
    .then(res => {
        this.investAllStatistic = res.data || {};
      }).catch(err=>{
      this.showError(err.msg || '连接失败');
    });
  }

  getInvestAllListStatistic(){
    this._memberService.getInvestAllListStatistic(this.memberId, this.pageInfo)
    .then(res => {
        this.investsRecord=res.data.list;
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
      }).catch(err=>{
      this.showError(err.msg || '连接失败');
    });
  }

  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getInvestAllListStatistic();
  }
}
