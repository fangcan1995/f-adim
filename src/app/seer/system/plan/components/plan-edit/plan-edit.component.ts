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
import { UserService } from '../../plan.service';
import { SeerDialogService, SeerMessageService, ManageService } from '../../../../../theme/services';

import { json2Tree } from '../../../../../theme/libs';
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { TREE_PERMISSIONS } from "../../../../../theme/modules/seer-tree/constants/permissions";

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { GlobalState } from '../../../../../global.state';
@Component({
    templateUrl: './plan-edit.component.html',
    styleUrls: ['./plan-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {
    user: any = {};
    roles: any = [];
    activeStaff: any = {
        originId: '',
        name: '',
    };
    editType: string = 'add';
    forbidSaveBtn: boolean = true;
    forbidResetPasswordBtn: boolean = true;
    id: string;
    isDepartmentDropdownOpen: boolean = false;
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
        private _manageService: ManageService,
        private _state: GlobalState,
    ) { }
    ngOnInit() {
        this.editType = this._route.snapshot.url[0].path;
        this.id = this._route.snapshot.params.id;
        if (this.editType === 'edit') {
            this._userService.getOne(this.id)
                .then(res => {
                    this.user = res.data || {};
                    console.log(this.user);
                    return this.getRoles()
                })
                .then(res => {
                    this.forbidSaveBtn = false;
                    this.forbidResetPasswordBtn = false;
                })
                .catch(err => {
                    this.showError(err.msg || '获取用户信息失败')
                });
        } else if (this.editType === 'add') {
            Promise.all([this.getRoles(), this.getUsersWithStaffsWithOrgs()])
                .then(res => {
                    this.forbidSaveBtn = false;
                })
                .catch(err => {
                    this.showError(err.msg || '获取用户信息失败')
                })
        }
    }
    handleSaveBtnClick() {
        if (this.myForm.form.valid) {
            this.forbidSaveBtn = true;
            let roleIds = _(this.roles).filter(t => t.checked).map(t => t['roleId']).value()
            if (this.editType === 'edit') {
                let params = {
                    userId: this.user.userId,
                    emCode: this.user.emCode,
                    roleIds,
                }
                this._userService.putOne('', params)
                    .then(res => {


                        // 如果编辑的用户正好是自己，那么刷新本地信息
                        let userInLocal = this._manageService.getUserFromLocal() || {};

                        if (userInLocal.userId == this.user.userId) {
                            this._manageService.refreshLocalDataAndNotify()
                        }

                        this.showSuccess(res.msg || '更新成功')
                            .onClose()
                            .subscribe(() => {
                                this.forbidSaveBtn = false;
                                this._router.navigate(['/system/user']);
                            });
                    })
                    .catch(err => {
                        this.forbidSaveBtn = false;
                        this.showError(err.msg || '更新失败')
                    });
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
                            .onClose()
                            .subscribe(() => {
                                this.forbidSaveBtn = false;
                                this._router.navigate(['/system/user']);
                            });
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
        this.forbidResetPasswordBtn = true;
        this._userService.resetPassword({
            userId: this.user.userId,
            type: 0,
        })
            .then(res => {
                this.forbidResetPasswordBtn = false;
                this.showSuccess(res.msg || '重置密码成功')
            })
            .catch(err => {
                this.forbidResetPasswordBtn = false;
                this.showError(err.msg || '重置密码失败')
            })
    }
    getRoles() {
        return this._userService.getRoles()
            .then(res => {
                let data = res.data || {};
                this.roles = data.list || [];
                let activeRoles = this.user.roles || [];
                console.log(this.user.roles)
                activeRoles.forEach((t, i) => {
                    this.roles.forEach((rt, ri) => {
                        if (rt.roleId == t.roleId) {
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
                    t = _.set(t, 'parentId', t['pid'] ? `D__${t['pid']}` : '0');
                    t = _.set(t, 'customIcon', 'ion-ios-people');
                    return t;
                }).value();
                staffs = _(staffs).map(t => {
                    t = _.set(t, 'originId', t['id']);
                    t = _.set(t, 'type', 'S');
                    t = _.set(t, 'id', `S__${t['id']}`);
                    t = _.set(t, 'originPid', t['pid'] || '0');
                    t = _.set(t, 'parentId', t['pid'] ? `D__${t['pid']}` : '0');
                    t = _.set(t, 'customIcon', 'ion-person');
                    return t;
                }).value();

                this.staffTreeNodes = json2Tree(departments.concat(staffs));
                setTimeout(() => {
                    this.staffTree.setActiveNodes([this.activeStaff.id]);
                })
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
    onNotice({ eventName, node }) {
        console.log(eventName)
        if (eventName == 'onActivate') {
            if (node.data.type == 'S') {
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

    }
}
