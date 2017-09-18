import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Router} from "@angular/router";
import {Message} from "../../model/auth/message-edit";
import * as _ from 'lodash'
// import {MessageAddComponent} from "./components/message-add/message-add.component";
@Component({
  selector: 'message-rule',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  hasGlobalFilter = true;
  record = []
  filters = [
    {
      key: 'name',
      label: '接收账号',
      type: 'input.text',
    },
    {
      key: 'real_name',
      label: '接收号码',
      type: 'input.text',
    },
    {
      key: 'gender',
      label: '消息类型',
      type: 'select',
      options: [
        {
          content: '请选择'
        },
        {
          value: '0',
          content: '短信'
        },
        {
          value: '1',
          content: '电话',
        }
      ]
    },
    {
      key: 'mobile',
      label: '发送状态',
      type: 'select',
       options: [
        {
          content: '请选择'
        },
        {
          value: '0',
          content: '已发'
        },
        {
          value: '1',
          content: '未发',
        }
      ]
    },
  ]
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
  actionSet = {
    'update': {
      'type': 'update',
      'name': '修改',
      // 'icon': 'ion-close-round',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '启用',
      'className': 'btn btn-xs btn-info',
      // 'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }
  ngOnInit() {
    // 数据字典
    this.service.getDictTranslate().then((result)=>{
      console.log(result)
    })

    this.getList();
    this.getDatas();
  }
  constructor(protected service: MessageService, private _router: Router) {}
  // 重新获取列表（刚开始，改变时候刷新表格）
  getList(params?):void{
      this.service.getDatas()
      .then(res => {
        this.source = res.data;
      });
  }
   onChange(message):void {
    if(message.type=='add'){//新增
      this._router.navigate(['/basic-info/message/add']);
    }
  }

   getDatas(params?):void{
      this.service.getData()
      .then(res => {
        this.datas = res.data;
        this.record = _.map(this.datas, t => {
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete]
        return _.set(t, 'actions', actions)
      })
    });
  }
 onChange1(message):void {
    if(message.type=='add'){//新增
      this._router.navigate(['/basic-info/message/add']);
    }

    if(message.type=='update'){ //编辑
      this._router.navigate(['/basic-info/message/edit',message.data.Id]);
    }
    // // 删除一条记录
    // if(message.type=='delete'){
    //   this.service.deleteMessage(message.data.tplId).then((data) => {
    //     if ( data.success ){
    //       this.getList();
    //     }else {
    //       alert("删除失败");
    //     }
    //   });
    // }
    // // 删除多条记录
    // if(message.type=='delete_all') {
    //   let ids = [];
    //   message.data.map((template:Message)=>ids.push(template.tplId));
    //   this.service.deleteMessage(ids.toString()).then((data) => {
    //     if (data.success) {
    //       this.getList();
    //     }else {
    //       alert("删除失败");
    //     }
    //   });
    // }
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

