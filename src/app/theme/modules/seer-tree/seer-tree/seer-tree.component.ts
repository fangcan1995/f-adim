import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from "@angular/core";
import { SeerTreeNode } from "./SeerTreeNode";
import { JsonTreeOperationRecords } from "./tree-operation-records";
import { TreeComponent } from "../components/tree.component";
import { TREE_ACTIONS } from "../models/tree-options.model";
import { KEYS } from "../constants/keys";
import { TREE_EVENTS } from "../constants/events";
import { TreeNode } from "../models/tree-node.model";
import { TREE_PERMISSIONS } from "../constants/permissions";
import { SeerDialogService, SeerMessageService } from '../../../services';
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
    templateUrl: './seer-tree.component.html'
})
export class SeerTree implements OnInit {


    @Input() permissions: number = 0;
    @Input() useOrigin: boolean = true;
    @Input() nodes: SeerTreeNode[] = [];
    @Input() defaultNodeName = '新节点';
    @Input() newNodeData = {};
    @Input() loadingText = '加载中...';
    @Input() filterText = '筛选节点';
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    @Input() customAllowDrop: { (element, to): boolean };

    public onEditing = false;
    public cachedNodeName: string;
    public operationRecords: JsonTreeOperationRecords = new JsonTreeOperationRecords();

    @ViewChild('tree') public tree: TreeComponent;
    public treePermissions = TREE_PERMISSIONS;

    public currentHoveringNode;
    public lastHoveringNode;

    //操作配置,这个要在options上面
    public actionMapping = {
        mouse: {
            dblClick: (tree, node, $event) => {
                // if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            },
            click: (tree, node, $event) => {
                ($event.ctrlKey || $event.shiftKey) && this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)
                    ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                    : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
                if (this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE, TREE_PERMISSIONS.MULTI_SELECT)) {
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
    public seerTreeOptions = {
        // levelPadding: 33,
        isExpandedField: 'expanded',
        isSelectedField: 'selected',
        customIconField: 'customIcon',
        forbidChangeTypeField: 'forbidChangeType',
        idField: 'id',
        actionMapping: this.actionMapping,
        allowDrag: true,
        allowDrop: (element, to, otherAllowDropFunction: { (element, to): boolean } = this.customAllowDrop) => {
            if (!element || !to) {
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
            if (to.parent.data.virtual && element.realParent && !this.checkPermissions(TREE_PERMISSIONS.MULTI_ROOT)) {
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
            if (otherAllowDropFunction && !otherAllowDropFunction(element, to)) {
                return false;
            }
            //目标可以有子节点才允许拖拽至此
            return to.parent.children;
        }
    };

    constructor(
        private _dialogService: SeerDialogService,
    ) {
    }

    ngOnInit(): void {
        this.updatePermission(this.permissions);
    }

    public updatePermission(permissions = 0) {
        this.permissions = permissions;
        this.seerTreeOptions.allowDrag = this.checkPermissions(TREE_PERMISSIONS.DRAG);
    }

    public stopPropagation($event) {
        $event.stopPropagation();
    }

    /**
     * 添加一个根节点
     * @param $event
     * @param node
     */
    public addRootNode($event) {
        $event.stopPropagation();
        if (this.onEditing) {
            this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
            //alert('请先处理当前节点');
            return;
        }
        let newNodeData = {
            isNew: true,
            name: this.defaultNodeName,
        };
        for (let attr in this.newNodeData) {
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
    public addNode($event, node) {
        $event.stopPropagation();
        if(this.useOrigin) {
            if (this.onEditing) {
                this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
                return;
            }
            if (!node.isExpanded) {
                node.toggleExpanded();
            }
            let newNodeData = {
                isNew: true,
                name: this.defaultNodeName,
            };
            for (let attr in this.newNodeData) {
                newNodeData[attr] = this.newNodeData[attr];
            }
            node.addNewNode(newNodeData);
            this.editNew(node.children[node.children.length - 1]);
        }
        this.tree.treeModel.fireEvent({
            eventName: TREE_EVENTS.onClickNew,
            node
        });
    }

    /**
     * 编辑已有节点
     * @param $event
     * @param node
     */
    public edit($event, node) {
        $event.stopPropagation();
        if(this.useOrigin) {
            if (this.onEditing) {
                this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
                return;
            }
    
            this.cachedNodeName = node.data.name;
            node.isInEditing = true;
            this.onEditing = true;
            this.seerTreeOptions.allowDrag = false;
        }
        

        this.tree.treeModel.fireEvent({
            eventName: TREE_EVENTS.onClickEdit,
            node
        });
    }

    /**
     * 编辑新节点
     * @param $event
     * @param node
     */
    public editNew(node) {
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
    public saveEditing($event, node) {
        $event.stopPropagation();
        node.isInEditing = false;
        this.onEditing = false;
        this.seerTreeOptions.allowDrag = true;
        if (node.data.name !== this.cachedNodeName) {
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
    public cancelEditing($event, node) {
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

    public changeType($event, node: TreeNode) {
        $event.stopPropagation();
        if (node.children && node.children.length > 0) {
            this._dialogService.confirm('还有子节点未删除', [{ type: '0', text: '确定' }]);
            //alert('还有子节点未删除');
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
    public deleteNode($event, node: TreeNode) {
        console.log(node);
        $event.stopPropagation();
        if (this.onEditing) {
            this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
            return;
        }
        if (!node.realParent) {
            this._dialogService.confirm(`删除后 #${node.data.name}# 栏目及其子栏目的所有文章一并删除，确认要删除吗？`, [
                {
                    type: 1,
                    text: '确认删除'
                },
                {
                    type: 0,
                    text: '暂不删除'
                }
            ]).subscribe(action => {
                if (action === 1) {
                    _.remove(this.tree.treeModel.roots, node);
                    this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onDeleteNode, node });
                    return;
                }
            })
        }
        if (node.realParent && (node.canExpand)) {
            this._dialogService.confirm(`删除后 #${node.data.name}# 栏目及其子栏目的所有文章一并删除，确认要删除吗？`, [
                {
                    type: 1,
                    text: '确认删除'
                },
                {
                    type: 0,
                    text: '暂不删除'
                }
            ]).subscribe(action => {
                if (action === 1) {
                    _.remove(node.realParent.children, node);
                    this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onDeleteNode, node });
                    return;
                }
            });
        }
        if (node.realParent && !node.canExpand) {
            this._dialogService.confirm(`删除后 #${node.data.name}# 栏目及其子栏目的所有文章一并删除，确认要删除吗？`, [
                {
                    type: 1,
                    text: '确认删除'
                },
                {
                    type: 0,
                    text: '暂不删除'
                }
            ]).subscribe(action => {
                if (action === 1) {
                    _.remove(node.realParent.children, node);
                    this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onDeleteNode, node });
                    return;
                }
            });
        }
    }

    /**
     * 获得某节点的直接子节点数量
     * @param node
     * @returns {string}
     */
    public childrenCount(node: TreeNode): string {
        if (node && node.children) {
            if (this.checkPermissions(TREE_PERMISSIONS.MULTI_SELECT)) {
                let activatedChildrenCount = 0;
                node.children.map(n => {
                    if (n.isActive) {
                        activatedChildrenCount++;
                    }
                });
                return `(${activatedChildrenCount}/${node.children.length})`;
            } else {
                // return `(${node.children.length})`;
                return ''
            }
        }
        return '';
    }

    /**
     * 过滤节点
     * @param text
     * @param tree
     */
    public filterNodes(text, tree) {
        tree.treeModel.filterNodes(text, true);
    }

    public filter(text: string, autoShow = true) {
        this.tree.treeModel.filterNodes(text, autoShow);
    }

    public onEvent($event) {
        switch ($event.eventName) {
            case TREE_EVENTS.onAddNewNode:
            case TREE_EVENTS.onRenameNode:
            case TREE_EVENTS.onDeleteNode:
            case TREE_EVENTS.onMoveNode:
                this.operationRecords.record($event);
                break;
        }
        if (this.checkPermissions(TREE_PERMISSIONS.NOTIFY)) {
            this.notify.emit($event);
        }
    }

    public onToggleLeaf($event, node) {
        $event.stopPropagation();
        if (this.onEditing) {
            this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
            return;
        }
        if (this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE, TREE_PERMISSIONS.MULTI_SELECT)) {
            this.checkParentsCascade(node);
        }
        if (!node.isActive) {
            this.setNodeCheckedMultiIgnoreAlreadyChecked(node);
        } else {
            this.setNodeMultiUnchecked(node);
        }
        if (this.checkPermissions(TREE_PERMISSIONS.NOTIFY)) {
            this.notify.emit({ eventName: 'onCheckedChange', node });
        }
    }

    public onToggleChildren($event, node) {
        $event.stopPropagation();
        if (this.onEditing) {
            this._dialogService.confirm('请先处理当前节点', [{ type: '0', text: '确定' }]);
            return;
        }
        if (this.checkPermissions(TREE_PERMISSIONS.SELECT_PARENT_CASCADE, TREE_PERMISSIONS.MULTI_SELECT)) {
            this.checkParentsCascade(node);
        }
        if (node.isAllChildrenActive) {
            this.setChildrenNodesAllUnchecked(node)
        } else {
            this.setChildrenNodesAllChecked(node);
        }
        if (this.checkPermissions(TREE_PERMISSIONS.NOTIFY)) {
            this.notify.emit({ eventName: 'onCheckedChange', node });
        }
    }

    public checkParentsCascade(node) {
        if (node.realParent) {
            if (!node.realParent.isActive) {
                node.realParent.toggleActivated(true);
            }
            this.checkParentsCascade(node.realParent);
        }
    }

    public setChildrenNodesAllChecked(node) {
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

    public setChildrenNodesAllUnchecked(node) {
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
    public setNodeCheckedMultiIgnoreAlreadyChecked(node) {
        this.tree.treeModel.activeNodeIds[node.id] = true;
        if (!_.includes(this.tree.treeModel.activeNodes, node)) {
            this.tree.treeModel.activeNodes.push(node);
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onActivate, node });
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onFocus, node });
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onActiveChanged, node });
        }
    }

    public setNodeMultiUnchecked(node) {
        this.tree.treeModel.activeNodeIds[node.id] = false;
        if (_.includes(this.tree.treeModel.activeNodes, node)) {
            _.remove(this.tree.treeModel.activeNodes, node);
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node });
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onBlur, node });
            this.tree.treeModel.fireEvent({ eventName: TREE_EVENTS.onActiveChanged, node });
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

    public setActiveNodes(ids: string[] = [], expand: boolean = true) {
        this.tree.treeModel.roots.forEach((node) => node.activate(ids, expand));
    }

    public reload(nodes: SeerTreeNode[]) {
        this.nodes = nodes;
        this.tree.treeModel.update();
    }

    public checkPermissions(...permissions: number[]): boolean {
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
