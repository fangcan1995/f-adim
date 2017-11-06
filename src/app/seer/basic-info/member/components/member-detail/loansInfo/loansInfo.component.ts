import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';

@Component({
  selector: 'loansInfo',
  templateUrl: './loansInfo.component.html',

})
export class LoansInfoComponent implements OnInit {
  public member: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  loansRecord: any = [];  //借款记录
  titlesLoansRecord=[
    {
      key:'id',
      label:'项目编号',
    },
    {
      key:'status',
      label:'状态',
    },
    {
      key:'count',
      label:'借款金额',
    },
    {
      key:'qx',
      label:'借款期限(月)',
    },
    {
      key:'yhbx',
      label:'已还本息',
    },
    {
      key:'dhbx',
      label:'待还本息',
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
          this._memberService.getLoans(params.id)
            .then(res => {
              this.member = res.data || {};
              this.loansRecord=res.data.loansRecord;
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
