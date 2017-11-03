import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseModalComponent } from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { OrgService } from "../../org.service";
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {json2Tree} from "../../../../../theme/libs/json2Tree";
import { GlobalState } from "../../../../../global.state";
import { TREE_EVENTS } from "../../../../../theme/modules/seer-tree/constants/events";

@Component({
  selector: 'org-tree',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.scss'],
  providers: [],
})
export class OrgTreeDialogComponent extends BaseModalComponent implements OnInit{
  /**
   * 1.找到modal组件
   */
  @ViewChild(ModalComponent) modal;
  @ViewChild(SeerTree) seerTree: SeerTree;

  constructor(
    protected service?: OrgService,
    private gs?: GlobalState,
  ) {
    super();
  }
  ngOnInit(): void {
    this.getOrganizations();

    /**
     * 2.初始化
     */
    this.init(this.modal);


  }

  title = '选择组织机构';

  nodes = [];

  save(){
    let node = this.seerTree.getSelectedNodes(false);//这里注意一下：参数默认为true，如果为false，不会排除掉文件夹节点
    console.log(123);
    console.log(node);
    /*if(node.length == 1) {
      let department = {id: this.data.id, staffOrgId: node[0].id};
      this.service.updateStaffOrgId(staff).then((result) => {
        if(result) {
          this.gs.notify("orgStaffState",null);
          this.closeModal();
        }
      });
    }*/
  }

  /*
   * 获取全部组织机构
   * */
  getOrganizations() {
    this.service.getOrganizations().then((result) => {
      this.nodes = json2Tree(result.data, {parentId:'pid',children:'children', id: 'departmentId'},[{origin:'departmentName',replace:'name'}, {origin: 'code', replace: 'id'}]);
    });
  }

  onNotify($event) {

    if ($event.eventName == TREE_EVENTS.onActivate) {
      $event.node.setIsExpanded(true)
    }
  }



}
