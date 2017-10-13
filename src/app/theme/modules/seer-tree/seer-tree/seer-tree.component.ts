import {Component, Input, ViewChild, OnInit, EventEmitter, Output} from "@angular/core";
import {SeerTreeNode} from "./SeerTreeNode";
import {JsonTreeOperationRecords} from "./tree-operation-records";
import {TreeComponent} from "../components/tree.component";
import {TREE_ACTIONS} from "../models/tree-options.model";
import {KEYS} from "../constants/keys";
import {TREE_EVENTS} from "../constants/events";
import {TreeNode} from "../models/tree-node.model";
import {TREE_PERMISSIONS} from "../constants/permissions";
import * as _ from 'lodash';

/**
 * 方向键聚焦/展开/折叠
 * 空格键多选
 * 回车键单选
 * 按住shift/ctrl键点鼠标都可以多选
 */
@Component({
  selector: 'seer-tree',
  styleUrls: ['../seer-tree.scss'],
  template: `
  <span style="display:flex;">
    <input *ngIf="checkPermissions(treePermissions.SHOW_FILTER)" #filter class="filter form-control" (keyup)="filterNodes(filter.value, tree)" placeholder="{{filterText}}"/>
    <button *ngIf="checkPermissions(treePermissions.SHOW_ADD_ROOT,treePermissions.MULTI_ROOT)" (click)="addRootNode($event)" class="top-button"><i class="ion-android-add" style="margin-left:-1px"></i></button>
  </span>
  <angular2-tree
    #tree
    [nodes]="nodes"
    [focused]="true"
    [options]="seerTreeOptions"
    (onEvent)="onEvent($event)"
  >
  <template #treeNodeTemplate let-node>
    <div>
      <i *ngIf="!node.isLeaf && checkPermissions(treePermissions.MULTI_SELECT)" (dblclick)="stopPropagation($event)" (click)="onToggleChildren($event,node)" class="virtual-checkbox" [class.ion-android-checkbox-outline-blank]="!node.isActive" [class.ion-android-checkbox-outline]="node.isActive && !node.isAllChildrenActive" [class.ion-android-checkbox]="node.isActive && node.isAllChildrenActive"></i>
      <i *ngIf="node.isLeaf && checkPermissions(treePermissions.MULTI_SELECT)" (dblclick)="stopPropagation($event)" (click)="onToggleLeaf($event,node)" class="virtual-checkbox" [class.ion-android-checkbox-outline-blank]="!node.isActive" [class.ion-android-checkbox-outline]="node.isActive"></i>
      <span *ngIf="!node.isInEditing" title="{{node.data.name}}"><i class="virtual-checkbox icon-padding" [class.ion-android-folder-open]="node.canExpand && !node.customIconField" [class.ion-document]="!node.canExpand && !node.customIconField" [ngClass]="node.customIconField"></i>{{ node.data.name }}</span>
      <input *ngIf="node.isInEditing" [(ngModel)]="node.data.name" (click)="stopPropagation($event)" (dblclick)="stopPropagation($event)" />
      <span>
        
        <button *ngIf="node.isInEditing && !node.hasChildren && !node.forbidChangeTypeField" (click)="changeType($event, node)" class="options-button"><i [class]="node.canExpand ? 'ion-android-folder-open':'ion-document'" [style.margin-left]="node.canExpand ? '-3px':'-1px'"></i></button>
        <button *ngIf="node.isInEditing" (click)="saveEditing($event, node)" class="options-button"><i class="ion-checkmark-round" style="margin-left:-3px"></i></button>
        <button *ngIf="node.isInEditing" (click)="cancelEditing($event, node)" class="options-button"><i class="ion-close-round" style="margin-left:-2px"></i></button>
      </span>
      <span *ngIf="childrenCount(node)" class="children-count">{{ childrenCount(node) }}</span>
    </div>
    <div class="tree-node-actions">
      <span>···</span>
      <div class="tree-node-action-list">
        <button *ngIf="!node.isInEditing && node.children && checkPermissions(treePermissions.ADD)" (click)="addNode($event, node)" class="options-button"><i class="ion-android-add" style="margin-left:-1px"></i></button>
        <button *ngIf="!node.isInEditing && checkPermissions(treePermissions.EDIT)" (click)="edit($event, node)" class="options-button"><i class="ion-edit" style="margin-left:-3px"></i></button>
        <button *ngIf="!node.isInEditing && checkPermissions(treePermissions.DELETE)" (click)="deleteNode($event, node)" class="options-button"><i class="ion-android-delete" style="margin-left:-1px"></i></button>
      </div>
      
    </div>
    
    
  </template>
  <template #loadingTemplate>{{loadingText}}</template>
  </angular2-tree>
  `
})
export class SeerTree implements OnInit {
  @Input() private permissions: number = 0;
  @Input() private nodes: SeerTreeNode[] = [];
  @Input() private defaultNodeName = '新节点';
  @Input() private newNodeData = {};
  @Input() private loadingText = '加载中...';
  @Input() private filterText = '筛选节点';
  @Output() private notify: EventEmitter<any> = new EventEmitter<any>();
  @Input() private customAllowDrop:{(element, to):boolean};

  private onEditing = false;
  private cachedNodeName: string;
  private operationRecords: JsonTreeOperationRecords = new JsonTreeOperationRecords();

  @ViewChild('tree') private tree: TreeComponent;
  private treePermissions = TREE_PERMISSIONS;

  private currentHoveringNode;
  private lastHoveringNode;

  //操作配置,这个要在options上面
  private actionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => {
        // if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      },
      click: (tree, node, $event) => {
        ($event.ctrlKey || $event.shiftKey) && this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)
          ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        if(this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE,TREE_PERMISSIONS.MULTI_SELECT)){
          this.checkParentsCascade(node);
        }
      },
    },
    keys: {
      [KEYS.SPACE]: (tree, node, $event) => {
        if (node.isLeaf) {
          this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)
            ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
            : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        } else {
          this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)
            ? this.onToggleChildren($event, node)
            : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
      },
    }
  };
  //树的配置
  private seerTreeOptions = {
    // levelPadding: 33,
    isExpandedField: 'expanded',
    isSelectedField: 'selected',
    customIconField: 'customIcon',
    forbidChangeTypeField: 'forbidChangeType',
    idField: 'id',
    actionMapping: this.actionMapping,
    allowDrag: true,
    allowDrop: (element, to, otherAllowDropFunction:{(element, to):boolean}=this.customAllowDrop) => {
      if(!element || !to){
        return false;
      }
      //若正在编辑中，禁止拖动
      if (this.onEditing) {
        return false;
      }
      //用于拖动时延迟展开子节点
      this.currentHoveringNode = to.parent.id;
      setTimeout(() => this.lastHoveringNode = to.parent.id, 700);
      if (to.parent && (to.parent.hasChildren || to.parent.children) && !to.parent.isExpanded && this.lastHoveringNode == this.currentHoveringNode) {
        to.parent.setIsExpanded(true);
      }
      //是否允许将节点移动到root，如果节点本身就是root节点则允许，否则这里需要判断是否允许多root
      if(to.parent.data.virtual && element.realParent && !this.checkPermissions(TREE_PERMISSIONS.MULTI_ROOT)) {
        return false;
      }

      //禁止拖动多个
      if (this.tree.treeModel.activeNodes.length > 1) {
        return false;
      }
      //动态节点尚未加载
      if (to.parent.hasChildren && !to.parent.children && !to.parent.isExpanded) {
        to.parent.setIsExpanded(true);
        return false;
      }
      if(otherAllowDropFunction && !otherAllowDropFunction(element,to)){
        return false;
      }
      //目标可以有子节点才允许拖拽至此
      return to.parent.children;
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    this.updatePermission(this.permissions);
  }

  public updatePermission(permissions=0){
    this.permissions = permissions;
    this.seerTreeOptions.allowDrag = this.checkPermissions(TREE_PERMISSIONS.DRAG);
  }

  private stopPropagation($event) {
    $event.stopPropagation();
  }

  /**
   * 添加一个根节点
   * @param $event
   * @param node
   */
  private addRootNode($event) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }
    let newNodeData = {
      isNew: true,
      name: this.defaultNodeName,
    };
    for(let attr in this.newNodeData){
      newNodeData[attr] = this.newNodeData[attr];
    }
    this.tree.treeModel.virtualRoot.addNewNode(newNodeData);
    this.editNew(this.tree.treeModel.virtualRoot.children[this.tree.treeModel.virtualRoot.children.length - 1])
  }

  /**
   * 添加子叶节点
   * @param $event
   * @param node
   */
  private addNode($event, node) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }
    if (!node.isExpanded) {
      node.toggleExpanded();
    }
    let newNodeData = {
      isNew: true,
      name: this.defaultNodeName,
    };
    for(let attr in this.newNodeData){
      newNodeData[attr] = this.newNodeData[attr];
    }
    node.addNewNode(newNodeData);
    this.editNew(node.children[node.children.length - 1])
  }

  /**
   * 编辑已有节点
   * @param $event
   * @param node
   */
  private edit($event, node) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }

    this.cachedNodeName = node.data.name;
    node.isInEditing = true;
    this.onEditing = true;
    this.seerTreeOptions.allowDrag = false;
  }

  /**
   * 编辑新节点
   * @param $event
   * @param node
   */
  private editNew(node) {
    this.cachedNodeName = undefined;
    node.isInEditing = true;
    this.onEditing = true;
    this.seerTreeOptions.allowDrag = false;
  }

  /**
   * 保存修改
   * @param $event
   * @param node
   */
  private saveEditing($event, node) {
    $event.stopPropagation();
    node.isInEditing = false;
    this.onEditing = false;
    this.seerTreeOptions.allowDrag = true;
    if(node.data.name !== this.cachedNodeName){
      this.tree.treeModel.fireEvent({
        eventName: (node.data.isNew) ? TREE_EVENTS.onAddNewNode : TREE_EVENTS.onRenameNode,
        node
      });
    }
    this.cachedNodeName = undefined;
  }

  /**
   * 取消修改
   * @param $event
   * @param node
   */
  private cancelEditing($event, node) {
    $event.stopPropagation();
    if (!this.cachedNodeName) {
      _.remove(node.parent.children, node);
    } else {
      node.data.name = this.cachedNodeName;
    }
    node.isInEditing = false;
    this.onEditing = false;
    this.seerTreeOptions.allowDrag = true;
  }

  private changeType($event, node: TreeNode) {
    $event.stopPropagation();
    if (node.children && node.children.length > 0) {
      alert('还有子节点未删除');
    }
    if (node.children) {
      delete node.children;
    } else {
      node.children = [];
    }
  }

  /**
   * 删除某节点
   * @param $event
   * @param node
   */
  private deleteNode($event, node: TreeNode) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }
    if (!node.realParent && confirm('确认删除根节点以及其全部子节点吗？')) {
      _.remove(this.tree.treeModel.roots, node);
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onDeleteNode, node});
      return;
    }
    if (node.realParent && (node.canExpand) && confirm('确认删除此节点以及其全部子节点吗？')) {
      _.remove(node.realParent.children, node);
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onDeleteNode, node});
      return;
    }
    if (node.realParent && !node.canExpand && confirm('确认删除此节点吗？')) {
      _.remove(node.realParent.children, node);
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onDeleteNode, node});
      return;
    }
  }

  /**
   * 获得某节点的直接子节点数量
   * @param node
   * @returns {string}
   */
  private childrenCount(node: TreeNode): string {
    if(node && node.children){
      if(this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)){
        let activatedChildrenCount = 0;
        node.children.map(n=>{
          if(n.isActive){
            activatedChildrenCount++;
          }
        });
        return `(${activatedChildrenCount}/${node.children.length})`;
      }else {
        return `(${node.children.length})`;
      }
    }
    return '';
  }

  /**
   * 过滤节点
   * @param text
   * @param tree
   */
  private filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
  }

  public filter(text:string, autoShow=true){
    this.tree.treeModel.filterNodes(text, autoShow);
  }

  private onEvent($event) {
    switch ($event.eventName) {
      case TREE_EVENTS.onAddNewNode:
      case TREE_EVENTS.onRenameNode:
      case TREE_EVENTS.onDeleteNode:
      case TREE_EVENTS.onMoveNode:
        this.operationRecords.record($event);
        break;
    }
    if(this.checkPermissions(TREE_PERMISSIONS.NOTIFY)) {
      this.notify.emit($event);
    }
  }

  private onToggleLeaf($event, node) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }
    if(this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE,TREE_PERMISSIONS.MULTI_SELECT)){
      this.checkParentsCascade(node);
    }
    if (!node.isActive) {
      this.setNodeCheckedMultiIgnoreAlreadyChecked(node);
    } else {
      this.setNodeMultiUnchecked(node);
    }
  }

  private onToggleChildren($event, node) {
    $event.stopPropagation();
    if (this.onEditing) {
      alert('请先处理当前节点');
      return;
    }
    if(this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE,TREE_PERMISSIONS.MULTI_SELECT)){
      this.checkParentsCascade(node);
    }
    if (node.isAllChildrenActive) {
      this.setChildrenNodesAllUnchecked(node)
    } else {
      this.setChildrenNodesAllChecked(node);
    }
  }

  private checkParentsCascade(node){
    if(node.realParent){
      if(!node.realParent.isActive){
        node.realParent.toggleActivated(true);
      }
      this.checkParentsCascade(node.realParent);
    }
  }

  private setChildrenNodesAllChecked(node) {
    this.setNodeCheckedMultiIgnoreAlreadyChecked(node);
    if (node.children && node.children.length > 0) {
      if (!node.isExpanded) {
        node.toggleExpanded();
      }
      node.children.map((node) => {
        this.setChildrenNodesAllChecked(node);
      })
    }
  }

  private setChildrenNodesAllUnchecked(node) {
    this.setNodeMultiUnchecked(node);
    if (node.children && node.children.length > 0) {
      if (!node.isExpanded) {
        node.toggleExpanded();
      }
      node.children.map((node) => {
        this.setChildrenNodesAllUnchecked(node);
      })
    }
  }

  /**
   * 用于点击树节点，知道选择其子节点
   * @param node
   */
  private setNodeCheckedMultiIgnoreAlreadyChecked(node) {
    this.tree.treeModel.activeNodeIds[node.id] = true;
    if (!_.includes(this.tree.treeModel.activeNodes, node)) {
      this.tree.treeModel.activeNodes.push(node);
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onActivate, node});
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onFocus, node});
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onActiveChanged, node});
    }
  }

  private setNodeMultiUnchecked(node) {
    this.tree.treeModel.activeNodeIds[node.id] = false;
    if (_.includes(this.tree.treeModel.activeNodes, node)) {
      _.remove(this.tree.treeModel.activeNodes, node);
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onDeactivate, node});
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onBlur, node});
      this.tree.treeModel.fireEvent({eventName: TREE_EVENTS.onActiveChanged, node});
    }
  }

  public exportOperationRecords() {
    return this.operationRecords;
  }

  /**
   * 返回所有选中的子节点(过滤掉文件夹节点)
   * @param excludeFolders 是否过滤掉文件夹节点，默认true
   * @returns {TreeNode[]}
   */
  public getSelectedNodes(excludeFolders: boolean = true) {
    if (excludeFolders)
      return this.tree.treeModel.activeNodes.filter((node) => !node.canExpand);
    else
      return this.tree.treeModel.activeNodes;
  }

  public clearHistory() {
    this.tree.treeModel.activeNodeIds = {};
    this.tree.treeModel.activeNodes = [];
    this.operationRecords = new JsonTreeOperationRecords();
  }

  public setActiveNodes(ids: string[] = [], expand:boolean = true) {
    this.tree.treeModel.roots.forEach((node) => node.activate(ids,expand));
  }

  public reload(nodes: SeerTreeNode[]) {
    this.nodes = nodes;
    this.tree.treeModel.update();
  }

  private checkPermissions(...permissions: number[]): boolean {
    let result = false;
    for (let p of permissions) {
      if (p != (this.permissions & p)) {
        result = false;
        break;
      } else {
        result = true;
      }
    }
    return result;
  }
}
