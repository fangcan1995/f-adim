import {Component, ViewChild, OnInit} from "@angular/core";
import {BaseDynamicComponent} from "../../theme/directives/dynamicComponent/dynamic-component.directive";
import {SeerTree} from "../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {TreeNode} from "../../theme/modules/seer-tree/models/tree-node.model";
import {jsonTree} from "../../theme/utils/json-tree";
import {TREE_PERMISSIONS} from "../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../theme/modules/seer-tree/constants/events";
import {SeerTreeNode} from "../../theme/modules/seer-tree/seer-tree/SeerTreeNode";
@Component({
  selector: 'seer-tree-demo',
  templateUrl: './seer-tree-demo.component.html',
})
export class SeerTreeDemoComponent extends BaseDynamicComponent implements OnInit{
  ngOnInit(): void {
    this.nodes = jsonTree(this.rows);
    for(let p in TREE_PERMISSIONS){
      this.permissionsOptions.push({value:TREE_PERMISSIONS[p], text: p})
    }
    console.log(this.permissionsOptions)
  }
  @ViewChild(SeerTree) seerTree: SeerTree;

  nodes = [];

  permissionsOptions = [];

  //默认权限
  permissionsResult = 0;

  permissionsSelected = [];



  onChange(){
    this.permissionsResult = 0;
    console.log(this.permissionsSelected);
    this.permissionsSelected.map(p=>this.permissionsResult |= +p);
    this.seerTree.updatePermission(this.permissionsResult);
  }

  rows = [
    {id:'1',name:'root1',customIcon:'fa fa-sitemap'},
    {id:'2',name:'root2'},
    {id:'3',name:'child 1.1',parentId:'1',customIcon:'ion-person'},
    {id:'4',name:'child 1.2',parentId:'1'},
    {id:'notAllow2Drag',name:'禁止拖拽的节点',parentId:'1',forbidDrag:true},
    {id:'5',name:'child 2.1',parentId:'2',selected:true},
    {id:'6',name:'child 2.2',parentId:'2'},
    {id:'7',name:'不能切换类型的节点',parentId:'4',forbidChangeType:true},
    {id:'8',name:'child 1.2.1.1',parentId:'7',customIcon:'ion-card'},
    {id:'9',name:'2.1.1',parentId:'5'},
    {id:'10',name:'async root',hasChildren:true},
  ];

  allowDrop(element,to){
    if (element.data.forbidDrag){
      return false;
    }
    return true;
  }

  title = '例子-树';

  getOperationRecords(){
      let data = this.seerTree.exportOperationRecords();
      console.log(JSON.stringify(data))
  }

  getSelectedNodes(){
    let data = this.seerTree.getSelectedNodes(false);//这里注意一下：参数默认为true，如果为false，不会排除掉文件夹节点
    console.log(data);
  }
  /**
   * 用于动态加载子节点
   * @param node
   * @returns {Promise}
   */
  private getChildren(node: TreeNode) {
    node.lazyLoadChildren([{id:'parent: '+node.id,name:'懒啊',hasChildren:true}])
  }

  onNotify($event){
    console.log($event);
    if ($event.eventName==TREE_EVENTS.onLazyLoadChildren){
      setTimeout(()=>this.getChildren($event.node),1000);
    }
  }
}
