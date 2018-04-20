import {
    Component,
    ViewChild,
    OnInit
} from "@angular/core";
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { RoleService } from '../../role.service';
import { SeerDialogService, SeerMessageService, ManageService } from '../../../../../theme/services';
import { json2Tree } from '../../../../../theme/libs';
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { TREE_PERMISSIONS } from "../../../../../theme/modules/seer-tree/constants/permissions";
import { TreeNode } from "../../../../../theme/modules/seer-tree/models/tree-node.model";
import { GlobalState } from '../../../../../global.state';
@Component({
    templateUrl: './role-edit.component.html',
    styleUrls: ['./role-edit.component.scss'],
})
export class RoleEditComponent implements OnInit {
    role: any = {
        roleName: '',
        roleStatus: '0'
    };
    activeResources: any = [];
    activeAccounts: any = [];
    editType: string = 'add';
    forbidSaveBtn: boolean = true;
    forbidResetPasswordBtn: boolean = true;
    id: string;
    @ViewChild('myForm') myForm;
    @ViewChild('accountTree') accountTree: SeerTree;
    @ViewChild('resourceTree') resourceTree: SeerTree;
    resourceTreeNodes;
    resourcePermission = TREE_PERMISSIONS.MULTI_SELECT | TREE_PERMISSIONS.SELECT_PARENT_CASCADE | TREE_PERMISSIONS.NOTIFY;

    accountTreeNodes;
    accountPermission = TREE_PERMISSIONS.MULTI_SELECT | TREE_PERMISSIONS.SELECT_PARENT_CASCADE | TREE_PERMISSIONS.NOTIFY;
    constructor(
        private _roleService: RoleService,
        private _location: Location,
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: SeerMessageService,
        private _manageService: ManageService,
        private _state: GlobalState,
        private _dialogService: SeerDialogService
    ) { }
    ngOnInit() {
        this.editType = this._route.snapshot.url[0].path;
        this.id = this._route.snapshot.params.id;
        if (this.editType === 'edit') {
            this._roleService.getRoleOne(this.id)
                .then(res => {
                    console.log(res);
                    let data = res.data || {};
                    this.role = data.roleInfo || { roleName: '', roleStatus: '0' };
                    this.activeResources = data.resourceInfo || [];
                    this.activeAccounts = data.accountInfo || [];

                    return Promise.all([this.getResources(), this.getUsersWithStaffsWithOrgs()])
                })
                .then(res => {
                    this.forbidSaveBtn = false;
                })
                .catch(err => {
                    this.showError(err.msg || '获取角色信息失败')
                });
        } else if (this.editType === 'add') {
            Promise.all([this.getResources(), this.getUsersWithStaffsWithOrgs()])
                .then(res => {
                    console.log(res);
                    this.forbidSaveBtn = false;
                })
                .catch(err => {
                    this.showError(err.msg || '获取角色信息失败')
                });
        }
    }
    getUsersWithStaffsWithOrgs() {
        return this._roleService.getUsersWithStaffsWithOrgs()
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

                users = _(users).map(t => {
                    t = _.set(t, 'originId', t['id']);
                    t = _.set(t, 'type', 'U');
                    t = _.set(t, 'id', `U__${t['id']}`);
                    t = _.set(t, 'originPid', t['pid'] || '0');
                    t = _.set(t, 'parentId', t['pid'] ? `S__${t['pid']}` : '0');
                    t = _.set(t, 'customIcon', 'ion-card');
                    return t;
                }).value();



                let accounts = departments.concat(staffs, users);
                console.log(accounts);

                this.accountTreeNodes = json2Tree(accounts);
                console.log(this.accountTreeNodes);

                // 要等tree渲染完才能执行，只要异步就行
                setTimeout(() => {
                    this.accountTree.setActiveNodes(_.map(this.activeAccounts, t => 'U__' + t['userId']))
                })
            })

    }

    getResources() {
        return this._roleService.getResources({ pageSize: 10000 })
            .then(res => {
                let resources = res.data ? res.data.list || [] : [];
                this.resourceTreeNodes = json2Tree(
                    resources,
                    {
                        id: 'menuId',
                        parentId: 'menuPid'
                    },
                    [
                        {
                            origin: 'menuName',
                            replace: 'name'
                        },
                        {
                            origin: 'menuId',
                            replace: 'id'
                        }
                    ]
                );

                // 要等tree渲染完才能执行，只要异步就行
                setTimeout(() => {
                    this.resourceTree.setActiveNodes(_.map(this.activeResources, t => t['menuId']))
                })

            })
    }


    handleSaveBtnClick() {
        if (this.myForm.form.valid) {
            this.forbidSaveBtn = true;

            let accounts = this.accountTree.getSelectedNodes();
            let resources = this.resourceTree.getSelectedNodes();
            let accountIds = _.compact(_(accounts).filter((t: TreeNode) => t.data && t.data.type == 'U').map((t: TreeNode) => t.data ? t.data.originId : null).value());
            let resourceIds = [];
            let func = treeNode => {
                if (treeNode.isActive || treeNode.isAllChildrenActive) {
                    resourceIds.push(treeNode.data ? treeNode.data.id : null);
                }
                if (!treeNode.isRoot) {
                    func(treeNode.parent)
                }
            }
            resources.forEach((t: TreeNode, i) => {
                func(t)
            });
            resourceIds = _.uniq(resourceIds)

            accountIds = _.sortBy(accountIds)
            resourceIds = _.sortBy(resourceIds)
            let { roleName, roleStatus, roleId } = this.role;
            let params = {
                roleId,
                roleName,
                roleStatus,
                userIds: accountIds,
                resourceIds,
            }
            if (this.editType === 'edit') {
                this._roleService.putOne('', params)
                    .then(res => {
                        // 如果编辑的角色正好是用户所属的角色之一, 或者用户在角色要绑定到的角色列表中，那么刷新本地数据；
                        let rolesInLocal = this._manageService.getRolesFromLocal() || [];
                        let userInLocal = this._manageService.getUserFromLocal() || {};
                        if (_.find(rolesInLocal, t => t['roleId'] == this.role['roleId']) || _.includes(accountIds, userInLocal['userId'])) {
                            this._manageService.refreshLocalDataAndNotify();
                        }
                        this.showSuccess(res.msg || '更新成功')
                            .onClose()
                            .subscribe(() => {
                                this.forbidSaveBtn = false;
                                this._router.navigate(['/system/role']);
                            });
                    })
                    .catch(err => {
                        this.forbidSaveBtn = false;
                        this.showError(err.msg || '更新失败')
                    })
            } else {
                this._roleService.postOne(params)
                    .then(res => {
                        // 如果编辑的角色正好是用户所属的角色之一，那么刷新本地数据；
                        let rolesInLocal = this._manageService.getRolesFromLocal() || [];
                        let userInLocal = this._manageService.getUserFromLocal() || {};
                        if (_.find(rolesInLocal, t => t['roleId'] == this.role['roleId']) || _.includes(accountIds, userInLocal['userId'])) {
                            this._manageService.refreshLocalDataAndNotify();
                        }
                        this.showSuccess(res.msg || '保存成功')
                            .onClose()
                            .subscribe(() => {
                                this.forbidSaveBtn = false;
                                this._router.navigate(['/system/role']);
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