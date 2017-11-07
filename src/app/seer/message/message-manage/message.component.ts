import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash'
import {PREVIEW,UPDATE, DELETE} from "../../common/seer-table/seer-table.actions"
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  selector: 'message-rule',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'msgTitle',
      label: '消息名称',
      type: 'input.text',
    },
    {
      key: 'adaptationUser',
      label: '适配用户',
      type: 'select',
      isDict: true,
      category: 'ADAPTATION_USER'
    },
    {
      key: 'businessType',
      label: '消息类型',
      type: 'select',
      isDict: true,
      category: 'BUSINESS_TYPE'
    },
    {
      key: 'sendMail',
      label: '消息中心',
      type: 'select',
      isDict: true,
      category: 'SEND_MAIL'
    },
    {
      key: 'sendMessage',
      label: '短信通知',
      type: 'select',
      isDict: true,
      category: 'SEND_MESSAGE'
    },
    {
      key:'sendNotify',
      label:'推送通知',
      type: 'select',
      isDict: true,
      category: 'SEND_NOTIFY'
    },
    {
      key: 'postTime',
      label: '下发时间',
      groups: [
        {
          type: 'datepicker',
        },
        {
          type: 'datepicker',
        },
      ],
      groupSpaces: ['至']
    },
    {
      key:'msgProfile',
      label:'消息简介',
      type: 'input.text',
    },
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-createTime",
    "total":"",
    "query":{
      "globalSearch":"",
      "msgTitle":"",
      "adaptationUser":"",
      "sendMail":"",
      "sendNotify":"",
      "sendMessage":"",
      "beginTime":"",
      "endTime":"",
      "msgProfile":""
    },

  }; //分页、排序、检索
  source = [];
  titles = [
    {key:'msgTitle',label:'消息名称'},
    {key:'adaptationUser', label:'适配用户',isDict:true,category:"ADAPTATION_USER"},
    {key:'businessType',label:'消息类型',isDict:true,category:"BUSINESS_TYPE"},
    {key:'sendMail',label:'消息中心',isDict:true,category:"SEND_MAIL"},
    {key:'sendNotify',label:'推送通知',isDict:true,category:"SEND_NOTIFY"},
    {key:'sendMessage',label:'短信通知',isDict:true,category:"SEND_MESSAGE"},
    {key:'msgProfile',label:'消息简介'},
    {key:'expectSendTime',label:'下发时间',type:'date-time'},
    {key:'updateTime',label:'最后修改时间',type:'date-time'},
    {key:'updateUser',label:'最后修改人'},
  ];

  ngOnInit() {
    this.getList();
  }
  constructor(
    protected service: MessageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService
  ) {}
  //获取列表
  getList():void{
      this.service.getDatas(this.pageInfo).then(res => {
        this.pageInfo.pageNum=res.data.pageNum;  //当前页
        this.pageInfo.pageSize=res.data.pageSize; //每页记录数
        this.pageInfo.total=res.data.total; //记录总数
        this.source = res.data.list;
        this.source = _.map(this.source, r => {
          let timingStatus = r.timingStatus;
          let actions;
          switch (timingStatus) {
            case 1:
              actions = [PREVIEW, DELETE];             //即时消息
              break;
            case 3:
              actions = [PREVIEW, DELETE];            //定时消息并且已经发送
              break;
            case 2:
              actions = [PREVIEW, UPDATE, DELETE];   //未发信息可以修改
              break;
            default:
              actions = [PREVIEW];
              break;
          }
          return _.set(r, 'actions', actions)
        })
      }).catch(err => {
        this.showError(err.json().message || '连接失败');
      });
  }
  //
  onChange(message):void {
      const type = message.type;
      let data = message.data;
      switch (type) {
        case 'create':
          this._router.navigate([`add`], {relativeTo: this._route});
          break;
        case 'preview':
          this._router.navigate([`detail/${data.id}`], {relativeTo: this._route});
          break;
        case 'update':
          this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
          break;
        case 'delete':
          this._dialogService.confirm('确定删除吗？')
            .subscribe(action => {
              if (action === 1) {
                if(message.data.timingStatus =='2'){
                  //删除
                  this.service.deleteMessage(message.data.id)
                    .then((data:any) => {
                      this.showSuccess(data.message || '删除成功');
                      this.getList();
                    }).catch(err => {
                    this.showError(err.json().message || '删除失败');
                  });
                }else{
                  //修改为不可见状态
                  this.service.deleteLogicalMessage(message.data.id).then((data:any)  => {
                    this.showSuccess(data.message || '删除成功');
                    this.getList();
                  }).catch(err=>{
                    this.showError(err.json().message || '删除失败');
                    }
                  );

                };

              }
            });
          break;
        case 'delete_all':

      }
    }
  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }
  //全局搜索
  handleFiltersChanged($event) {
    let params=$event;
    let { postTime, ...otherParams } = params;
    let beginTime,
        endTime;
    if ( _.isArray(postTime)) {
      beginTime = postTime[0] ? (formatDate(postTime[0],'YYYY-MM-DD 00:00:00')) : null;
      endTime = postTime[1] ? (formatDate(postTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      beginTime,
      endTime,
    }
    //console.log(params);
    this.pageInfo.query = params;
    this.getList();
  }
/*  //多条件检索
  handleSearchBtnClicked($event) {
    //alert(2);
    let params=$event;
    console.log(params);
    /!*this.queryParams = $event;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };*!/
    this.getList();
  }*/
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

