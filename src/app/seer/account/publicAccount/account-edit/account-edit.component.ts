import {Component, OnInit,OnChanges,Input, ViewChild,TemplateRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from "../../account.service";
import {Location} from "@angular/common";


@Component({
  templateUrl: './account-edit.component.html',
  styleUrls: ['../../account.component.scss']
})
export class AccountEditComponent implements OnInit{
  public account: any = {};
  public _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  constructor(private _accountService: AccountService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
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
  //返回
  handleBackBtnClick() {
    this._location.back();
  }
}
