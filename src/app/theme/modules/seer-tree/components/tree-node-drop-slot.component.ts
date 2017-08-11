import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'TreeNodeDropSlot',
  styleUrls: ['../seer-tree.scss'],
  template: `
    <div
      class="node-drop-slot"
      [style.margin-left]="getNodePadding()"
      (treeDrop)="onDrop($event)"
      [treeAllowDrop]="allowDrop.bind(this)">
    </div>
  `
})
export class TreeNodeDropSlot {
  @Input() node: TreeNode;
  @Input() dropIndex: number;

  constructor() {
  }

  getNodePadding() {
    let fix = 20;
    return (this.node.options.levelPadding + 7) * (this.node.level) + fix + 'px';
  }

  onDrop($event) {
    this.node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this.node, index: this.dropIndex }
    });
  }

  allowDrop(element) {
    return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex });
  }
}
