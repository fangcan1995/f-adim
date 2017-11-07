import {Component, ViewEncapsulation} from "@angular/core";
import {messageTplManageService} from "./message-template.service";
import {Router,ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../model/auth/message-template";
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import {UPDATE, DELETE,PREVIEW} from "../../common/seer-table/seer-table.actions"
import * as _ from 'lodash';
@Component({
  selector: 'message-template',
  templateUrl: './message-template.Component.html',
  providers: [messageTplManageService],
  encapsulation: ViewEncapsulation.None
})
export class MessageTemplateComponent {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'tempName',
      label: '模版名称',
      type: 'input.text',
    },
    {
      key: 'tempCode',
      label: 'KEY',
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
      key:'sendMail',
      label:'消息中心',
      type: 'select',
      isDict: true,
      category: 'SEND_MAIL'
    },
    {
      key:'tempTitle',
      label:'模版标题',
      type: 'input.text',
    },
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "query":{
      "globalSearch":"",
      "tempName":"",
      "tempCode":"",
      "adaptationUser":"",
      "businessType":"",
      "sendMessage":"",
      "sendNotify":"",
      "sendMail":"",
      "tempTitle":""
    },

  }; //分页、排序、检索
  title = '消息模板';
  source = [];
  data=[];
  titles = [
    {key:'tempName', label:'模板名称'},
    {key:'tempCode', label:'KEY'},
    {key:'adaptationUser', label:'适配用户',isDict:true,category:"ADAPTATION_USER"},
    {key:'businessType', label:'消息类型',isDict:true,category:"BUSINESS_TYPE"},
    {key:'tempTitle', label:'模板标题'},
    {key:'sendMail', label:'消息中心',isDict:true,category:"SEND_MAIL"},
    {key:'sendMessage', label:'短信通知',isDict:true,category:"SEND_MESSAGE"},
    {key:'sendNotify', label:'推送通知',isDict:true,category:"SEND_NOTIFY"},
    {key:'updateTime', label:'最后修改时间',type:'date-time'},
    {key:'updateUser', label:'最后修改人'},
  ];
  //tplTypeOptions={};

  ngOnInit() {
    //获取数据字典内容
    // this.service.getDictByKey('MESSAGE_TEMPLATE_TYPE').then((result) => {
    //   if (result.success) {
    //     result.data.sort((a,b)=>+a.dictSort-+b.dictSort).forEach(dict=>{
    //       this.optionType.push({ value:dict.dictValueId,content:dict.dictValueName});
    //     });
    //   }
    // });
    // this.service.getDictByKey('IS_SYSMESSAGETEMPLATE').then((result) => {
    //     if (result.success) {
    //       result.data.sort((a, b) => +a.dictSort - +b.dictSort).forEach(dict => {
    //         this.optionisSystem.push({value: dict.dictValueId, content: dict.dictValueName});
    //       });
    //   };
    // });

    this.allTplsList();
  }
  constructor(
    protected service: messageTplManageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    private _messageService: SeerMessageService
  ) {}
  /*获取列表*/
  allTplsList():void{
    this.service.getTpls(this.pageInfo).then((res) => {
      //console.log(res);
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, r => _.set(r, 'actions', [ PREVIEW,UPDATE, DELETE ]));
    }).catch(err => {
      this.showError(err.json().message || '连接失败');
    });
  }
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
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
            if ( action === 1 ) {
              this.service.deleteTemplate(message.data.id)
                .then((data:any) => {
                  this.showSuccess(data.message || '删除成功');
                  this.allTplsList();
                }).catch(err => {
                this.showError(err.json().message || '删除失败');
              });
            }
          })

        break;
      case 'delete_all':

    }
  }
  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.allTplsList();
  }
  //全局搜索
  handleFiltersChanged($event) {
    let params=$event;
    this.pageInfo.query = params;
    this.allTplsList();
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
