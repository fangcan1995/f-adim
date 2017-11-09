import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {ModalComponent} from "../../../../../theme/components/ng2-bs4-modal/modal";
import {SeerTree} from "../../../../..//theme/modules/seer-tree/seer-tree/seer-tree.component";
import {jsonTree} from "../../../../../theme/utils/json-tree";
import {TreeNode} from "../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TREE_PERMISSIONS} from "../../../../../theme/modules/seer-tree/constants/permissions";
import {BaseModalComponent} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GlobalState} from "../../../../../global.state";


@Component({
  selector: 'OrgListComponent',
  templateUrl: './org-list.Component.html',
  styleUrls: ['./org-list.component.scss'],
})
export class OrgListComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {

    this.init(this.modal);
  }
  orgData = [];
  data = [];
  node: TreeNode;
  organizations = [];
  permissionsResult = TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];

  title = '组织机构选择列表';

  onChange(){
    this.permissionsResult = 0;
    console.log(this.permissionsSelected);
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getOrgId(): void {
    this.orgData = this.seerTree.getSelectedNodes(false);
    this.node = this.orgData[0];
    if(this.node!=null){
      this.permissionsSelected = this.node.data;
    }else{
      this.permissionsSelected = null;
    }
    this.gs.notifyDataChanged('getOrgId',this.permissionsSelected);
    this.seerTree.clearHistory();
    this.closeModal();
  }

}


