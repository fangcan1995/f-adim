import {Component, Renderer} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { StaffService } from "./staff.service";

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],

})
export class StaffComponent {
  // 控件设置
  hasGlobalFilter = true;
  filters = [
    {
      key: 'staffDtoName',
      label: '姓名',
      type: 'input.text',
    },
    {
      key: 'staffDtoNo',
      label: '员工编号',
      type: 'input.text',
    },
    {
      key: 'orgName',
      label: '公司团队',
      type: 'select',
    },
    {
      key: 'inviteNum1',
      label: '邀请人数',
      type: 'input.text',
    },
    {
      key: 'inviteNum2',
      label: '-',
      type: 'input.text',
    },
    {
      key:'staffPosition',
      label:'职位',
      type: 'input.text',
    },
    {
      key:'staffState',
      label:'员工状态',
      type: 'select',
      options:[{value:'', content: '请选择'}]
    },
    {
      key:'staffEntryDate',
      label:'入职时间',
      type: 'input.date',
    },
    {
      key:'staffEntryDate',
      label:'至',
      type: 'input.date',
    },
  ];
  titles = [
    {
      key:'staffName',
      label:'姓名',
    },
    {
      key:'staffNo',
      label:'员工编号',
    },
    {
      key:'orgName',
      label:'分公司',
    },
    {
      key:'staffTeam',
      label:'团队',
    },
    {
      key:'staffPosition',
      label:'职位',
    },
    {
      key:'staffEntryDate',
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
  actionSet={
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
    }
  };
  staffs = [];// 数据
  errorMessage;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private staffManageService: StaffService,
    ){
  }

  ngOnInit() {
    this.getStaffs();
  }

  //获取列表
  getStaffs(): void {
    this.staffManageService.getLists()
      .subscribe(
        res => {
          this.staffs = res.data;
          this.staffs = _.map(this.staffs, t =>{
            let actions;
            actions = [this.actionSet.update, this.actionSet.delete];
            return _.set(t, 'actions', actions);
          })
        },
        error =>  this.errorMessage = <any>error);
  }
  //增删改
  onChange(message):void {
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
      this.staffManageService.deleteOne(message.data.id)
        .subscribe(
          res => {
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }
    if(message.type=='delete_all'){
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });

    }
  }



}

