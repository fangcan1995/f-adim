import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {Ng2Uploader} from "ng2-uploader";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {SeerTree} from "../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TargetManageService} from "../../../target-manage/target-manage.service";
import {Json} from "../../../../../login/Json";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {TreeNode} from "../../../../../../theme/modules/seer-tree/models/tree-node.model";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";
import {BaseModalComponent} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {GlobalState} from "../../../../../../global.state";
import {TREE_EVENTS} from "../../../../../../theme/modules/seer-tree/constants/events";


@Component({
  selector: 'CustomerStoreTreeComponent',
  templateUrl: './customer-store-tree.component.html',
  styleUrls: ['./customer-store-tree.component.scss'],
  providers: [Ng2Uploader],

})
export class CustomerStoreTreeComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private _targetManageService? :TargetManageService, private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {
    // this._targetManageService.getCustomers().subscribe((result:Json)=>{
    //   if (result.success){
    //     result.data.forEach(v =>{
    //       if(!v.children){
    //         v['hasChildren'] = true;
    //       }
    //     });
    //     this.organizations = jsonTree(result.data,{},[{origin:'customerName',replace:'name'},{origin:'id',replace:'id'}]);
    //   }else {
    //     alert(result.message);
    //   }
    // });
    this.init(this.modal);
    if(this.data.treeType == 'add'){
      this.customerStoreIds = this.data.storeTreeDataList;
    }else{
      if(this.data.storeTreeDataList.length == 0  && this.changeType!='change') {
        this.customerStoreIds = this.data.target.customerStoreId;
      }else {
        this.customerStoreIds = this.data.storeTreeDataList;
      }
    }
    this.getStoreTreeData();
  }
  storeData = [];
  datas = [];
  treeData = [];
  customerStoreIds = [];
  relateId :string;
  node: TreeNode;
  lazyChildren = [];
  organizations = [];
  permissionsResult = TREE_PERMISSIONS.MULTI_SELECT|TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];
  selectedPermissions = TREE_PERMISSIONS.MULTI_SELECT|TREE_PERMISSIONS.NOTIFY;
  changeType;

  title = '门店选择列表';

  onChange(){
    this.permissionsResult = 0;
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getStores(): void {
    this.changeType = 'change';
    this.datas = this.seerTree.getSelectedNodes(true);
    this.datas.forEach(v =>{
      if(v.data){
        if(v.data&&v.data.type == "new") {
          this.storeData.push(v.data.id);
        }
      }
    });
    this.gs.notifyDataChanged('getStores',this.storeData);
    this.seerTree.clearHistory();
    this.closeModal();
  }

  getStoreTreeData(){
    this._targetManageService.getStoreTreeData().subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          if(v.id){
            this.customerStoreIds.forEach(b =>{
                if(v.id == b){
                  v['selected'] = true;
                }
              }
            );
          }
        });
        this.treeData = jsonTree(result.data);
        this.treeData.forEach(v =>{
          if(v.type=="parent" && !v.children){

          }else{
            if(v.children){
              let a = 0;
              v.children.forEach(c =>{
                if(c.selected==true){
                  a = a+1;
                }
              });
              if(v.children.length == a){
                v['selected'] = true;
              }
            }
            this.organizations.push(v)
          }
        });
        // this.organizations = jsonTree(result.data);
        this.seerTree.reload(this.organizations);
      }else {
        alert(result.message);
      }
    });
  }
  //
  // onNotify($event){
  //   if($event.eventName == TREE_EVENTS.onActivate){
  //     if($event.node.hasChildren == true){
  //       $event.node.children = [];
  //     }
  //     //这里会自动触发TREE_EVENTS.onLazyLoadChildren时间
  //     $event.node.setIsExpanded(true);
  //     this.lazyChildren = [];
  //     setTimeout(()=>this.getLazyChildrenSelected($event.node),1000);
  //   }
  // }
  //
  // private getLazyChildrenSelected(node: TreeNode) {
  //   this._targetManageService.getStoresByCustomerId(node.id).subscribe((result:Json)=>{
  //     if (result.success){
  //       result.data.forEach(v =>{
  //         v['name'] = v.storeName;
  //         v['selected'] = true;
  //         this.lazyChildren.push(v);
  //       });
  //       node.lazyLoadChildren(this.lazyChildren);
  //       console.log(this.lazyChildren)
  //     }else {
  //       alert(result.message);
  //     }
  //   });
  // }

}


