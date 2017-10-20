import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Router,ActivatedRoute} from "@angular/router";
import {Message} from "../../model/auth/message-edit";
import * as _ from 'lodash'
import {PREVIEW,UPDATE, DELETE} from "../../common/seer-table/seer-table.actions"
import {SeerDialogService} from "../../../theme/services/seer-dialog.service"
import {_if} from "rxjs/observable/if";

@Component({
  selector: 'message-rule',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'aaa',
      label: '用户姓名',
      type: 'input.text',
    },
    {
      key: 'bbb',
      label: '适配用户',
      type: 'select',
      options:[{value:'', content: '全部'},{value:'1', content: '前台用户'},{value:'2', content: '后台员工'}]
    },
    {
      key: 'ddd',
      label: '消息类型',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key: 'eee',
      label: '消息中心',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key: 'fff',
      label: '短信通知',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key:'ggg',
      label:'推送通知',
      type: 'select',
      options:[{value:'', content: '全部'}]
    },
    {
      key:'TimeStart',
      label:'下发时间',
      type: 'datepicker',
    },
    {
      key:'TimeEnd',
      label:'至',
      type: 'datepicker',
    },
    {
      key:'ggg',
      label:'消息简介',
      type: 'input.text',
    },
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-entryTime",
    "total":"",
    "query":{
      "aaa":"",
      "bbb":"",
      "ddd":"",
      "eee":"",
      "fff":"",
      "TimeStart":"",
      "TimeEnd":"",
      "ggg":""
    },

  }; //分页、排序、检索
  source = [];
  titles = [
    {key:'aaa',label:'消息名称'},
    {key:'bbb',label:'适配用户'},
    {key:'ccc',label:'消息类型'},
    {key:'ddd',label:'消息中心'},
    {key:'eee',label:'推送通知'},
    {key:'fff',label:'短信通知'},
    {key:'ggg',label:'消息简介'},
    {key:'hhh',label:'下发时间'},
    {key:'iii',label:'最后修改时间'},
    {key:'jjj',label:'最后修改人'},
  ];
  ngOnInit() {
    // 数据字典
    this.service.getDictTranslate().then((result)=>{
      console.log(result)
    })
    this.getList();
  }
  constructor(
    protected service: MessageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService
  ) {}
    getList():void{
      this.service.getDatas().then(res => {
        this.source = res.data.list;
        this.source = _.map(this.source, r => {
          let isPushed = r.isPushed;
          let actions;
          switch (isPushed) {
            case "1":
              actions = [PREVIEW, DELETE];
              break;
            case "0":
              actions = [PREVIEW, UPDATE, DELETE];
              break;
            default:
              actions = [PREVIEW];
              break;
          }
          return _.set(r, 'actions', actions)
        })
      });
  }
    onChange(message):void {
      const type = message.type;
      let data = message.data;
      console.log(type);
      switch (type) {
        case 'create':
          this._router.navigate([`edit`], {relativeTo: this._route});
          break;
        case 'preview':
          this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
          //this._router.navigate(['/basic-info/message/edit',message.data.Id]);
          break;
        case 'update':
          this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
          //this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
          break;
        case 'delete':
          this._dialogService.confirm('确定删除吗？')
            .subscribe(action => {
              if (action === 1) {
                if(message.data.isPushed=='0'){
                  //修改为不可见状态
                  let thisMessage=message.data;
                  thisMessage.isShow='0';
                  this.service.updateMessage((thisMessage)).then(data => {
                    this.getList();
                  })
                }else if(message.data.isPushed=='1'){
                  //删除
                  this.service.deleteMessage(message.data.id)
                    .then(data => {
                      this.getList();
                    });



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
  //多条件查询
  handleFiltersChanged($event) {
    let params=$event;
    this.pageInfo.query = params;
    this.getList();
  }
}

