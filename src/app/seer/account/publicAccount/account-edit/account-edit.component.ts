import {Component, OnInit,OnChanges,Input, ViewChild,TemplateRef,ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SeerDialogService, SeerMessageService,BASE_URL} from '../../../../theme/services';
import {AccountService} from "../../account.service";
import {Location} from "@angular/common";
import {FileUploader, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import * as _ from 'lodash';

@Component({
  templateUrl: './account-edit.component.html',
  styleUrls: ['../../account.component.scss']
})
export class AccountEditComponent implements OnInit{
  public account: any = {};
  public _editType: string = 'add';
  public forbidSaveBtn: boolean = true;


  constructor(private _accountService: AccountService,
              private _messageService: SeerMessageService,
              private _dialogService: SeerDialogService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private element: ElementRef,
              private _location: Location) {
    //表单验证

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



  //返回
  handleBackBtnClick() {
    this._location.back();
  }
  handleSaveBtnClick() {
    console.log(11111)
    this.element.nativeElement.querySelector('#addAccount').submit()
    // if (this.forbidSaveBtn) return;


    // if (this._editType === 'edit') {
    //   this.forbidSaveBtn=true;

    // } else if (this._editType === 'add') {

    //   this.forbidSaveBtn=true;
    //   console.log('提交表单');

    // } else {
    //   return;
    // }


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
