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
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'BrandTreeComponent',
  templateUrl: './brand-tree.component.html',
  styleUrls: ['./brand-tree.component.scss'],
  providers: [Ng2Uploader],
})
export class BrandTreeComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private _targetManageService? :TargetManageService, private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {
    this.init(this.modal);
    if(this.data.treeType == 'add'){
      this.brandIds = this.data.brandTreeDataList;
    }else{
      if(this.data.brandTreeDataList.length == 0 && this.changeType!='change'){
        this.brandIds = this.data.target.brandId;
      }else{
        this.brandIds = this.data.brandTreeDataList;
      }
    }
    this.getBrandTreeData();
  }
  brandData = [];
  datas = [];
  treeData = [];
  brandIds = [];
  node: TreeNode;
  lazyChildren = [];
  organizations = [];
  permissionsResult = TREE_PERMISSIONS.MULTI_SELECT|TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];
  selectedPermissions = TREE_PERMISSIONS.MULTI_SELECT|TREE_PERMISSIONS.NOTIFY;
  changeType;

  title = '品牌选择列表';

  onChange(){
    this.permissionsResult = 0;
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getSuppliers(): void {
    this.changeType = 'change';
    this.datas = this.seerTree.getSelectedNodes(true);//true为不选择父节点\
    this.datas.forEach(v =>{
      if(v.data) {
        if (v.data && v.data.type == "new") {//只选二级树 二级树type为new 一级为parent
          this.brandData.push(v.data.id);
        }
      }
    });
    this.gs.notifyDataChanged('getSuppliers',this.brandData);
    this.seerTree.clearHistory();
    this.closeModal();
  }

  getBrandTreeData(){
    this._targetManageService.getBrandTreeData().subscribe((result:Json)=>{
      if (result.success){
        result.data.forEach(v =>{
          if(v.id){
            this.brandIds.forEach(b =>{
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
}


