import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';

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
        if ( this._editType === 'loans' ) {
          this.memberId=params.id;
          this._memberService.getLoans(params.id)
            .then(res => {
              this.member = res.data || {};
              this.loansRecord=res.data.loansRecord;
              this.forbidSaveBtn = false;
            }).catch(err=>{
            this.showError(err.msg || '连接失败');
          });
        }
      })
  }
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
