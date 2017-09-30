import {Component, Renderer} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { StaffService } from "./staff.service";
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service"
@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],

})
export class StaffComponent {
  // 控件设置
  hasGlobalFilter = true;
  filters = [
    {
      key: 'empName',
      label: '姓名',
      type: 'input.text',
    },
    {
      key: 'emCode',
      label: '员工编号',
      type: 'input.text',
    },
    {
      key: 'departmentName',
      label: '公司团队',
      type: 'select',
    },
    {
      key: 'inviteNumStart',
      label: '邀请人数',
      type: 'input.text',
    },
    {
      key: 'inviteNumEnd',
      label: '-',
      type: 'input.text',
    },
    {
      key:'position',
      label:'职位',
      type: 'input.text',
    },
    {
      key:'empState',
      label:'员工状态',
      type: 'select',
      options:[{value:'', content: '请选择'}]
    },
    {
      key:'entryTimeStart',
      label:'入职时间',
      type: 'input.date',
    },
    {
      key:'entryTimeEnd',
      label:'至',
      type: 'input.date',
    },
  ];
  titles = [
    {
      key:'empName',
      label:'姓名',
    },
    {
      key:'emCode',
      label:'员工编号',
    },
    {
      key:'pDepartmentName',
      label:'分公司',
    },
    {
      key:'departmentName',
      label:'团队',
    },
    {
      key:'position',
      label:'职位',
    },
    {
      key:'entryTime',
      label:'入职时间',
      type: 'date',
    },
    {
      key:'inviteNum',
      label:'邀请人数',
    },
    {
      key:'loginNum',
      label:'登录次数',
    },
    {
      key:'lastLoginTime',
      label:'最后登录时间',
    },
    {
      key:'lastLoginIP',
      label:'最后登录IP',
    }
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-entryTime",
    "total":"",
    "query":{
      "globalSearch":"",
      "empName":"",
      "emCode":"",
      "departmentName":"",
      "inviteNumStart":"",
      "inviteNumEnd":"",
      "position":"",
      "empState":"",
      "entryTimeStart":"",
      "entryTimeEnd":""
    },

  }; //分页、排序、检索
  staffs = [];// 数据
  errorMessage;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private staffManageService: StaffService,
    private _dialogService: SeerDialogService
    ){
  }
  ngOnInit() {
    this.getStaffs();
  }
  //获取列表
  getStaffs(): void {
    this.staffManageService.getLists(this.pageInfo).then(
        res => {
          this.pageInfo.pageNum=res.data.pageNum;  //当前页
          this.pageInfo.pageSize=res.data.pageSize; //每页记录数
          this.pageInfo.total=res.data.total; //记录总数
          this.staffs = res.data.list;
          this.staffs = _.map(this.staffs, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
        },
        error =>  this.errorMessage = <any>error);
  }
  //增删改
  onChange(message):void {
      console.log(message);
    let type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._route});
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;
    }
    if(message.type=='delete'){
      this._dialogService.confirm('确定删除吗？')
        .subscribe(action => {
          if ( action === 1 ) {
            this.staffManageService.deleteOne(data.id).then((data) => {
              if ( data.code=='0' ){
                this.getStaffs();
              }else {
                alert("删除失败");
              }
            });
          }
        })
    }
    /*if(message.type=='delete_all'){
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
    }*/
  }

  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getStaffs();
  }//分页
  handleFiltersChanged($event) {
    let params=$event;
    this.pageInfo.query = params;
    //console.log(params);
    this.getStaffs();
  }//多条件查询

}

