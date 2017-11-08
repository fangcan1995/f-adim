import {
  Component,
  ViewChild,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';

import {OrgService} from "./org.service";
import {GlobalState} from "../../../global.state";
import {json2Tree} from "../../..//theme/libs/json2Tree";
import {TREE_PERMISSIONS} from "../../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../../theme/modules/seer-tree/constants/events";
import {SeerTree} from "../../../theme/modules/seer-tree/seer-tree/seer-tree.component";

import {
  DynamicComponentLoader
} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { OrgTreeDialogComponent } from "./components/tree/org-tree.component";
import { OrgModel } from "./OrgModel";
import {
  SeerDialogService,
  SeerMessageService,
} from '../../../theme/services';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { User } from "../../model/auth/user";
import {DELETE, UPDATE, CONFIG_LEADER} from "../../common/seer-table/seer-table.actions";
import {isNullOrUndefined} from "util";
@Component({
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss'],
  entryComponents: [OrgTreeDialogComponent]
})
export class OrgComponent implements OnDestroy{

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  @ViewChild(SeerTree) seerTree: SeerTree;

  //组织树
  treeTitle = "组织机构树";
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.ADD|TREE_PERMISSIONS.EDIT|TREE_PERMISSIONS.DELETE|TREE_PERMISSIONS.DRAG|TREE_PERMISSIONS.SHOW_FILTER|TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = [];
  sysUser: User = new User();
  staffs = [];
  info = {
    departmentId: '',
    departmentName: '',
    departmentLeader: '',
    pid: '',
    pids: ''
  };
  cacheMemory;
  flag: string;


  //员工列表
  tableTitle: string = "机构员工列表";
  tableSource = [];
  datas = [];
  record = [];
  staffId: string;
  hasGlobalFilter = "true";
  titles = [
    { key:'empName', label:'姓名' },
    { key:'phone', label:'联系方式' },
    { key:'position', label:'职位' },
  ];
  pageInfo = {
    pageNum: 1,
    pageSize: 100000,
    total: 1000,
    departmentId: 1,
    globalSearch: '',
    sortBy: ''
  };


  permissionsOptions = [];
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

  constructor(
    protected service: OrgService,
    private router: Router,
    private _state: GlobalState,
    private _dialogService: SeerDialogService,
    private modalService: BsModalService,
    private _messageService: SeerMessageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    ) {
      this._state.subscribe("orgStaffState", a => {
        this.getStaffsByOrgId(this.staffId);
      })
  }

  ngOnInit() {
    // 初始化树结构
    this.getOrganizations();
    // 初始化表
    this.getlist(this.pageInfo);
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
    this.service.getOrganizations()
      .then((result) => {
        console.log(result);
        let nodes = json2Tree(result.data, {parentId:'pid',children:'children', id: 'departmentId'},[{origin:'departmentName',replace:'name'}, {origin: 'departmentId', replace: 'id'}]);
        function addIcon (param) {
          param.map( org => {
            if(org.children) {
              org.customIcon = 'ion-ios-people';
              addIcon(org.children);
            }
            else {
              org.customIcon = 'ion-android-people';
              org.children = [];
            }
          })
        }
        addIcon(nodes);
        nodes.map(rootNode=>rootNode['expanded']=true);
        this.treeNode = nodes;
        console.log(this.treeNode);
    }).catch(err => {
        console.log(err);
    });
  }




  // 表的数据的获取
  getlist(params){
     /*this.service.getData(params)
      .then(res => {
        this.datas = res.data;

        this.datas = _.map(this.datas, r => _.set(r, 'actions', [ DELETE ]));
      })*/
     this.service.getData(params).then( result => {
       this.pageInfo.pageNum = result.data.pageNum;  //当前页
       this.pageInfo.pageSize = result.data.pageSize; //每页记录数
       this.pageInfo.total = result.data.total; //记录总数
       this.datas = result.data.list;
       console.log(this.datas);
       this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE,CONFIG_LEADER]));
     });

  }

  /* 全局搜索 */

  seachFilter () {
    this.service.getData(this.pageInfo).then( result => {
      this.pageInfo.pageNum = result.data.pageNum;  //当前页
      this.pageInfo.pageSize = result.data.pageSize; //每页记录数
      this.pageInfo.total = result.data.total; //记录总数
      this.datas = result.data.list;
      this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE,CONFIG_LEADER]));
    });
  }




   // 表格动作
   onChange(message):void {
    console.log(message);
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'update':
        this._router.navigate([`../../staff-manage/edit/${data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'config_leader':
        alert(1);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteOne(message.data.id).then( result => {
                if(result.code == 0) {
                  this.alertSuccess(result.message);
                }
                else {
                  this.alertError(result.message);
                }
                this.getlist({pageNum: 1, pageSize: 10, departmentId: 1});
              });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
   }

   /* 提交组织机构负责人 */
   handleChangeLeader () {
     if(this.cacheMemory) {
       this.cacheMemory.departmentName = this.info.departmentName;
       this.cacheMemory.departmentLeader = this.info.departmentLeader;
       console.log('1234');
       console.log(this.cacheMemory);
       this.service.editOrganization(this.cacheMemory).then( result => {
         if(result.code == 0) {
           this.alertSuccess(result.message);
           this.getOrganizations();
         }
         else {
           this.alertError(result.message);
         }
       })
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

      /* 获取组织的名称及其领导 */
      if($event.node.data.departmentId) {
        this.service.getOrganizationsById($event.node.data.departmentId).then( result => {
          console.log(result.data);
          this.cacheMemory = result.data;
          this.info.departmentName = result.data.departmentName;
          if(result.data.departmentLeader) {
            this.info.departmentLeader = result.data.departmentLeader;
          }
          else {
            this.info.departmentLeader = undefined;
          }
        }).catch( err => {
          console.log(err);
        });


        /* 获取右侧表格信息 */
        this.pageInfo.departmentId = $event.node.data.departmentId;
        this.service.getData(this.pageInfo).then( result => {
          this.tableSource = result.data;
          console.log('1234567890-');
          console.log(this.tableSource);
          this.pageInfo.pageNum = result.data.pageNum;  //当前页
          this.pageInfo.pageSize = result.data.pageSize; //每页记录数
          this.pageInfo.total = result.data.total; //记录总数
          this.datas = result.data.list;
          this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE]));
        })
      }




    }







    /* 根据组织机构查询人员*/
    // if ($event.eventName==TREE_EVENTS.onActivate){
    //   //$event.node.setIsExpanded(true)
    //   this.staffId = $event.node.id;
    //   this.getStaffsByOrgId($event.node.id);
    // }


    /*  删除组织结构 */
    if($event.eventName == TREE_EVENTS.onDeleteNode) {
      this.service.delOrganization($event.node.data.departmentId).then( result => {
        if(result.code == 0) {
          this.alertSuccess(result.message);
          this.getOrganizations();
        }
        else {
          this.alertError(result.message);
        }
      });
    }

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

    /* 新增组织结构 */
    if($event.eventName == TREE_EVENTS.onAddNewNode) {
      console.log($event.node);
      let orgModel = {
        departmentName: $event.node.data.name,
        name: $event.node.data.name,
        pid: $event.node.parent.data.departmentId,
        pids: $event.node.parent.data.pids + ',' + $event.node.parent.data.departmentId,
      };
      this.service.addOrganization(orgModel).then( result => {
        if(result.code == 0) {
          this.alertSuccess(result.message);
          this.getOrganizations();
        }
        else {
          this.alertError(result.message);
        }
      })
    }


    // if ($event.eventName==TREE_EVENTS.onDoubleClick){

    // }

    /* 移动组织机构*/
    if ( $event.eventName == TREE_EVENTS.onMoveNode ) {

      console.log($event.to.parent.data.pid);
      console.log($event.to.parent.data.pids);
      this.info.departmentName = $event.node.data.name;
      this.info.departmentId = $event.node.data.departmentId;
      this.info.departmentLeader = $event.node.data.departmentLeader;
      this.info.pid = $event.to.parent.data.departmentId;
      this.info.pids = $event.to.parent.data.pids + ',' + $event.to.parent.data.departmentId;
      console.log(this.info);
      this.service.editOrganization(this.info).then((result) => {
        if(result.code == 0) {
          this.alertSuccess(result.message);
          this.getOrganizations();
        }
        else {
          this.alertError(result.message);
        }
      });
    }

    /*组织机构重命名*/
    if($event.eventName == TREE_EVENTS.onRenameNode) {
      this.info.departmentName = $event.node.data.name;
      this.info.departmentId = $event.node.data.departmentId;
      this.info.departmentLeader = $event.node.data.departmentLeader;
      this.info.pid = $event.node.data.pid;
      this.info.pids = $event.node.data.pids;
      this.service.editOrganization(this.info).then( result => {
        if(result.code == 0) {
          this.alertSuccess(result.message);
          this.getOrganizations();
        }
        else {
          this.alertError(result.message);
        }
      });
    }
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



  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-check',
      message: info,
      autoHideDuration: 3000,
    }).onClose();
  };

  alertError(errMsg:string){
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  };



  //========模态层=======
   // =====================模态层==============================
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onNotice ($event) {
    console.log($event);

    if($event.eventName == "onFocus") {

    }
  }

}

