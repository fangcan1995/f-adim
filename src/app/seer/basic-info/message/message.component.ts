import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Router} from "@angular/router";
import {Message} from "../../model/auth/message-edit";
import * as _ from 'lodash'
import {UPDATE, DELETE} from "../../common/seer-table/seer-table.actions"
import {SeerDialogService} from "../../../theme/services/seer-dialog.service"

@Component({
  selector: 'message-rule',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  hasGlobalFilter = true;
  record = []
  source = [];
  datas = [];
  public data = [];
  sendTitles = [
    {key:'Name',label:'消息主题'},
    {key:'type',label:'消息类型'},
    {key:'Time',label:'发送时间'},
  ]
  titles = [
    {key:'roleName',label:'消息主题'},
    {key:'validState',label:'消息类型'},
    {key:'sendTime',label:'发送时间'},
    {key:'sendway',label:'发送状态'},
  ];
  public translate = [];

  ngOnInit() {
    // 数据字典
    this.service.getDictTranslate().then((result)=>{
      console.log(result)
    })

    this.getList();
    this.getDatas();
  }
  constructor(protected service: MessageService, private _router: Router,private _dialogService: SeerDialogService) {}
  // 重新获取列表（刚开始，改变时候刷新表格）
  getList(params?):void{
      this.service.getDatas()
      .then(res => {
        this.source = res.data;
      });
  }
   onChange(message):void {
    if(message.type=='create'){//新增
      this._router.navigate(['/basic-info/message/add']);
    }
  }

   getDatas(params?):void{
      this.service.getData()
      .then(res => {
        this.datas = res.data;
        this.datas = _.map(this.datas, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }
 onChange1(message):void {
    const type = message.type;
    let data = message.data;
     switch ( type ) {
      case 'create':
        this._router.navigate(['/basic-info/message/add']);
        break;
      case 'update':
        this._router.navigate(['/basic-info/message/edit',message.data.Id]);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          // .subscribe(action => {
          //   if ( action === 1 ) {
          //     this.service.deleteResource(message.data.menuId).then((data) => {
          //       if ( data.code=='0' ){
          //         this.getAllDate();
          //       }else {
          //         alert("删除失败");
          //       }
          //     });
          //   }
          // })
        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }



  // 重置按钮
   handleFiltersChanged($event) {
    let params = {
      ...$event,
    }
   this.getList(params) 
  } 
  // 查询按钮
  handleSearchBtnClicked($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }
}

