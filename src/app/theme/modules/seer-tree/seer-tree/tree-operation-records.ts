import {TreeNode} from "../models/tree-node.model";
import {TREE_EVENTS} from "../constants/events";

function simplifyTreeNode(treeNode: TreeNode): SimpleTreeNode {
  let simple = new SimpleTreeNode();
  simple.data = treeNode.data;
  simple.path = treeNode.path;
  return simple;
}

class SimpleTreeNode {
  data: any;
  path: string[];
}

class JsonRecord {
  treeNode: SimpleTreeNode;
  type: 'new'|'edit' = 'edit';
  operation: JsonOperation;

  constructor(treeNode: SimpleTreeNode, type?:'new'|'edit') {
    this.treeNode = treeNode;
    if (type) {
      this.type = type;
    }
  }
}

class JsonOperation {
  name: string;
  parentId: string|undefined;
  index: number;
  hasRenamed: boolean = false;
  hasMoved: boolean = false;
}

export class JsonTreeOperationRecords {
  records: any = {};
  deletedNodes: string[] = [];

  private getOperationData(treeNode: SimpleTreeNode):JsonRecord {
    if (!this.records[treeNode.data.id]) {
      this.records[treeNode.data.id] = new JsonRecord(treeNode);
    }
    return this.records[treeNode.data.id];
  }

  public record($event) {
    switch ($event.eventName) {
      case TREE_EVENTS.onAddNewNode:
        this.onAddNewNode($event);
        break;
      case TREE_EVENTS.onRenameNode:
        this.onRenameNode($event);
        break;
      case TREE_EVENTS.onMoveNode:
        this.onMoveNode($event);
        break;
      case TREE_EVENTS.onDeleteNode:
        this.onDeleteNode($event.node);
        break;
    }
  }

  onAddNewNode($event) {
    let node = $event.node;
    let create = new JsonOperation();
    create.name = node.data.name;
    create.parentId = node.realParent ? node.realParent.id : undefined;
    create.index = node.realParent ? node.realParent.children.length : node.treeModel.roots.length;
    this.handleCreateEvent(simplifyTreeNode(node), create);
  }

  onRenameNode($event) {
    let node = $event.node;
    let edit = new JsonOperation();
    edit.name = node.data.name;
    edit.hasRenamed = true;
    this.handleRenameEvent(simplifyTreeNode(node), edit);
  }

  onMoveNode($event) {
    let node = $event.node;
    let move = new JsonOperation();
    let to = $event.to;
    move.index = to.index;
    move.parentId = to.parent.data.virtual ? undefined : to.parent.id;
    move.hasMoved = true;
    this.handleMoveEvent(simplifyTreeNode(node), move, to);
  }

  onDeleteNode(treeNode: TreeNode) {
    if(!treeNode.data.isNew){
      if (this.deletedNodes.indexOf(treeNode.id))
      this.deletedNodes.push(treeNode.id);
    }
    delete this.records[treeNode.id];
    //删除节点的子节点
    if (treeNode.children){
      treeNode.children.map((node)=>{
        this.onDeleteNode(node);
      })
    }
  }

  handleCreateEvent(treeNode: SimpleTreeNode, create: JsonOperation) {
    let operationData = this.getOperationData(treeNode);
    operationData.type = "new";
    operationData.operation = create;
  }

  handleRenameEvent(treeNode: SimpleTreeNode, edit: JsonOperation) {
    let operationData = this.getOperationData(treeNode);
    operationData.type = "edit";
    if (!operationData.operation) {
      operationData.operation = edit;
    }else {
      operationData.operation.name = edit.name;
      operationData.operation.hasRenamed = true;
    }
  }

  handleMoveEvent(treeNode: SimpleTreeNode, move, to) {
    let operationData = this.getOperationData(treeNode);
    operationData.treeNode = simplifyTreeNode(to.newNode);
    if (operationData.type=='new') {
      operationData.operation.index = move.index;
      operationData.operation.parentId = move.parentId;
    } else {
      if (!operationData.operation) {
        operationData.operation = new JsonOperation();
      }
      operationData.operation.hasMoved = move.hasMoved;
      operationData.operation.parentId = move.parentId;
      operationData.operation.index = move.index;
    }
  }
}

// /**
//  * 各事件触发情况：
//  *     createNewNode: 新增节点，或修改新增的节点会触发
//  *     onRenameNode：后端已有的节点改名触发
//  *     onMoveNode：新节点和已有节点移动都会触发，需要做判断
//  *     onDeleteNode：新节点和已有节点删除都会触发，需要做判断
//  */
// export class TreeOperationRecords {
//   records: Map<string, OperationData> = new Map();
//   deletedNodesId?:Set<string> = new Set();
//   private getOperationData(treeNode: TreeNode) {
//     if (!this.records.get(treeNode.id)) {
//       this.records.set(treeNode.id, new OperationData(treeNode));
//     }
//     return this.records.get(treeNode.id);
//   }
//
//   exportJson(){
//     let records = [];
//     let deletedNodes = [];
//     this.deletedNodesId.forEach((value,index,set)=>{
//       console.log(value)
//       console.log(index)
//       deletedNodes.push(value)
//     });
//     this.records.forEach((value,key,map)=>{
//       console.log(value)
//       console.log(key)
//     })
//   }
//
//   onAddNewNode($event) {
//     let node = $event.node;
//     let create = new CreateRecord();
//     create.name = node.data.name;
//     create.parentId = node.realParent ? node.realParent.data.id : undefined;
//     create.index = node.realParent ? node.realParent.children.length : node.treeModel.roots.length;
//     this.handleCreateEvent(node, create);
//   }
//
//   onRenameNode($event) {
//     let node = $event.node;
//     let edit = new EditRecord();
//     edit.name = node.data.name;
//     edit.hasRenamed = true;
//     this.handleRenameEvent(node, edit);
//   }
//
//   onMoveNode($event) {
//     let node = $event.node;
//     let move = new EditRecord();
//     let to = $event.to;
//     move.index = to.index;
//     move.parentId = to.parent.data.virtual ? undefined : to.parent.data.id;
//     move.hasMoved = true;
//     this.handleMoveEvent(node, move, to);
//   }
//
//   public record($event) {
//     switch ($event.eventName) {
//       case TREE_EVENTS.onAddNewNode:
//         this.onAddNewNode($event);
//         break;
//       case TREE_EVENTS.onRenameNode:
//         this.onRenameNode($event);
//         break;
//       case TREE_EVENTS.onMoveNode:
//         this.onMoveNode($event);
//         break;
//       case TREE_EVENTS.onDeleteNode:
//         this.onDeleteNode($event.node);
//         break;
//     }
//   }
//
//   handleCreateEvent(treeNode: TreeNode, create: CreateRecord) {
//     let operationData = this.getOperationData(treeNode);
//     operationData.createRecord = create;
//   }
//
//   handleRenameEvent(treeNode: TreeNode, edit: EditRecord) {
//     let operationData = this.getOperationData(treeNode);
//     if (!operationData.editRecord) {
//       operationData.editRecord = new EditRecord();
//     }
//     operationData.editRecord.name = edit.name;
//     operationData.editRecord.hasRenamed = edit.hasRenamed;
//   }
//
//   handleMoveEvent(treeNode: TreeNode, move, to) {
//     let operationData = this.getOperationData(treeNode);
//     operationData.treeNode = to.newNode;
//     if (operationData.createRecord) {
//       operationData.createRecord.index = move.index;
//       operationData.createRecord.parentId = move.parentId;
//     } else {
//       if (!operationData.editRecord) {
//         operationData.editRecord = new EditRecord();
//       }
//       operationData.editRecord.hasMoved = move.hasMoved;
//       operationData.editRecord.parentId = move.parentId;
//       operationData.editRecord.index = move.index;
//     }
//   }
//
//   onDeleteNode(treeNode: TreeNode) {
//     if(!treeNode.data.isNew){
//       this.deletedNodesId.add(treeNode.id);
//     }
//     this.records.delete(treeNode.id);
//     //删除节点的子节点
//     if (treeNode.children){
//       treeNode.children.map((node)=>{
//         this.onDeleteNode(node);
//       })
//     }
//   }
// }
//
//
// class OperationData {
//   treeNode: TreeNode;
//   createRecord?: CreateRecord;
//   editRecord?: EditRecord;
//
//   constructor(treeNode: TreeNode) {
//     this.treeNode = treeNode;
//   }
// }
//
// /**
//  * 某节点被添加的记录
//  */
// class CreateRecord {
//   name: string;
//   parentId: string;
//   index: number;
// }
//
// /**
//  * 某节点被修改的记录
//  */
// class EditRecord {
//   name: string;
//   parentId: string;
//   index: number;
//   hasRenamed: boolean = false;
//   hasMoved: boolean = false;
// }
