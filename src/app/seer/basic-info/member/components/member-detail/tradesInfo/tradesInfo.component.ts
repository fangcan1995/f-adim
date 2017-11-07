import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';

@Component({
  selector: 'tradesInfo',
  templateUrl: './tradesInfo.component.html',

})
export class TradesInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  tradesRecord: any = [];  //借款记录
  titlesTradesRecord=[
    {
      key:'aaa',
      label:'交易时间',
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
      key:'ddd',
      label:'状态',
    }
  ];
  memberId:any='';

  isChecked={
    "all":true,
    "first":false,
    "second":false,
    "third":false,
    "forth":false
  };
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
        if ( this._editType === 'trades' ) {
          this.memberId=params.id;
          this._memberService.getTrades(params.id)
            .then(res => {
              this.member = res.data || {};
              this.tradesRecord=res.data.tradesRecord;
              this.forbidSaveBtn = false;
            }).catch(err=>{
            this.showError(err.msg || '连接失败');
          });
        }
      })
  }
  ckboxToggle(category:any){
    if(this.currentType!=category){
      for ( var i in this.isChecked) {
        this.isChecked[i]=false;
      }
      if(category=="all"){
        this.currentType='all';
        this.isChecked['all']=true;
        this.pageInfo.query.category="";
      }else{
        this.currentType=category;
        this.isChecked[category]=true;
        this.pageInfo.query.category=category;
      }
    }
  }//选框点击
  handleBackBtnClick() {
    this._router.navigate([`../../`], {relativeTo: this._route});
  }
  memberInfoClick(){
    this._router.navigate([`../../detail/${this.memberId}`], {relativeTo: this._route});
  }
  investInfoClick(){
    this._router.navigate([`../../invests/${this.memberId}`], {relativeTo: this._route});
  }
  loanInfoClick(){
    this._router.navigate([`../../loans/${this.memberId}`], {relativeTo: this._route});
  }
  tradeInfoClick(){
    this._router.navigate([`../../trades/${this.memberId}`], {relativeTo: this._route});
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
}
