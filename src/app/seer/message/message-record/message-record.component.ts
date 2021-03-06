import {Component, ViewEncapsulation} from "@angular/core";
import {messageRecordService} from "./message-record.service"
import {Router,ActivatedRoute} from "@angular/router";
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import * as _ from 'lodash'
import {formatDate} from "ngx-bootstrap/bs-moment/format";
/*function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    let newMonth = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    let newStrDate = "0" + strDate;
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}*/
@Component({
  selector: 'message-record',
  templateUrl: './message-record.component.html',
  providers: [messageRecordService],
  encapsulation: ViewEncapsulation.None
})

export class MessageRecordComponent {
  hasGlobalFilter = true;
  isLoading:boolean = true;
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
      key:'msgContent',
      label:'消息内容',
      type: 'input.text',
    },
    {
      key: 'postTime',
      label: '推送时间',
      groups: [
        {
          type: 'datepicker',
          defaultValue:new Date(new Date().getTime() - 24*60*60*1000)
        },
        {
          type: 'datepicker',
          defaultValue:new Date()
        },
      ],
      groupSpaces: ['至']
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
    "sortBy":"-sendTime",
    "total":"",
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

  }; //分页、排序、检索
  title = '消息发送记录';
  titles = [
    {key:'trueName', label:'会员姓名',textAlign:'center'},
    {key:'userName', label:'会员账户',textAlign:'center'},
    {key:'phoneNumber', label:'联系方式',textAlign:'center'},
    {key:'msgType', label:'推送方式',isDict:true,category: 'MSG_TYPE'},
    {key:'businessType', label:'消息类型',isDict:true,category: 'BUSINESS_TYPE',textAlign:'center'},
    {key:'msgContent', label:'消息内容'},
    {key:'sendTime', label:'推送时间',type:'date-time',textAlign:'center'},
    {key:'msgStatus', label:'推送结果',isDict:true,category: 'MSG_STATUS',textAlign:'center'},
  ];
  source = [];
  constructor(
    protected service: messageRecordService,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService
  ) {}
  ngOnInit() {
    this.getRecord();
  }
  getRecord():void{
    this.service.getList(this.pageInfo).then((res) => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.isLoading = false;
      console.log('**********');
      console.log(res.data);
      console.log('**********');
    }).catch(err => {
      this.isLoading = false;
      this.showError(err.msg || '连接失败');
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
    let { postTime, ...otherParams } = params;
    let beginTime,
      endTime;
    if ( _.isArray(postTime)) {
      beginTime = postTime[0] ? (formatDate(postTime[0],'YYYY-MM-DD 00:00:00')) :'';
      endTime = postTime[1] ? (formatDate(postTime[1],'YYYY-MM-DD 23:59:59')) :'';
    }
    console.log('11111111111111111');
    console.log(postTime[0]);
    params = {
      ...otherParams,
      beginTime,
      endTime,
    }
    this.pageInfo = {
      ...this.pageInfo,
      ...params
    };
    this.getRecord();
  }
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}
