import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import { TargetService } from "./target.service";
import {UPDATE, DELETE} from "../../common/seer-table/seer-table.actions"
@Component({
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent {
  constructor( private service: TargetService) {}
  hasGlobalFilter = true;
  source = [];
  filters = [
   {
      key: 'userName',
      label: '用户姓名',
      type: 'input.text',
    },
     {
      key: 'tel',
    label: '手机号码',
      type: 'input.text',
    },
    {
      key: 'type',
      label: '借款方式',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '0',
          content: '汇车贷'
        },
        {
          value: '1',
          content: '汇房贷',
        },
        {
          value: '2',
          content: '信用贷',
        },
      ]
    },
    {
      key: 'time',
      label: '借款期限',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '0',
          content: '三个月'
        },
        {
          value: '1',
          content: '六个月',
        },
        {
          value: '2',
          content: '一年',
        },
      ]
    },
    {
      key: 'state',
      label: '项目状态',
      type: 'select',
      options: [
        {
          content: '全部'
        },
        {
          value: '0',
          content: '待标的发布'
        },
        {
          value: '1',
          content: '投资中',
        },
        {
          value: '2',
          content: '待满标审核',
        },
        {
          value: '3',
          content: '流标',
        },
        {
          value: '4',
          content: '待标的发布',
        },
      ]
    },
    {
      key: 'time',
      label: '发布时间',
      type: 'input.date',
    },
  ]
  titles = [
    {key:'number',label:'编号'},
    {key:'pNumber',label:'项目编号'},
    {key:'userName',label:'用户姓名'},
    {key:'telPhone',label:'手机号码'},
    {key:'type',label:'借款类型'},
    {key:'money',label:'借款金额'},
    {key:'date',label:'借款期限'},
    {key:'time',label:'申请时间'},
    {key:'state',label:'项目状态'},
  ];
 
  ngOnInit() {
    this.getList();
  }
   getList(params?):void{
      this.service.getDatas()
      .then(res => {
        this.source = res.data;
        this.source = _.map(this.source, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
      });
  }

 
}

