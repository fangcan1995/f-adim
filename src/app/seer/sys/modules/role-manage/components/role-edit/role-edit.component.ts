import {Role} from "../../../../../model/auth/role";
import {
  Component, ViewEncapsulation, Input, OnInit, ViewChild
} from "@angular/core";
import {RoleManageService} from "../../role-manage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';
import {Result} from "../../../../../model/result.class";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {SeerTree} from "../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TREE_EVENTS} from "../../../../../../theme/modules/seer-tree/constants/events";
import {TreeNode} from "../../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";

@Component({
  selector: 'role-edit',
  templateUrl: './role-edit.component.html',
  providers: [RoleManageService],
  encapsulation: ViewEncapsulation.None
})
export class RoleEditComponent implements OnInit {
  @ViewChild('accountTree') accountTree: SeerTree;
  @ViewChild('resourceTree') resourceTree: SeerTree;
  role: Role = new Role();

  title = '新增角色';

  accountSetting = '绑定账号';
  resourceSetting = '绑定资源';
  currentSetting;
  resourcePermission = TREE_PERMISSIONS.MULTI_SELECT | TREE_PERMISSIONS.SHOW_FILTER | TREE_PERMISSIONS.SELECT_PARENT_CASCADE;
  accountPermission = TREE_PERMISSIONS.MULTI_SELECT | TREE_PERMISSIONS.SHOW_FILTER;

  accounts = [];
  resources = [];
  selectedUsers = [];

  allAccountsLoadComplete = false;
  selectedAccountsLoadComplete = false;
  resourcesLoadComplete = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: RoleManageService) {
  }

  /**
   * 初始化时根据是否有roleId来决定是否是编辑角色
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      //若有id，证明是编辑角色
      if (params['roleId']) {
        this.service.getRoleById(params['roleId']).then((result: Result) => {
          if (result.success) {
            this.role = result.data;
            this.title = '修改角色';
            //有角色才能初始化权限树
            this.setActivatedNodesOnResourceTree();
          } else {
            alert(result.message)
          }
        });
        this.getSysUsersByRoleId(params['roleId']);
      }
    });
    this.getResources();
    this.getSysUsersWithOrgs();
    this.setActivatedNodesOnAccountTree();
  }

  /**
   * 获取当前角色所有的所有账号
   * @param roleId
   */
  getSysUsersByRoleId(roleId: string) {
    this.service.getUsersByRoleId(roleId).then((result: Result) => {
      if (result.success) {
        this.selectedAccountsLoadComplete = true;
        result.data.map(user => {
          this.selectedUsers.push(user.userId)
        });
      } else {
        alert(result.message);
      }
    });
  }

  /**
   * 获取组织，员工，账号
   */
  getSysUsersWithOrgs() {
    this.service.getSysUsersWithOrgs().then((result: Result) => {
      if (result.success) {
        this.allAccountsLoadComplete = true;
        result.data.map(res => {
          if (res.customNodeType == 'org') {
            res['customIcon'] = 'fa fa-sitemap';
          }
          if (res.customNodeType == 'staff') {
            res['customIcon'] = 'ion-person';
          }
          if (res.customNodeType == 'account') {
            res['customIcon'] = 'ion-card';
          }
        });
        this.accounts = jsonTree(result.data);
      } else {
        alert(result.message);
      }
    });
  }

  getResources() {
    this.service.getResources().then((result: Result) => {
      if (result.success) {
        this.resourcesLoadComplete = true;
        result.data.map(res => {
          if (!res.resourceName) {
            res['resourceName'] = '系统资源';
          }
          //按钮
          if (res.resourceType == '00') {
            res['customIcon'] = 'ion-android-radio-button-off';
          }
          //菜单
          if (res.resourceType == '01') {
            res['customIcon'] = 'ion-ios-list-outline';
          }
        });
        this.resources = jsonTree(result.data, {
          id: 'resourceId',
          parentId: 'resourceParentId'
        }, [{origin: 'resourceName', replace: 'name'}, {origin: 'resourceId', replace: 'id'}]);
      } else {
        alert(result.message);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(canContinue: boolean = false): void {
    //获取账号
    let accountIds = [];
    this.accountTree.getSelectedNodes().map((node: TreeNode) => {
      accountIds.push(node.id);
    });
    this.selectedUsers = accountIds;
    //获取权限
    let resourceIds = [];
    let excludeFolders = false;
    this.resourceTree.getSelectedNodes(excludeFolders).map((node: TreeNode) => {
      let parentNode = node.realParent;
      while(parentNode){
        if(!parentNode.isActive){
          accountIds.push(node.realParent.id);
        }
        parentNode = parentNode.realParent;
      }
      resourceIds.push(node.id);
    });
    this.role.roleResources = resourceIds.sort((a, b) => a >= b ? 1 : -1);
    if (this.role.roleId) {
      this.service.updateRole({role: this.role, userIds: this.selectedUsers})
        .then((result: Result) => {
          if (result.success) {
            alert('保存成功');
            this.role = result.data;
            if (!canContinue) {
              this.goBack();
            }
          } else {
            alert(result.message);
          }
        })
    } else {
      this.service.createRole({role: this.role, userIds: this.selectedUsers}).then((result: Result) => {
        if (result.success) {
          alert('保存成功');
          this.role = result.data;
          if (!canContinue) {
            this.goBack();
          }
        } else {
          alert(result.message);
        }
      })
    }
  }

  /**
   * 获取当前选择的节点
   * @returns {any}
   */
  getSelectedNodes(): TreeNode[] {
    let data;
    if (this.currentSetting == this.accountSetting) {
      data = this.accountTree.getSelectedNodes(false);//这里注意一下：参数默认为true，如果为false，不会排除掉文件夹节点
    }
    if (this.currentSetting == this.resourceSetting) {
      data = this.resourceTree.getSelectedNodes(false);
    }
    return data;
  }

  /**
   * 设置账户树的默认选择项
   */
  setActivatedNodesOnAccountTree() {
    if (!this.accountTree || !this.allAccountsLoadComplete || !this.selectedAccountsLoadComplete) {
      setTimeout(() => this.setActivatedNodesOnAccountTree(), 100);
      return;
    }
    this.accountTree.setActiveNodes(this.selectedUsers);
  }

  /**
   * 设置资源树的默认选择项
   */
  setActivatedNodesOnResourceTree() {
    if (!this.resourceTree || !this.resourcesLoadComplete) {
      setTimeout(() => this.setActivatedNodesOnResourceTree(), 100);
      return;
    }
    this.resourceTree.setActiveNodes(this.role.roleResources);
  }
}
