import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {Ng2Uploader} from "ng2-uploader";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {SeerTree} from "../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {Json} from "../../../../../login/Json";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {TreeNode} from "../../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GlobalState} from "../../../../../../global.state";
import {ActingmatPlanService} from "../../actingmat-plan.service";
import {TREE_EVENTS} from "../../../../../../theme/modules/seer-tree/constants/events";


@Component({
  selector: 'StaffListComponent',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
  providers: [Ng2Uploader],
})
export class StaffListComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private actingmatPlanService? :ActingmatPlanService, private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {
    this.actingmatPlanService.getStaffs().subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          if(!v.children){
            v['hasChildren'] = true;
          }
        });
        this.organizations = jsonTree(result.data,{id:'id',parentId:'orgParentId'},[{origin:'orgName',replace:'name'},{origin:'id',replace:'id'}]);
      }else {
        alert(result.message);
      }
    });
  }
  orgData = [];
  data = [];
  node: TreeNode;
  organizations = [];
  permissionsResult = TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];
  selectedPermissions = TREE_PERMISSIONS.NOTIFY;
  lazyChildren = [];
  title = '人员选择列表';
  errorMessage;

  onChange(){
    this.permissionsResult = 0;
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getOrgId(): void {
    this.orgData = this.seerTree.getSelectedNodes(false);
    this.node = this.orgData[0];
    if(this.node.data.staffName){
      if(this.node!=null){
        this.permissionsSelected = this.node.data;
      }else{
        this.permissionsSelected = null;
      }
      this.gs.notifyDataChanged('getBudgetStaff',this.permissionsSelected);
      this.errorMessage = '';
      this.seerTree.clearHistory();
      this.closeModal();
    }else{
      this.errorMessage = '*你选择的是组织机构，请选择组织下的人员！';
    }
  }

  onNotify($event){
    if($event.eventName == TREE_EVENTS.onLazyLoadChildren){
      this.lazyChildren = [];
      this.getLazyChildren($event.node);
    }
  }

  private getLazyChildren(node: TreeNode) {
    this.actingmatPlanService.getStaffsByStaffOrgId(node.id).subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          v['name'] = v.staffName;
          this.lazyChildren.push(v);
        });
        node.lazyLoadChildren(this.lazyChildren);
      }else {
        alert(result.message);
      }
    });
  }

}


