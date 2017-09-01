import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Router} from "@angular/router";
import {Message} from "../../../model/auth/message-edit";
// import {MessageAddComponent} from "./components/message-add/message-add.component";
@Component({
  selector: 'message-rule',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  hasGlobalFilter = true;
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
  public data = [];
  titles = [
    {key:'roleName',label:'接收账号'},
    {key:'validState',label:'接收号码/邮箱',isDict:true},
    {key:'operateTime',label:'标题'},
    {key:'operator',label:'消息类型'},
    {key:'createTime',label:'添加时间'},
    {key:'createUser',label:'发送账号'},
    {key:'sendStage',label:'发送状态'},
    {key:'sendDate',label:'发送时间'},
  ];
  public translate = [];
  ngOnInit() {
    // 数据字典
    this.service.getDictTranslate().then((result)=>{
      console.log(result)
    })

    this.getList();
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
    // if(message.type=='add'){//新增
    //   this._router.navigate(['/seer/message-manage/message/add']);
    // }

    if(message.type=='update'){ //编辑
      this._router.navigate(['/seer/message-manage/message/edit',message.data.msgId]);
    }
    // 删除一条记录
    if(message.type=='delete'){
      this.service.deleteMessage(message.data.tplId).then((data) => {
        if ( data.success ){
          this.getList();
        }else {
          alert("删除失败");
        }
      });
    }
    // 删除多条记录
    if(message.type=='delete_all') {
      let ids = [];
      message.data.map((template:Message)=>ids.push(template.tplId));
      this.service.deleteMessage(ids.toString()).then((data) => {
        if (data.success) {
          this.getList();
        }else {
          alert("删除失败");
        }
      });
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

