import {Component, ViewChild} from "@angular/core";
import {DynamicComponentLoader} from "../../theme/directives/dynamicComponent/dynamic-component.directive";
import {SeerTreeDemoComponent} from "../seer-tree/seer-tree-demo.component";
import {SeerTreeDemoDialogComponent} from "../seer-tree/seer-tree-demo-dialog.component";
import {ValidatorDemoComponent} from "../validator/validator-demo.component";
@Component({
  selector: 'criteria-home',
  template: `
<div class="widget">
  <seer-card [title]="'例子'">
    <div class="col-sm-12">
      <button class="btn" (click)="loadTreeDemo()">树(一般动态加载)</button>
      <button class="btn" (click)="loadTreeDemoDialog()">树(模态框)</button>
      <button class="btn" (click)="loadValidator()">表单验证器</button>
    </div>
  </seer-card>
  <div dynamic-component></div>
</div> 
`,
  entryComponents: [SeerTreeDemoComponent, SeerTreeDemoDialogComponent, ValidatorDemoComponent]
})
export class CriteriaHomeComponent {
  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  loadTreeDemo() {
    this.dynamicComponentLoader.loadComponent(SeerTreeDemoComponent);
  }

  loadTreeDemoDialog() {
    this.dynamicComponentLoader.loadComponent(SeerTreeDemoDialogComponent);
  }

  loadValidator() {
    this.dynamicComponentLoader.loadComponent(ValidatorDemoComponent);
  }
}
