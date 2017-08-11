import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {TargetManageService} from "../../../target-manage/target-manage.service";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {SeerTree} from "../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {GlobalState} from "../../../../../../global.state";
import {Json} from "../../../../../login/Json";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {TreeNode} from "../../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../../../../../theme/modules/seer-tree/constants/events";

@Component({
  selector: 'salemanListComponent',
  templateUrl: './saleman-list.component.html',
  styleUrls: ['./saleman-list.component.scss'],
  providers: [TargetManageService],

})
export class SaleManListBComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private _targetManageService? :TargetManageService, private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {


    this._targetManageService.getOrganizations().subscribe((result:Json)=>{
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

    // this._targetManageService.getOrganizations().subscribe((result:Json)=>{
    //   if (result.success){
    //     this.organizations = jsonTree(result.data,{id:'id',parentId:'orgParentId'},[{origin:'orgName',replace:'name'},{origin:'id',replace:'id'}]);
    //   }else {
    //     alert(result.message);
    //   }
    // });
    this.init(this.modal);
  }
  orgData = [];
  data = [];
  node: TreeNode;
  organizations = [];
  lazyChildren = [];
  permissionsResult = TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];
  selectedPermissions = TREE_PERMISSIONS.NOTIFY;

  title = '选择销售人员';

  onChange(){
    this.permissionsResult = 0;
    console.log(this.permissionsSelected);
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getOrgId(): void {
    this.orgData = this.seerTree.getSelectedNodes(false);
    this.node = this.orgData[0];
    this.permissionsSelected = this.node.data;
    this.gs.notifyDataChanged('getOrgId',this.permissionsSelected);
    this.seerTree.clearHistory();
    this.closeModal();
  }


  onNotify($event){
     if($event.eventName == TREE_EVENTS.onLazyLoadChildren){
      this.lazyChildren = [];
      setTimeout(()=>this.getLazyChildren($event.node),1000);
    }
  }

  private getLazyChildren(node: TreeNode) {
    this._targetManageService.getStaffsByStaffOrgId(node.id).subscribe((result:Json)=>{
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


