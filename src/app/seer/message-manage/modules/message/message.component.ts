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
    this.allTplsList();
  }
  // 重新获取列表（刚开始，改变）
  allTplsList():void{
      this.service.getDatas()
      .then(res => {
        this.source = res.data;
      });
  }
  constructor(protected service: MessageService, private _router: Router) {}
   onChange(message):void {
    // if(message.type=='add'){//新增
    //   this._router.navigate(['/seer/message-manage/message/add']);
    // }

    if(message.type=='update'){ //编辑
      this._router.navigate(['/seer/message-manage/message/edit',message.data.msgId]);
    }
    // 删除一条记录
    if(message.type=='delete'){
      alert(1);
      this.service.deleteMessage(message.data.tplId).then((data) => {
        alert(2);
        if ( data.success ){
          this.allTplsList();
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
        if ( data.success) {
          this.allTplsList();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
