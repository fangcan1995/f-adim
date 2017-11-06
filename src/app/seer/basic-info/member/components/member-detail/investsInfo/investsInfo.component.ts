import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';

@Component({
  selector: 'investsInfo',
  templateUrl: './investsInfo.component.html',

})
export class InvestsInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  investsRecord: any = [];  //借款记录
  titlesInvestsRecord=[
    {
      key:'id',
      label:'项目编号',
    },
    {
      key:'status',
      label:'投资状态',
    },
    {
      key:'count',
      label:'投资金额',
    },
    {
      key:'qx',
      label:'投资期限(月)',
    },
    {
      key:'aaa',
      label:'已收本金',
    },
    {
      key:'bbb',
      label:'已收利息笔数',
    },
    {
      key:'ccc',
      label:'已收利息',
    }
  ];
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
          this._memberService.getInvests(params.id)
          .then(res => {
              this.member = res.data || {};
              this.investsRecord=res.data.investsRecord;
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

}
