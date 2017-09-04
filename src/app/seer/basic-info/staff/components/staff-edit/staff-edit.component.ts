import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts,
} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
import { StaffService } from '../../staff.service';

@Component({
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  public staff: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;

  //下面两个为多个checkbox选择插件配置
  dropdownSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  myRepertoryTexts: IMultiSelectTexts = {
    checkAll: '选中所有',
    uncheckAll: '取消所有',
    checked: '个选中',
    checkedPlural: '个选中',
    searchPlaceholder: '搜索...',
    defaultTitle: '选择账号',
  };
  private accountData: IMultiSelectOption[] = [];
  constructor(
    private _staffService: StaffService,
    private _messageService: SeerMessageService,
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
      if ( this._editType === 'edit' ) {
        this._staffService.getOne(params.id)
        .subscribe(res => {
          this.staff = res.data || {};
          this.forbidSaveBtn = false;
        }, errMsg => {
          // 错误处理的正确打开方式
          this._messageService.open({
            icon: 'fa fa-times-circle',
            message: errMsg,
            autoHideDuration: 3000,
          }).onClose().subscribe(() => {
            this._location.back()
          })
        })
      } else if ( this._editType === 'add' ) {
        this.forbidSaveBtn = false;
      }
    })
  }

  saveStaff(): void{
    /*if(this.currentStaff.id){
      let newStaffDto = new NewStaffDto;
      newStaffDto.buzStaffDto = this.currentStaff;
      newStaffDto.account = this.cognateAccount;
      newStaffDto.sysRole = this.currentRole;
      this.staffManageService.updateStaff(newStaffDto)
        .subscribe(
          res => {
            this.isCognate = false;
            this.checkAllinput = false;
            this.currentStaff = false;
            this.staffOrgName = '';
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      let newStaffDto = new NewStaffDto;
      newStaffDto.buzStaffDto = this.currentStaff;
      newStaffDto.account = this.cognateAccount;
      newStaffDto.sysRole = this.currentRole;
      this.staffManageService.addStaff(newStaffDto)
        .subscribe(
          res => {
            this.isCognate = false;
            this.checkAllinput = false;
            this.currentStaff = false;
            this.staffOrgName = '';
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }*/
  }
  getAccountList(): void {
    /*if(this.isCognate == true){
      this.selsectNotes = '';
      this.cognateAccount = [];
      this.accountList = [];
      if(this.currentStaff.staffNo){
        let map1 = {key:this.currentStaff.staffNo,label:'员工编号'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffPhone){
        let map1 = {key:this.currentStaff.staffPhone,label:'手机号'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffMail){
        let map1 = {key:this.currentStaff.staffMail,label:'邮箱'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffWechat){
        let map1 = {key:this.currentStaff.staffWechat,label:'微信'};
        this.accountList.push(map1)
      }
    }else{
      this.accountList = [];
      this.cognateAccount = [];
      this.selsectNotes = '';
      this.currentRole = null;
    }
    let mulitiColloneArray = [];
    if(this.accountList){
      let x = 1;
      this.accountList.forEach(function (brand) {
        mulitiColloneArray.push({id: brand.key, name: brand.label});
      });
    }
    this.accountData = mulitiColloneArray;*/
  }
  handleBackBtnClick() {
    this._location.back()
  }
  handleSaveBtnClick() {
    

  }
}
