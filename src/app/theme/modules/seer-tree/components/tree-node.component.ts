import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  styleUrls: ['../seer-tree.scss'],
  styles: [
    `.ion-arrow-right-b{padding: 0 2px 0 3px;}`,
  ],
  template: `
    <div
      *ngIf="!node.isHidden"
      class="tree-node tree-node-level-{{ node.level }}"

      [class.tree-node-leaf]="node.isLeaf"
      [class.tree-node-active]="node.isActive"
      [class.tree-node-focused]="node.isFocused">

      <TreeNodeDropSlot
        *ngIf="nodeIndex === 0 && node.treeModel.options.allowDrag"
        [dropIndex]="nodeIndex"
        [node]="node.parent"
        ></TreeNodeDropSlot>

        <div class="node-wrapper" [style.padding-left]="getNodePadding()">
          <span
            *ngIf="node.hasChildren"
            class="toggle-children-wrapper"
            (click)="node.mouseAction('expanderClick', $event)">

            <span class="toggle-children">
              <i [class.ion-arrow-down-b]="node.isExpanded && node.hasChildren"
                 [class.ion-arrow-right-b]="node.isCollapsed && node.hasChildren" style="font-size: 20px; line-height: 26px;"></i>
            </span>
          </span>
          <span
            *ngIf="!node.hasChildren" class="toggle-children-placeholder">
          </span>
          <div class="node-content-wrapper"
            #nodeContentWrapper
            (click)="node.mouseAction('click', $event)"
            (dblclick)="node.mouseAction('dblClick', $event)"
            (contextmenu)="node.mouseAction('contextMenu', $event)"
            (treeDrop)="onDrop($event)"
            [treeAllowDrop]="allowDrop.bind(this)"
            [treeDrag]="node"
            [treeDragEnabled]="node.allowDrag()">
            <TreeNodeContent [node]="node" [treeNodeContentTemplate]="treeNodeContentTemplate"></TreeNodeContent>
          </div>
        </div>
      <div [class.tree-children]="true"
           [class.tree-children-no-padding]="node.options.levelPadding"
           *ngIf="node.isExpanded">
        <div *ngIf="node.children">
          <TreeNode
            *ngFor="let node of node.children; let i = index"
            [node]="node"
            [nodeIndex]="i"
            [treeNodeContentTemplate]="treeNodeContentTemplate"
            [loadingTemplate]="loadingTemplate">
          </TreeNode>
        </div>
        <LoadingComponent
          [style.padding-left]="getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children && node.hasChildren"
          [loadingTemplate]="loadingTemplate"
        ></LoadingComponent>
      </div>
      <TreeNodeDropSlot
        *ngIf="node.treeModel.options.allowDrag"
        [dropIndex]="nodeIndex + 1"
        [node]="node.parent"
        ></TreeNodeDropSlot>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
  @Input() node:TreeNode;
  @Input() nodeIndex:number;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
  @Input() loadingTemplate: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
  }

  onDrop($event) {
    this.node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this.node, index: 0 }
    });
  }

  allowDrop(element) {
    return this.node.options.allowDrop(element, { parent: this.node, index: 0 });
  }

  getNodePadding() {
    return (this.node.options.levelPadding) * (this.node.level - 1) + 'px';
  }

  ngAfterViewInit() {
    this.node.elementRef = this.elementRef;
  }
}
