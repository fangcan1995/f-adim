import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../../../member.service';
import { SeerMessageService } from '../../../../../../theme/services/seer-message.service';

@Component({
  selector: 'loansInfo',
  templateUrl: './loansInfo.component.html',
  styleUrls: ['./loansInfo.component.scss']
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
          this.memberId=params.id;
          // this.getloanAllStatistic();
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

  getloanAllStatistic(){
    this._memberService.getloanAllStatistic(this.memberId)
    .then(res => {
        this.loansRecord = res.data || {};
      }).catch(err=>{
      this.showError(err.msg || '连接失败');
    });
  }
}
