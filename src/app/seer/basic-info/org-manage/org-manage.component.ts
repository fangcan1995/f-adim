import {Component, ViewChild, OnDestroy,TemplateRef} from "@angular/core";
import {OrgManageService} from "./org-manage.service";
import {GlobalState} from "../../../global.state";
import {Router} from "@angular/router";
import {jsonTree} from "../../..//theme/utils/json-tree";
import {TREE_PERMISSIONS} from "../../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../../theme/modules/seer-tree/constants/events";
import {SeerTree} from "../../../theme/modules/seer-tree/seer-tree/seer-tree.component";

/*import any = jasmine.any;*/
import {
  DynamicComponentLoader
} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {OrgTreeDialogComponent} from "./components/tree/org-tree.component";
import {OrgModel} from "./OrgModel";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import { User } from "../../model/auth/user"
import {DELETE} from "../../common/seer-table/seer-table.actions"
import * as _ from 'lodash'
@Component({
  selector: 'org-manage',
  templateUrl: './org-manage.component.html',
  styleUrls: ['./org-manage.component.scss'],
  entryComponents: [OrgTreeDialogComponent]
})
export class OrgManageComponent implements OnDestroy{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  @ViewChild(SeerTree) seerTree: SeerTree;

  //组织树
  treeTitle = "组织机构树";
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.ADD|TREE_PERMISSIONS.EDIT|TREE_PERMISSIONS.DELETE|TREE_PERMISSIONS.DRAG|TREE_PERMISSIONS.SHOW_FILTER|TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = [];
  sysUser : User = new User();
  staffs = [];
  staffName;
  staf;
  flag: string;



  //员工列表
  tableTitle: string = "机构员工列表";
  tableSource = [];
  datas = [];
  record = [];
  staffId: string;
  hasGlobalFilter = "true"
  titles = [
    {key:'name',label:'姓名'},
    {key:'place',label:'联系方式'},
    {key:'tel',label:'职位'},
  ];
  actionSet = {
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }
  // filters = [
  //   {
  //     key: 'name',
  //     label: '姓名',
  //     type: 'input.text',
  //   },
  //    {
  //     key: 'organ',
  //     label: '职位',
  //     type: 'input.text',
  //   },
  //   {
  //     key: 'tel',
  //     label: '联系方式',
  //     type: 'input.text',
  //   },
  // ]

  constructor(protected service: OrgManageService, private router: Router, private _state: GlobalState, private _dialogService: SeerDialogService,private modalService: BsModalService) {
    this._state.subscribe("orgStaffState",(a)=>{
      this.getStaffsByOrgId(this.staffId);
    })
  }

  ngOnInit() {
    // 初始化树结构
    this.getOrganizations();
    // 初始化表
    this.getlist();
    // this.title = this.data.title;
    // this.flag = this.data.flag;
    // if (this.flag == '1') {
    //   this.sysUser = this.data.user;
    //   this.staffName = this.data.user.staffName;
    //   this.buttonFlag = false;
    // }
  }

  ngOnDestroy(): void {
    this._state.unsubscribe("orgStaffState");
  }

  /*
   * 获取全部组织机构
   * */
  getOrganizations() {
    this.service.getOrganizations().then((result) => {
      result.data.map(org=>org['children']=[]);
      let nodes = jsonTree(result.data,{parentId:'orgParentId',children:'children'},[{origin:'orgName',replace:'name'}]);
      //nodes.map(rootNode=>rootNode['expanded']=true);
      this.treeNode = nodes;
    });
  }
 

  // 表的数据的获取
  getlist(){
     this.service.getData()
      .then(res => {
        this.datas = res.data;
       
        this.datas = _.map(this.datas, r => _.set(r, 'actions', [ DELETE ]));
      })
  
  }
   // 表格动作
   onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              // this.service.deleteOne(message.data.id)
              //   .subscribe(data => {
              //     this.getList();
              // });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
   }
  /*
   * 通过组织机构id获取所属员工
   * */
  getStaffsByOrgId(orgId) {
    this.service.getStaffsByOrgId(orgId).then((result) => {this.tableSource = result.data});
  }

  /*
   * 组织树通知
   * */
  onNotify($event){   
    console.log($event);
    console.log("=============================");
    
    // debugger;
    // if($event.eventName == "onSelectCompleted"){ 
    //   if($event.data.length > 0) {
    //     this.sysUser.staffId = $event.data[0].id;
    //     this.staffName = $event.data[0].data.name;
    //   }else {
    //     this.sysUser.staffId = undefined;
    //     this.staffName = undefined;
    //   }
    // }  
    
    if($event.eventName == "onFocus"){
      if($event.node.children.length > 0){
        for(let i = 0 ; i < $event.node.data.children.length; i++){
          console.log($event.node.data.children);  
          console.log("-------------------------------------");
          this.staf = $event.node.data.name
          this.staffName = $event.node.data.children[i].name    
        }
      }else{
       this.staf = $event.node.data.name
       this.staffName =""
      }
    }else{
      this.staffName = undefined;
    }
    





    /* 根据组织机构查询人员*/
    // if ($event.eventName==TREE_EVENTS.onActivate){
    //   //$event.node.setIsExpanded(true)
    //   this.staffId = $event.node.id;
    //   this.getStaffsByOrgId($event.node.id);
    // }

    /* 删除组织机构*/
    // if ($event.eventName==TREE_EVENTS.onDeleteNode){
    //   this.service.delOrganization($event.node.id);
    // }

    /* 新增组织机构*/
    // if ($event.eventName==TREE_EVENTS.onAddNewNode){
    //   console.log($event.node);
    //   let orgModel = new OrgModel();
    //   orgModel.id = $event.node.id;
    //   orgModel.orgParentId = $event.node.parent.id;
    //   orgModel.orgName = $event.node.data.name;
    //   if($event.node.isRoot == true) {
    //     orgModel.orgSort = $event.node.treeModel.roots.length;
    //   }else {
    //     orgModel.orgSort = $event.node.parent.children.length;
    //   }

    //   this.service.addOrganization(orgModel).then((result) => {
    //     if(!result.success) {
    //       alert("操作失败，请重试！");
    //     }
    //   });
    // }


    // if ($event.eventName==TREE_EVENTS.onDoubleClick){

    // }

    /* 移动组织机构*/
    // if ($event.eventName==TREE_EVENTS.onMoveNode){
    //   console.log($event.node);
    //   let orgModel = new OrgModel();
    //   orgModel.id = $event.node.id;
    //   orgModel.orgParentId = $event.node.parentId;
    //   orgModel.orgSort = $event.to.index;
    //     this.service.editOrganization(orgModel).then((result) => {
    //     if(!result.success) {
    //       if(!result.success) {
    //         alert("操作失败，请重试！");
    //       }
    //     }
    //   });
    // }

    /* 组织机构重命名*/
    // if ($event.eventName==TREE_EVENTS.onRenameNode){
    //   let orgModel = new OrgModel();
    //   orgModel.id = $event.node.id;
    //   orgModel.orgName = $event.node.data.name;
    //   this.service.editOrganization(orgModel).then((result) => {
    //     if(!result.success) {
    //       alert("操作失败，请重试！");
    //     }
    //   });
    // }

  }

  /*
   * 获取树的操作记录
   * */
  /*getOperationRecords(){

    let data = this.seerTree.exportOperationRecords();
    console.log(data);
    if(data.records != null) {
      let recordKeys = Object.keys(data.records);
      let editList: Array<OrgModel> = [];
      let createList: Array<OrgModel> = [];
      for (let index in recordKeys) {
        let orgModel = new OrgModel();
        let jsonRecord = data.records[recordKeys[index]];
        orgModel.id = recordKeys[index];
        orgModel.orgParentId = jsonRecord.operation.parentId;
        orgModel.orgName = jsonRecord.operation.name;
        orgModel.orgSort = jsonRecord.operation.index;
        if(jsonRecord.type == "edit") {
          editList.push(orgModel);
        } else  {
          createList.push(orgModel);
        }
      }
      let requestJson = {deletedNodes: data.deletedNodes, editOrgList: editList, createOrgList: createList};
      this.service.operationRecord(requestJson).then((result) => {
        console.log(result);
        if(result.success) {
          alert("操作成功！");
        }
      });
    }
  }*/

  /*
  * 弹出组织树
  * */
  // chooseOrgTree(staff) {
  //   this.dynamicComponentLoader.loadComponent(OrgTreeDialogComponent, staff);
  // }

  // removeStaff(staff) {
  //   staff.staffOrgId = "bb147c3f-a8ed-4aed-8c2e-6eeb27c41234";
  //   this.service.updateStaffOrgId(staff).then((result) => {
  //     if(result.success){
  //       if(result.success) {
  //         this.getStaffsByOrgId(this.staffId);
  //       }
  //     }else {
  //       alert("移除失败，请重试！");
  //     }
  //   });
  // }
  //========模态层=======
   // =====================模态层==============================
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}

