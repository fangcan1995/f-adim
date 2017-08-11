import {Component, ViewChild, OnDestroy} from '@angular/core';
import {StorageManageService} from "../../storage-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../global.state";
import {SeerTree} from "../../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TREE_PERMISSIONS} from "../../../../../../theme/modules/seer-tree/constants/permissions";
import {jsonTree} from "../../../../../../theme/utils/json-tree";
import {TREE_EVENTS} from "../../../../../../theme/modules/seer-tree/constants/events";
import {DynamicComponentLoader} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {EditStorageComponent} from "../edit/edit-storage.component";
/*import Any = jasmine.Any;*/



@Component({
  selector: 'storage-list',
  templateUrl: './storage-list.component.html',
  providers: [],

})
export class StorageListComponent implements OnDestroy{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  @ViewChild(SeerTree) seerTree: SeerTree;

  //组织树
  treeTitle = "库房列表";
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.SHOW_FILTER;
  treeNode = [];

  title = '';

  source = [];

  titles = [
    {key:'storageName', label:'库房名称',},
    {key:'brandName', label:'商品品牌'},
    {key:'storageType', label:'库房类型', isDict:true, dictKeyId:'STORAGE_TYPE'},
    {key:'storageState', label:'库房状态', isDict:true, dictKeyId:'STORAGE_STATE'},
  ];

  titleOption = [
    {key:'storageName', label:'库房名称',},
    {key:'brandName', label:'商品品牌'},
    {key:'storageType', label:'库房类型', isDict:true, dictKeyId:'STORAGE_TYPE'},
    {key:'storageState', label:'库房状态', isDict:true, dictKeyId:'STORAGE_STATE'},
  ];

  constructor(protected service: StorageManageService, private router: Router, private _state: GlobalState) {
    this._state.subscribe("editStorageState",(a)=>{
      this.getStorages();
      let selectedNode = this.seerTree.getSelectedNodes(false)[0];
      this.seerTree.setActiveNodes(selectedNode.id);
      this.getStoragesByParentId(selectedNode.data.id);
    })
  }

  ngOnInit() {
    this.getStorages();
  }

  ngOnDestroy(): void {
    this._state.unsubscribe("editStorageState");
  }

  getStorages() {
    this.service.getStorages().then((result) => {
      let nodes = jsonTree(result.data,{parentId:'parentId',children:'children'},[{origin:'storageName',replace:'name'}]);
      //nodes.map(rootNode=>rootNode['expanded']=true);
      this.treeNode = nodes;
    });
  }

  onChange(message):void {

    let selectedNode = this.seerTree.getSelectedNodes(false)[0];

    if(message.type=='add' && selectedNode!=null){
      this.dynamicComponentLoader.loadComponent(EditStorageComponent, {parentId:selectedNode.data.id,parentName:selectedNode.data.name});
    }
    else if(message.type=='update'){
      this.dynamicComponentLoader.loadComponent(EditStorageComponent, {parentId:selectedNode.data.id,parentName:selectedNode.data.name,currentId:message.data.id});
    }
    else if(message.type=='delete'){
      this.service.removeStorage(message.data.id).then((result) => {
        if (result.success ){
          this.getStorages();
          let selectedNode = this.seerTree.getSelectedNodes(false)[0];
          this.getStoragesByParentId(selectedNode.data.id);
        }else {
          alert("删除失败");
          this.getStorages();
        }
      });
    }
  }

  onNotify($event):void {

    /* 根据库房id查询所属库房*/
    if ($event.eventName==TREE_EVENTS.onActivate){
      this.getStoragesByParentId($event.node.id);
    }

  }

  getStoragesByParentId(storageId):void {
    this.service.getStoragesByParentId(storageId).then((result) => {
      if (result.success ){
        this.source = result.data;
      }else {
        alert("查询失败");
      }
    });
  }

}

