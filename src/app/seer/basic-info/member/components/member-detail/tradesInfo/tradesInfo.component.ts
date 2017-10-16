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
  hasGlobalFilter = true;
  filters = [

    {
      key: 'type',
      label: '借款方式',
      type: 'select',
      options: [
        {
          content: '全部交易记录'
        },
        {
          value: '0',
          content: '投资记录'
        },
        {
          value: '1',
          content: '充值记录',
        },
        {
          value: '2',
          content: '提现记录',
        },
        {
          value: '3',
          content: '借款记录',
        },
      ]
    },
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

}
