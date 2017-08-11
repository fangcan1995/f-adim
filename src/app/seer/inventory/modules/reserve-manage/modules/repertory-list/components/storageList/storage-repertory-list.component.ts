import {Component, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import {Ng2Uploader} from "ng2-uploader";
import {ModalComponent} from "../../../../../../../../theme/components/ng2-bs4-modal/modal";
import {SeerTree} from "../../../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {Json} from "../../../../../../../login/Json";
import {BaseModalComponent} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {TREE_PERMISSIONS} from "../../../../../../../../theme/modules/seer-tree/constants/permissions";
import {TreeNode} from "../../../../../../../../theme/modules/seer-tree/models/tree-node.model";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {GlobalState} from "../../../../../../../../global.state";
import {RepertoryListTableService} from "../../repertory-list-table.service";


@Component({
  selector: 'StorageRepertoryListComponent',
  templateUrl: './storage-repertory-list.component.html',
  styleUrls: ['./storage-repertory-list.component.scss'],
  providers: [Ng2Uploader],

})
export class StorageRepertoryListComponent extends BaseModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(private repertoryCheckService? :RepertoryListTableService, private gs?:GlobalState){
    super();
  }
  ngOnInit(): void {
    this.repertoryCheckService.getAllStorages().subscribe((result:Json)=>{
      if (result.success){
        this.storage = jsonTree(result.data,{id:'id',parentId:'parentId'},[{origin:'storageName',replace:'name'},{origin:'id',replace:'id'}]);
      }else {
        alert(result.message);
      }
    });
    this.init(this.modal);
  }
  storageData = [];
  data = [];
  node: TreeNode;
  storage = [];
  permissionsResult = TREE_PERMISSIONS.NOTIFY;
  permissionsSelected = [];

  title = '库房选择列表';

  onChange(){
    this.permissionsResult = 0;
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  getStorageId(): void {
    this.storageData = this.seerTree.getSelectedNodes(false);
    this.node = this.storageData[0];
    if(this.node!=null){
      this.permissionsSelected = this.node.data;
    }else{
      this.permissionsSelected = null;
    }
    this.gs.notifyDataChanged('getStorageById',this.permissionsSelected);
    this.seerTree.clearHistory();
    this.closeModal();
  }

}


