
import { Router } from "@angular/router";
import {Component, ViewChild, OnDestroy} from "@angular/core";
// OrgManageService
import {GlobalState} from "../../../global.state";
import {jsonTree} from "../../..//theme/utils/json-tree";
import {TREE_PERMISSIONS} from "../../../theme/modules/seer-tree/constants/permissions";
import {TREE_EVENTS} from "../../../theme/modules/seer-tree/constants/events";
import {SeerTree} from "../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import {infoModle} from "./infoModle";
/*import any = jasmine.any;*/
import {DynamicComponentLoader} from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { InfoPublishService } from "./info-publish.service";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service'
import * as _ from 'lodash';
@Component({
  templateUrl: './info-publish.component.html',
  styleUrls: ['./info-publish.component.scss'],
})
export class InfoPublishComponent {
  title = "栏目列表"
  tableTitle: string = "文章列表";
  hasGlobalFilter = true;
  optionType=[{value:'', content: '请选择'}];
  optionisSystem=[{value:'', content: '请选择'}];
  source = [];
  data=[];
  titles = [
    {key:'roleName',label:'栏目'},
    {key:'validState',label:'文章标题',isDict:true},
    {key:'operateTime',label:'发布者'},
    {key:'createTime',label:'更新时间'},
    {key:'sendStage',label:'状态'},
    {key:'number',label:'浏览次数'},
  ];
  filters = [
    {
      key: 'tplName',
      label: '栏目',
      type: 'input.text',
    },
    {
      key: 'tplCode',
      label: '标题',
      type: 'input.text',
    },
    
  ]
  // 操作按钮
  actionSet = {
    'update': {
      'type': 'update',
      'name': '修改',
      // 'icon': 'ion-close-round',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }
   //组织树
  treePermissions = TREE_PERMISSIONS.NOTIFY|TREE_PERMISSIONS.ADD|TREE_PERMISSIONS.EDIT|TREE_PERMISSIONS.DELETE|TREE_PERMISSIONS.DRAG|TREE_PERMISSIONS.SHOW_FILTER|TREE_PERMISSIONS.SHOW_ADD_ROOT;
  treeNode = [];


  //员工列表
  tableSource = [];

  staffId: string;

  constructor(protected service: InfoPublishService, private _dialogService: SeerDialogService, private _router: Router, private _state: GlobalState) {
    this._state.subscribe("orgStaffState",(a)=>{
      this.getStaffsByOrgId(this.staffId);
    })
  }

  ngOnInit() {
    // 初始化树形结构
    this.getOrganizations();
    // 获取右侧表格数据
    this.getList();
  }

  // 重新获取列表（刚开始，改变时候刷新表格）
  getList(params?):void{
    this.service.getDatas()
    .then(res => {
      this.source = res.data;
      
      // 数据请求过来后 进行按钮添加
      this.source = _.map(this.source, t => {
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete]
        return _.set(t, 'actions', actions)
      })
    });
  }

  ngOnDestroy(): void {
    this._state.unsubscribe("orgStaffState");
  }
  // 按钮跳转路由事件
  onChange(message):void {
    const type = message.type;
    console.log(type);
    
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['/content/info-publish/add']);
        break;
      case 'update': 
        this._router.navigate(['/content/info-publish/edit',message.data.msgId])
        break;
      case 'delete':
      console.log("1111111");
      
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

    // /* 根据组织机构查询人员*/
    // if ($event.eventName==TREE_EVENTS.onActivate){
    //   //$event.node.setIsExpanded(true)
    //   this.staffId = $event.node.id;
    //   this.getStaffsByOrgId($event.node.id);
    // }

    // /* 删除组织机构*/
    // if ($event.eventName==TREE_EVENTS.onDeleteNode){
    //   this.service.delOrganization($event.node.id);
    // }

    // /* 新增组织机构*/
    // if ($event.eventName==TREE_EVENTS.onAddNewNode){
    //   console.log($event.node);
    //   let orgModel = new infoModle();
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

    // /* 移动组织机构*/
    // if ($event.eventName==TREE_EVENTS.onMoveNode){
    //   console.log($event.node);
    //   let orgModel = new infoModle();
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

    // /* 组织机构重命名*/
    // if ($event.eventName==TREE_EVENTS.onRenameNode){
    //   let orgModel = new infoModle();
    //   orgModel.id = $event.node.id;
    //   orgModel.orgName = $event.node.data.name;
    //   this.service.editOrganization(orgModel).then((result) => {
    //     if(!result.success) {
    //       alert("操作失败，请重试！");
    //     }
    //   });
    // }

  }
}
