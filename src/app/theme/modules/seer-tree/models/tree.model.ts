import { Injectable, Component, Input, EventEmitter, TemplateRef } from '@angular/core';
import { ITreeNodeTemplate } from '../components/tree-node-content.component';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { ITreeModel } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

import { deprecated } from '../deprecated';

import * as _ from 'lodash';

@Injectable()
export class TreeModel implements ITreeModel {
  roots: TreeNode[];
  options: TreeOptions = new TreeOptions();
  nodes: any[];
  expandedNodeIds: { [id:string]: boolean } = {};
  expandedNodes: TreeNode[];
  activeNodeIds: { [id:string]: boolean } = {};
  activeNodes: TreeNode[];
  _focusedNode: TreeNode = null;
  focusedNodeId: string = null;
  static focusedTree = null;
  private events: any;
  virtualRoot: TreeNode;
  firstUpdate = true;

  eventNames = Object.keys(TREE_EVENTS);

  setData({ nodes, options = null, events = null }:{nodes:any,options:any,events:any}) {
    if (options) {
      this.options = new TreeOptions(options);
    }
    if (events) {
      this.events = events;
    }
    if (nodes) {
      this.nodes = nodes;
    }

    this.update();
  }

  update() {
    // Rebuild tree:
    let virtualRootConfig = {
      virtual: true,
      [this.options.childrenField]: this.nodes
    };

    this.virtualRoot = this.getTreeNode(virtualRootConfig, null);

    this.roots = this.virtualRoot.children;

    this._initTreeNodeContentComponent();
    this._initLoadingComponent();
    this._calculateExpandedNodes();
    this._calculateSelectedNodes();
    this._loadState();

    // Fire event:
    if (this.firstUpdate) {
      if (this.roots) {
        this.fireEvent({ eventName: TREE_EVENTS.onInitialized });
        this.firstUpdate = false;
      }
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.onUpdateData });
    }
  }

  _calculateExpandedNodes(startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds[startNode.id] = true;
    }
    if (startNode.children) {
      startNode.children.forEach((child) => this._calculateExpandedNodes(child));
    }
  }

  _calculateSelectedNodes(startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isSelectedField]) {
      this.activeNodeIds[startNode.id] = true;
    }
    if (startNode.children) {
      startNode.children.forEach((child) => this._calculateSelectedNodes(child));
    }
  }

  fireEvent(event) {
    this.events[event.eventName].emit(event);
    this.events.onEvent.emit(event);
  }

  get focusedNode() { deprecated('focusedNode attribute', 'getFocusedNode'); return this.getFocusedNode(); }
  set focusedNode(value) { deprecated('focusedNode = ', 'setFocusedNode'); this.setFocusedNode(value) };

  getFocusedNode():TreeNode {
    return this._focusedNode;
  }

  setFocusedNode(node) {
    this._focusedNode = node;
    this.focusedNodeId = node ? node.id : null;
  }

  getActiveNode():TreeNode {
    return this.activeNodes[0];
  }

  getActiveNodes():TreeNode[] {
    return this.activeNodes;
  }

  getTreeNode(node:any, parent:TreeNode):TreeNode {
    return new TreeNode(node, parent, this);
  }

  getVisibleRoots() {
    return this.virtualRoot.getVisibleChildren();
  }

  getFirstRoot(skipHidden = false) {
    return _.first(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  getLastRoot(skipHidden = false) {
    return _.last(skipHidden ? this.getVisibleRoots() : this.roots);
  }

  get isFocused() {
    return TreeModel.focusedTree === this;
  }

  isNodeFocused(node) {
    return this._focusedNode === node;
  }

  setFocus(value) {
    TreeModel.focusedTree = value ? this : null;
  }


  private _treeNodeContentComponent:any;
  get treeNodeContentComponent() { return this._treeNodeContentComponent };

  private _loadingComponent:any;
  get loadingComponent() { return this._loadingComponent };

  // if treeNodeTemplate is a component - use it,
  // otherwise - it's a template, so wrap it with an AdHoc component
  _initTreeNodeContentComponent() {
    this._treeNodeContentComponent = this.options.treeNodeTemplate;
    if (typeof this._treeNodeContentComponent === 'string') {
      this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
    }
  }

  // same for loading component
  _initLoadingComponent() {
    this._loadingComponent = this.options.loadingComponent;
    if (typeof this._loadingComponent === 'string') {
      this._loadingComponent = this._createAdHocComponent(this._loadingComponent);
    }
  }

  _loadState() {
    if (this.focusedNodeId) {
      this._focusedNode = this.getNodeById(this.focusedNodeId);
    }

    this.expandedNodes = Object.keys(this.expandedNodeIds)
      .filter((id) => this.expandedNodeIds[id])
      .map((id) => this.getNodeById(id))
    this.expandedNodes = _.compact(this.expandedNodes);

    this.activeNodes = Object.keys(this.activeNodeIds)
      .filter((id) => this.activeNodeIds[id])
      .map((id) => this.getNodeById(id))
    this.activeNodes = _.compact(this.activeNodes);
  }

  getNodeByPath(path, startNode=null):TreeNode {
    if (!path) return null;

    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;

    if (!startNode.children) return null;

    const childId = path.shift();
    const childNode = _.find(startNode.children, { [this.options.idField]: childId });

    if (!childNode) return null;

    return this.getNodeByPath(path, childNode)
  }

  getNodeById(id) {
    return this.getNodeBy({ id });
  }

  getNodeBy(predicate, startNode = null) {
    startNode = startNode || this.virtualRoot;

    if (!startNode.children) return null;

    const found = _.find(startNode.children, predicate);

    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const found = this.getNodeBy(predicate, child);
        if (found) return found;
      }
    }
  }

  _createAdHocComponent(templateStr): any {
    @Component({
        selector: 'TreeNodeTemplate',
        template: templateStr
    })
    class AdHocTreeNodeTemplateComponent {
        @Input() node: TreeNode;
    }
    return AdHocTreeNodeTemplateComponent;
  }

  focusNextNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
    nextNode && nextNode.focus();
  }

  focusPreviousNode() {
    let previousNode = this.getFocusedNode();
    let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
    nextNode && nextNode.focus();
  }

  focusDrillDown() {
    let previousNode = this.getFocusedNode();
    if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
      nextNode && nextNode.focus();
    }
  }

  focusDrillUp() {
    let previousNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode = previousNode.realParent;
      nextNode && nextNode.focus();
    }
  }

  isActive(node) {
    return this.activeNodeIds[node.id];
  }

  canExpand(node) {
    return node.hasChildren || node.children;
  }

  isAllChildrenActive(node):boolean{
    if (!node.children || node.children.length<1){
      return this.isActive(node);
    }
    if (!this.isActive(node)){
      return false;
    }
    let nodes = node.children;
    for(let i = 0; i<nodes.length; i++){
      let child = nodes[i];
      let grandchildren = child.children;
      //如果node的子节点的子节点是动态加载的，而且尚未加载，则false
      if (child.hasChildren && (!grandchildren || grandchildren.length<1)){
        return false;
      }
      //如果已激活的节点ids中没有child.id，false
      if(!this.activeNodeIds[child.id]){
        return false;
      }
      //如果直接子节点都激活了，并且子节点还有子节点，递归一下
      if (grandchildren && grandchildren.length>0){
        for (let j = 0; j<grandchildren.length; j++){
          if (!this.isAllChildrenActive(grandchildren[j])){
            return false;
          }
        }
      }
    }
    return true;
  }

  setActiveNode(node, value, multi = false) {

    if (multi) {
      this._setActiveNodeMulti(node, value);
    } else {
      this._setActiveNodeSingle(node, value);
    }

    if (value) {
      this.fireEvent({ eventName: TREE_EVENTS.onActivate, node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node });
    }
  }

  _setActiveNodeSingle(node, value) {
    // Deactivate all other nodes:
    this.activeNodes
      .filter((activeNode) => activeNode != node)
      .forEach((activeNode) => {
        this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: activeNode });
      });

    this.activeNodeIds = {};
    this.activeNodes = [];
    if (value) {
      this.activeNodes.push(node);
      this.activeNodeIds[node.id] = true;
    }
  }

  _setActiveNodeMulti(node, value) {
    this.activeNodeIds[node.id] = value;
    if (value) {
      if (!_.includes(this.activeNodes, node)) {
        this.activeNodes.push(node);
      }
    } else {
      if (_.includes(this.activeNodes, node)) {
        _.remove(this.activeNodes, node);
      }
    }
  }

  isExpanded(node) {
    return this.expandedNodeIds[node.id];
  }

  setExpandedNode(node, value) {
    const index = _.indexOf(this.expandedNodes, node);

    if (value && !index) this.expandedNodes.push(node);
    else if (index) _.pullAt(this.expandedNodes, index);

    this.expandedNodeIds[node.id] = value;
  }

  performKeyAction(node, $event) {
    const action = this.options.actionMapping.keys[$event.keyCode]
    if (action) {
      $event.preventDefault();
      action(this, node, $event);
      return true;
    } else {
      return false;
    }
  }

  filterNodes(filter, autoShow = false) {
    let filterFn;

    if (!filter) {
      return this.clearFilter();
    }

    if (_.isString(filter)) {
      filterFn = (node) => node.displayField && node.displayField.toLowerCase().indexOf(filter.toLowerCase()) != -1;
    }
    else if (_.isFunction(filter)) {
       filterFn = filter;
    }
    else {
      console.error('Don\'t know what to do with filter', filter);
      console.error('Should be either a string or function', filter);
    }
    this.roots.forEach((node) => node.filter(filterFn, autoShow));
  }

  clearFilter() {
    this.roots.forEach((node) => node.clearFilter());
  }

  private _canMoveNode(node, fromIndex, to) {
    // same node:
    if (node.parent === to.parent && fromIndex === to.index) {
      return false;
    }

    return !to.parent.isDescendantOf(node);
  }

  moveNode(sourceNode, to) {
    _.remove(sourceNode.parent.children, sourceNode);
    let newNode = to.parent.genNewNode(sourceNode.data);
    to.parent.children.splice(to.index, 0, newNode);
    this.fireEvent({ eventName: TREE_EVENTS.onMoveNode, node: sourceNode, to: { parent: to.parent, index: to.index, newNode: newNode } });
  }
}
