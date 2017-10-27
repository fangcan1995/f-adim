import {Component, ViewEncapsulation} from "@angular/core";
import {messageRecordService} from "./message-record.service"
import {Router,ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../model/auth/message-template";
import * as _ from 'lodash';


@Component({
  selector: 'message-record',
  templateUrl: './message-record.component.html',
  providers: [messageRecordService],
  encapsulation: ViewEncapsulation.None
})


export class MessageRecordComponent {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'trueName',
      label: '会员姓名',
      type: 'input.text',
    },
    {
      key: 'userName',
      label: '会员账户',
      type: 'input.text',

    },
    {
      key: 'phoneNumber',
      label: '联系方式',
      type: 'input.text',
    },
    {
      key: 'msgType',
      label: '推送方式',
      type: 'select',
      isDict: true,
      category: 'MSG_TYPE'
    },
    {
      key: 'businessType',
      label: '消息类型',
      type: 'select',
      isDict: true,
      category: 'BUSINESS_TYPE'
    },
    {
      key:'sendNotify',
      label:'消息内容',
      type: 'input.text',
    },
    {
      key:'beginTime',
      label:'推送时间',
      type: 'datepicker',
    },
    {
      key:'endTime',
      label:'-',
      type: 'datepicker',
    },
    {
      key:'msgStatus',
      label:"推送结果",
      type: 'select',
      isDict: true,
      category: 'MSG_STATUS'
    }
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "query":{
      "globalSearch":"",
      "trueName":"",
      "userName":"",
      "businessType":"",
      "msgType":"",
      "sendMessage":"",
      "sendNotify":"",
      "beginTime":"",
      "endTime":"",
      "msgStatus":""
    },

  }; //分页、排序、检索
  title = '消息发送记录';
  source = [];
  titles = [
    {key:'trueName', label:'会员姓名'},
    {key:'userName', label:'会员账户'},
    {key:'phoneNumber', label:'联系方式'},
    {key:'msgType', label:'推送方式',isDict:true,category: 'MSG_TYPE'},
    {key:'businessType', label:'消息类型',isDict:true,category: 'BUSINESS_TYPE'},
    {key:'msgContent ', label:'消息内容'},
    {key:'sendMessage', label:'推送时间'},
    {key:'msgStatus', label:'推送结果',isDict:true,category: 'MSG_STATUS'},
  ];
  constructor(
    protected service: messageRecordService,
    private _router: Router,
    private _route: ActivatedRoute,

  ) {}
  ngOnInit() {
    this.getRecord();
  }
  getRecord():void{
    this.service.getList(this.pageInfo).then((res) => {
      console.log(res);
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
    });
  }
  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getRecord();
  }
  //全局搜索
  handleFiltersChanged($event) {
    let params=$event;
    //console.log(params);
    this.pageInfo.query = params;
    this.getRecord();
  }
}
