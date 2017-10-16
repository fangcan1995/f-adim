import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';

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
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
      .subscribe(params => {
        //console.log(this._editType);
        if ( this._editType === 'detail' ) {
          this._memberService.getTrades(params.id)
            .subscribe(res => {
              this.member = res.data || {};
              this.tradesRecord=res.data.tradesRecord;
              this.forbidSaveBtn = false;
            }, errMsg => {
              // 错误处理的正确打开方式

            })
        }
      })
  }
  handleBackBtnClick() {
    this._location.back()
  }
  ckboxToggle(category:any){
    alert(category);
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
      //this._memberService.getTrades(params.id);
    }
  }//选框点击

}
