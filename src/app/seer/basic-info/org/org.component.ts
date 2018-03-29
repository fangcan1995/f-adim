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
import { colorHelper } from "app/theme/theme.constants";


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
    departLeaderId: '',
    pid: '',
    pids: '',
  };
  cacheMemory = '1';
  flag: string;
  root: any = {};


  mytime: Date = new Date();

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
    { key:'departmentName', label:'所属机构' },
  ];
  pageInfo = {
    pageNum: 1,
    pageSize: 100000,
    total: 1000,
    departmentId: '',
    globalSearch: '',
    sortBy: ''
  };
  cacheLeader;


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
        console.log(result.data)
        result.data.some((x, i) => {
          if(x.pids === '') {
            console.log(i);
            result.data[i].isRoot = true;
            return this.root = x;
          }
        });
        console.log(result.data);
        this.info.departmentName =this.root.departmentName;
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
        console.log(nodes);
        this.treeNode = nodes;
        
    }).catch(err => {
        console.log(err);
    });
  }




  // 表的数据的获取
  getlist(params){
     this.service.getData(params).then( result => {
       console.log('========================||||||||||||||||||');
       console.log(result);
       this.pageInfo.pageNum = result.data.pageNum;  //当前页
       this.pageInfo.pageSize = result.data.pageSize; //每页记录数
       this.pageInfo.total = result.data.total; //记录总数
       this.datas = result.data.list;
       this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE,CONFIG_LEADER]));
     }).catch(err => {
       console.log(err);
     });

  }

  /* 全局搜索 */

  searchFilter () {
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
      console.log(data)
        this.cacheLeader = data.empName;
        this.configDepartLeader({departmentId: this.cacheMemory, departmentLeader: message.data.id});
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



  /*
   * 通过组织机构id获取所属员工
   * */
  getStaffsByOrgId(orgId) {
    this.service.getStaffsByOrgId(orgId).then((result) => {this.tableSource = result.data});
  }


  /* 点击设置为负责人 */

  configDepartLeader(params) {
    this.service.configDepartLeader(params).then( result => {
      if(result.code == 0) {
        this.alertSuccess(result.message);
        this.getOrganizations();
        this.info.departmentLeader = this.cacheLeader;
      }
      else {
        this.alertError(result.message);
      }
    })
  }

  /* 重新渲染负责人 */


  /*
   * 组织树通知
   * */
  onNotify($event){
   
    if($event.eventName == "onFocus"){

      /* 获取组织的名称及其领导 */
      if($event.node.data.departmentId) {
        this.cacheMemory = $event.node.data.departmentId;
        this.service.getOrganizationsById($event.node.data.departmentId).then( result => {
          this.info.departmentName = result.data.departmentName;
          if(result.data.departmentLeader) {
            this.info.departLeaderId = result.data.departmentLeader;
          }
          else {
            this.info.departLeaderId = undefined;
          }
        }).catch( err => {
          console.log(err);
        });


        /* 获取右侧表格信息 */
        this.pageInfo.departmentId = $event.node.data.departmentId;
        this.service.getData(this.pageInfo).then( result => {
          this.tableSource = result.data.list;
          this.pageInfo.pageNum = result.data.pageNum;  //当前页
          this.pageInfo.pageSize = result.data.pageSize; //每页记录数
          this.pageInfo.total = result.data.total; //记录总数
          this.datas = result.data.list;
          this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE,CONFIG_LEADER]));
          this.tableSource = result.data.list;
        });

        if($event.node.data.departmentLeader) {
          console.log($event.node.data.departmentLeader);
          this.service.getStaffInfo($event.node.data.departmentLeader)
            .then( result => {
          
              console.log(result);
              if(result.data.sysEmployer && result.data.sysEmployer.empName) {
                this.info.departmentLeader = result.data.sysEmployer.empName;
              }
              else {
                this.info.departmentLeader = undefined;
              }
            });
        }
        else {
          this.info.departmentLeader = undefined;
        }

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
        console.log(result);
        this.alertSuccess(result.message);
        this.getOrganizations();
      }).catch(err => {
        console.log(err);
        this.alertError('请先删除子机构');
        this.getOrganizations();
      });
    }


    /* 新增组织结构 */
    if($event.eventName == TREE_EVENTS.onAddNewNode) {
      let orgModel = {
        departmentName: $event.node.data.name,
        name: $event.node.data.name,
        pid: $event.node.parent.data.departmentId,
        pids: ($event.node.parent.data.pids ? $event.node.parent.data.pids + ',' : '') + $event.node.parent.data.departmentId,
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
      console.log($event)
      this.info.departmentName = $event.node.data.name;
      this.info.departmentId = $event.node.data.departmentId;
      this.info.departmentLeader = $event.node.data.departmentLeader ? $event.node.data.departmentLeader : '';
      this.info.departLeaderId = $event.node.data.departLeaderId ? $event.node.data.departLeaderId : '';
      this.info.pid = $event.to.parent.data.departmentId;
      this.info.pids = $event.to.parent.data.pids + ',' + $event.to.parent.data.departmentId;
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
      this.info.departmentLeader = $event.node.data.departmentLeader ? $event.node.data.departmentLeader : '';
      this.info.departLeaderId = $event.node.data.departLeaderId ? $event.node.data.departLeaderId : '';
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
      }).catch( err => {
        console.log(err);
      });
    }
}



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


}

