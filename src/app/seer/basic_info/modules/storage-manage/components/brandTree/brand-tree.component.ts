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
    this.getBrandTreeData();
  }
  brandData = [];
  datas = [];
  treeData = [];
  relateId :string;
  node: TreeNode;
  lazyChildren = [];
  organizations = [];
  permissionsResult = TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];
  selectedPermissions = TREE_PERMISSIONS.NOTIFY;

  title = '品牌选择列表';

  onChange(){
    this.permissionsResult = 0;
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getBrand(): void {
    this.datas = this.seerTree.getSelectedNodes(true);//true为不选择父节点\
    this.datas.forEach(v =>{
      if(v.data) {
        if (v.data && v.data.type == "new") {//只选二级树 二级树type为new 一级为parent
          this.brandData.push(v.data);
        }
      }
    });

    this.gs.notifyDataChanged('storageGetBrand',this.brandData);
    this.seerTree.clearHistory();
    this.closeModal();
  }

  getBrandTreeData(){
    this._targetManageService.getBrandTreeData().subscribe((result:Json)=>{
      if (result.success){

        result.data.forEach(v =>{
          if(v.relatedStaffId){
            if(v.relatedStaffId == this.relateId){
              v['selected'] = true;
            }
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

        this.seerTree.setActiveNodes(this.data.brandId);

      }else {
        alert(result.message);
      }
    });
  }
}


