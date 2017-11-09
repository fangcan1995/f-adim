import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { UserService } from '../../user.service';
import { SeerDialogService, SeerMessageService } from '../../../../../theme/services';

import { json2Tree } from '../../../../../theme/libs';
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { TREE_PERMISSIONS } from "../../../../../theme/modules/seer-tree/constants/permissions";

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
  user: any = {};
  roles: any = [];
  activeStaff: any = {
    originId: '',
    name: '',
  };
  private editType:string = 'add';
  private forbidSaveBtn:boolean = true;
  private forbidResetPasswordBtn:boolean = true;
  private id:string;
  private isDepartmentDropdownOpen:boolean = false;
  staffTreeNodes;
  staffPermission = TREE_PERMISSIONS.NOTIFY;
  @ViewChild('myForm') myForm;
  @ViewChild('staffTree') staffTree: SeerTree;
  @ViewChild('modal') modal: ModalDirective;
  constructor(
    private _userService: UserService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    private _modalService: BsModalService,
    ) { }
  ngOnInit() {
    this.editType = this._route.snapshot.url[0].path;
    this.id = this._route.snapshot.params.id;
    if ( this.editType === 'edit' ) {
      this._userService.getOne(this.id)
      .then(res => {
        this.user = res.data || {};
        return this.getRoles()
      })
      .then(res => {
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
      Promise.all([ this.getRoles(), this.getUsersWithStaffsWithOrgs() ])
      .then( res => {
        this.forbidSaveBtn = false;
      })
      .catch(err => {
        this.showError(err.msg || '获取用户信息失败')
        .onClose()
        .subscribe(() => {
          this._router.navigate(['/system/user']);
        });
      })
    }
  }
  handleSaveBtnClick() {
    if ( this.myForm.form.valid ) {
      this.forbidSaveBtn = true;
      let roleIds = _(this.roles).filter(t => t.checked).map(t => t['roleId']).value()
      if ( this.editType === 'edit' ) {
        let params = {
          userId: this.user.userId,
          loginName: this.user.loginName,
          roleIds,
        }
        this._userService.putOne('', params)
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
        let params = {
          ...this.user,
          roleIds,
          employeeId: this.activeStaff.originId,
        }
        this._userService.postOne(params)
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
  handleResetPasswordBtn() {
    this._userService.resetPassword()
  }
  getRoles() {
    return this._userService.getRoles()
    .then(res => {
      let data = res.data || {};
      this.roles = data.list || [];
      let activeRoles = this.user.roles || [];
      activeRoles.forEach((t, i) => {
        this.roles.forEach((rt, ri) => {
          if ( rt.roleId == t.roleId ) {
            rt.checked = true;
          }
        })
      })
    })
  }
  getUsersWithStaffsWithOrgs() {
    return this._userService.getUsersWithStaffsWithOrgs()
      .then(res => {
        let data = res.data || {};
        let departments = data.departmentList || [];
        let staffs = data.employeeList || [];
        let users = data.userList || [];
        departments = _(departments).map(t => {
          t = _.set(t, 'originId', t['id']);
          t = _.set(t, 'type', 'D');
          t = _.set(t, 'id', `D__${t['id']}`);
          t = _.set(t, 'originPid', t['pid'] || '0');
          t = _.set(t, 'parentId', t['pid'] ? `D__${t['pid']}` : '0' );
          t = _.set(t, 'customIcon', 'ion-ios-people');
          return t;
        }).value();
        staffs = _(staffs).map(t => {
          t = _.set(t, 'originId', t['id']);
          t = _.set(t, 'type', 'S');
          t = _.set(t, 'id', `S__${t['id']}`);
          t = _.set(t, 'originPid', t['pid'] || '0');
          t = _.set(t, 'parentId', t['pid'] ? `D__${t['pid']}` : '0' );
          t = _.set(t, 'customIcon', 'ion-person');
          return t;
        }).value();

        this.staffTreeNodes = json2Tree(departments.concat(staffs));
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
  showModal() {
    this.modal.show();
  }
  onNotice ({ eventName, node }) {
    if( eventName == 'onActivate' ) {
      if ( node.data.type == 'S' ) {
        this.activeStaff = node.data;
      } else {
        this.showError('请选择所属员工');
      }
    }
  }
  handleModalHide() {
    this.staffTree.clearHistory()
  }
  handleModalShown() {
    this.staffTree.setActiveNodes([this.activeStaff.id])
  }
}
