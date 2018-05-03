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

  isLoading:boolean = true;
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
    { key:'position', label:'员工职务' },
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
            result.data[i].isRoot = true;
            return this.root = x;
          }
        });
        // this.info.departmentName =this.root.departmentName;
        // this.info.departmentLeader = this.root.empName
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
        this.alertError(err.msg)
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
      //  this.datas = _.map(this.datas, r => _.set(r, 'actions', [UPDATE,DELETE,CONFIG_LEADER]));
       this.isLoading = false;
     }).catch(err => {
       this.isLoading = false;
       console.log(err);
       this.alertError(err.msg)
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
        this._dialogService.confirm('确定要把该员工从该机构移除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteOne(message.data.id).then( result => {
                if(result.code == 0) {
                  this.alertSuccess(result.message);
                  this.getOrganizations();
                  this.info.departmentName='',
                  this.info.departmentLeader=''
                  // this.getlist(this.pageInfo);
                }
                else {
                  this.alertError(result.message);
                }
                this.getlist(this.pageInfo);
              });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
      case 'exchange_department':
        let {datas,...rest}=data
        console.log(data)
        console.log(rest)
        console.log(datas)
        let exids = _(datas).map(t => t.id).value();
        console.log(exids)
        let batchStaffs=exids.join(',')
        console.log(batchStaffs)
        this.putDepartment(rest.departmentId,batchStaffs)
        break;
      case 'put_leader':
        let empId = _(data).map(t => t.id).value();
        console.log(empId)
        if(empId.length>1){
          return this.alertError('每个部门只能设置一个人为部门负责人')
        }
        this.cacheLeader = data[0].empName;
        empId=empId[0]
        this.configDepartLeader({departmentId: this.cacheMemory, departmentLeader: empId});
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
   * 批量调换员工部门
   * */
  putDepartment(id,ids) {
    this.service.putDepartment(id,ids).then((result) =>{
      if(result.code == 0) {
          console.log(result)
          // this.getOrganizations();
          // this.info.departmentName='',
          this.info.departmentLeader=''
          this.alertSuccess(result.message);
          this.getlist(this.pageInfo);
          // this.ngOnInit()
        }
        else {
          this.alertError(result.message);
        }
      });
  }

  /* 点击设置为负责人 */

  configDepartLeader(params) {
    this.service.configDepartLeader(params).then( result => {
      if(result.code == 0) {
        console.log(result)
        this.alertSuccess(result.message);
        this.info.departmentLeader = this.cacheLeader;
        // this.getOrganizations();
        // this.ngOnInit()
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
      this.getOrganizations();
      /* 获取组织的名称及其领导 */
      if($event.node.data.departmentId) {
        console.log($event.node.data)
        this.cacheMemory = $event.node.data.departmentId;
        // this.service.getOrganizationsById($event.node.data.departmentId).then( result => {
        //   console.log(result)
        //   this.info.departmentName = result.data.departmentName;
        //   if(result.data.empName) {
        //     this.info.departmentLeader = result.data.empName;
        //   }
        //   else {
        //     this.info.departmentLeader = undefined;
        //   }
        // }).catch( err => {
        //   console.log(err);
        //   this.alertError(err.msg)
        // });
        this.info.departmentName=$event.node.data.departmentName
        if($event.node.data.empName){
          this.info.departmentLeader=$event.node.data.empName
        }else{
          this.info.departmentLeader=''
        }

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

        // if($event.node.data.departmentLeader) {
        //   console.log($event.node.data.departmentLeader);
        //   this.service.getStaffInfo($event.node.data.departmentLeader)
        //     .then( result => {
          
        //       console.log(result);
        //       if(result.data.sysEmployer && result.data.sysEmployer.empName) {
        //         this.info.departmentLeader = result.data.sysEmployer.empName;
        //       }
        //       else {
        //         this.info.departmentLeader = undefined;
        //       }
        //     });
        // }
        // else {
        //   this.info.departmentLeader = undefined;
        // }

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
      console.log(this.info)
      if(!($event.to.parent.data.departmentId == $event.node.data.departmentId)){
        const pids= $event.to.parent.data.pids.split(',')
          pids.some(x=>{
            if(x==$event.node.data.departmentId){
              this.getOrganizations();
              return this.alertError('不能移动到自己子的机构中')
            }
          })
          
          this.info.departmentName = $event.node.data.name;
          this.info.departmentId = $event.node.data.departmentId;
          this.info.departmentLeader = $event.node.data.departmentLeader ? $event.node.data.departmentLeader : '';
          this.info.departLeaderId = $event.node.data.departLeaderId ? $event.node.data.departLeaderId : '';
          this.info.pid = $event.to.parent.data.departmentId;
          this.info.pids = $event.to.parent.data.pids + ',' + $event.to.parent.data.departmentId;
      }
      else{
        this.getOrganizations();
        return this.alertError('不能移动到自身上')
      }
      console.log(22222) 
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

