import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
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
      key:'time',
      label:'交易时间',
      type:'date-time'
    },
    {
      key:'bbb',
      label:'交易类型',
    },
    {
      key:'ccc',
      label:'交易金额(元)',
    },
    {
      key:'idNumber',
      label:'状态',
    }
  ];
  memberId:any='';
  className=["common active","common", "common", "common", "common"];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"menuPid,sortNum",
    "total":10,
    "query":{
      "category":""
    }
  }; //分页及排序
  tradeTypes = [
    {
      "code":"first",
      "category":"01",
      "tradeTypeName":"投资记录",
    },
    {
      "code":"second",
      "category":"02",
      "tradeTypeName":"充值记录",
    },
    {
      "code":"third",
      "category":"03",
      "tradeTypeName":"提现记录",
    },
    {
      "code":"forth",
      "category":"04",
      "tradeTypeName":"借款记录",
    }
  ];

  currentType="all";  //当前选中类型
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
          this._memberService.getTrades(params.id)
            .then(res => {
              this.member = res.data || {};
              this.tradesRecord=res.data.tradesRecord;
              this.forbidSaveBtn = false;
            }).catch(err=>{
            this.showError(err.msg || '连接失败');
          });
      })
  }
  toggle(category:any,index?){
    if(this.currentType!=category){
      if(category=="all"){
        this.currentType='all';
        this.className = ["common active", "common", "common", "common", "common"];
        this.pageInfo.query.category="";
      }else{
        this.currentType=category;
        this.className = ["common", "common", "common", "common", "common"];
        this.className[index]="common active";
        this.pageInfo.query.category=category;
      }

    }
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
}
