import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TREE_ACTIONS, IActionMapping, IActionHandler } from './models/tree-options.model';
import { ITreeOptions } from './defs/api';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';

import {SeerTree} from "./seer-tree/seer-tree.component";
import {FormsModule} from "@angular/forms";

export {
  TreeModel,
  TreeNode,
  TreeDraggedElement,
  ITreeOptions,
  TREE_ACTIONS,
  KEYS,
  IActionMapping,
  IActionHandler,
  LoadingComponent,
  TreeComponent,
  TreeNodeComponent,
  TreeNodeContent,
  TreeDropDirective,
  TreeDragDirective,
  TreeNodeDropSlot
};

@NgModule({
  declarations: [
    LoadingComponent,
    TreeComponent,
    TreeNodeComponent,
    TreeNodeDropSlot,
    TreeNodeContent,
    TreeDropDirective,
    TreeDragDirective,
    SeerTree
  ],
  exports: [
    // TreeComponent,
    // TreeDropDirective,
    // TreeDragDirective,
    SeerTree
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    TreeDraggedElement
  ]
})
export class TreeModule {}
