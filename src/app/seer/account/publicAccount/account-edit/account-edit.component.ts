import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from "../../account.service";
import {Location} from "@angular/common";
import {SeerMessageService} from "../../../../theme/services";


@Component({
  templateUrl: './account-edit.component.html',
  styleUrls: ['../../account.component.scss']
})
export class AccountEditComponent implements OnInit{
  public account: any = {};
  public _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  public toOthersInfo: any = {};
  constructor(private _accountService: AccountService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _messageService: SeerMessageService,
              private element: ElementRef,
              private _location: Location) {
  }
  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {

        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
        }
      });
  }
  //保存
  handleSaveBtnClick(){
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn=true;
    this.account.url='account';

    this._accountService.getInfo(this.account).then((data:any) => {
      this.toOthersInfo=data.data;
      this.element.nativeElement.querySelector('#form_temp').action=this.toOthersInfo.url;
      this.element.nativeElement.querySelector('#form_temp')['char_set'].value=this.toOthersInfo.char_set;
      this.element.nativeElement.querySelector('#form_temp')['partner_id'].value=this.toOthersInfo.partner_id;
      this.element.nativeElement.querySelector('#form_temp')['version_no'].value=this.toOthersInfo.version_no;
      this.element.nativeElement.querySelector('#form_temp')['biz_type'].value=this.toOthersInfo.biz_type;
      this.element.nativeElement.querySelector('#form_temp')['sign_type'].value=this.toOthersInfo.sign_type;
      this.element.nativeElement.querySelector('#form_temp')['MerBillNo'].value=this.toOthersInfo.MerBillNo;
      this.element.nativeElement.querySelector('#form_temp')['TxnTyp'].value=this.toOthersInfo.TxnTyp;
      this.element.nativeElement.querySelector('#form_temp')['AccountTyp'].value=this.toOthersInfo.AccountTyp;
      this.element.nativeElement.querySelector('#form_temp')['AccountNo'].value=this.toOthersInfo.AccountNo;
      this.element.nativeElement.querySelector('#form_temp')['AccountName'].value=this.toOthersInfo.AccountName;
      this.element.nativeElement.querySelector('#form_temp')['AccountBk'].value=this.toOthersInfo.AccountBk;
      this.element.nativeElement.querySelector('#form_temp')['PageReturnUrl'].value=this.toOthersInfo.PageReturnUrl;
      this.element.nativeElement.querySelector('#form_temp')['BgRetUrl'].value=this.toOthersInfo.BgRetUrl;
      this.element.nativeElement.querySelector('#form_temp')['mac'].value=this.toOthersInfo.mac;
      this.element.nativeElement.querySelector('#form_temp').submit();

    }).catch(err => {
      this.forbidSaveBtn = false;
      this.showError(err.msg || '获取数据错误');
    });
  }
  //返回
  handleBackBtnClick() {
    this._location.back();
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}
