import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit
} from "@angular/core";
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { UserService } from '../../user.service';
import { SeerDialogService, SeerMessageService } from '../../../../../theme/services';
@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
  user: any = {};
  roles: any = [];
  orgs: any =[];
  private editType:string = 'add';
  private forbidSaveBtn:boolean = true;
  private forbidResetPasswordBtn:boolean = true;
  private id:string;
  private isDepartmentDropdownOpen:boolean = false;

  @ViewChild('myForm') myForm;
  constructor(
    private _userService: UserService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    ) { }
  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    if ( this.editType === 'edit' ) {
      this._userService.getOne(this.id)
      .then(res => {
        this.user = res.data || {};
        this.forbidSaveBtn = false;
        this.forbidResetPasswordBtn = false;
      })
      .catch(err => {
        this.showError(err.msg || '获取用户信息失败')
        .onClose()
        .subscribe(() => {
          this._router.navigate(['/system/user']);
        });
      });
    } else if ( this.editType === 'add' ) {
      this._route.queryParams
      .subscribe(res => {
        this.user = _.clone(res || {})
      });
      this.forbidSaveBtn = false;

      this.getRoles()
      .then(res => {
        let data = res.data || {};
        this.roles = data.list || [];
      });
      this.getOrgs()
      .then(res => {
        let data = res.data || {};
        this.orgs = data.list || [];
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  toggleDepartmentDropdown($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isDepartmentDropdownOpen = !this.isDepartmentDropdownOpen
  }
  handleSaveBtnClick() {
    if ( this.myForm.form.valid ) {
      this.forbidSaveBtn = true;
      if ( this.editType === 'edit' ) {
        this._userService.putOne('', this.user)
        .then(res => {
          this.forbidSaveBtn = false;
          this.showSuccess(res.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/system/user']);
          });
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '更新失败')
        })
      } else {
        this._userService.postOne(this.user)
        .then(res => {
          this.forbidSaveBtn = false;
          this.showSuccess(res.msg || '保存成功')
        })
        .catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '保存失败')
        })
      }
      
    }
  }
  handleBackBtnClick() {
    this._location.back();
  }
  getRoles() {
    return this._userService.getRoles()
  }
  getOrgs() {
    return this._userService.getOrgs();
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
