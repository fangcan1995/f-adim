import {Component, ViewEncapsulation} from "@angular/core";
import {messageTplManageService} from "./message-template.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../model/auth/message-template";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service'
import * as _ from 'lodash';
@Component({
  selector: 'message-template',
  templateUrl: './message-template.Component.html',
  providers: [messageTplManageService],
  encapsulation: ViewEncapsulation.None
})
export class MessageTemplateComponent {
  hasGlobalFilter = true;
  optionType=[{value:'', content: '请选择'}];
  optionisSystem=[{value:'', content: '请选择'}];
  actionSet = {
    'update': {
      'type': 'update',
      'name': '修改',
      // 'icon': 'ion-close-round',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      // 'icon': 'ion-close-round',
      // 'action': 'remove'
    },
    'start': {
      'type': 'start',
      'name': '启用',
      'className': 'btn btn-xs btn-info',
      // 'icon': 'ion-close-round',
      // 'action': 'remove'
    },
  }
  filters = [
    {
      key: 'tplName',
      label: '模板名称',
      type: 'input.text',
    },
    {
      key: 'tplCode',
      label: '模板类型',
      type: 'input.text',
    },
    {
      key: 'tplType',
      label: '消息模板类型',
      type: 'select',
      options: this.optionType
    },
    {
      key: 'tplisSystem',
      label: '是否系统模板',
      type: 'select',
      options: this.optionisSystem
    },
  ]
  title = '消息模板';
  source = [];
  data=[];
  titles = [
    {key:'tplName', label:'模板名称'},
    {key:'tplType', label:'业务类型'},
    {key:'tplContent', label:'模板内容'},
  ];
  //tplTypeOptions={};

  ngOnInit() {
    //获取数据字典内容
    this.service.getDictByKey('MESSAGE_TEMPLATE_TYPE').then((result) => {
      if (result.success) {
        result.data.sort((a,b)=>+a.dictSort-+b.dictSort).forEach(dict=>{
          this.optionType.push({ value:dict.dictValueId,content:dict.dictValueName});
        });
      }
    });
    this.service.getDictByKey('IS_SYSMESSAGETEMPLATE').then((result) => {
        if (result.success) {
          result.data.sort((a, b) => +a.dictSort - +b.dictSort).forEach(dict => {
            this.optionisSystem.push({value: dict.dictValueId, content: dict.dictValueName});
          });
      };
    });

    this.allTplsList();
  }
  constructor(protected service: messageTplManageService, private _router: Router, private _dialogService: SeerDialogService,) {}
  /*获取列表*/
  allTplsList():void{
    this.service.getTpls().then((data) => {
      /*假数据*/
      data={
        "data":[
          {"tplId":1,"tplName":"xxx","tplContent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","tplType":"贷款"},
          {"tplId":2,"tplName":"xxx","tplContent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","tplType":"投资"},
          {"tplId":3,"tplName":"xxx","tplContent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","tplType":"活动"},
          {"tplId":4,"tplName":"xxx","tplContent":"【巴巴汇】客官，您的借款申请已提交成功，请耐心等待审核呦~客服电话：400-024-0909","tplType":"贷款"},
        ],"success":"true","message": "成功"};
      /*假数据*/
      this.data = data.data;
      this.source = data.data;
       // 数据请求过来后 进行按钮添加
      this.source = _.map(this.source, t => {
        let actions;
        actions = [this.actionSet.update,this.actionSet.start,this.actionSet.delete]
        return _.set(t, 'actions', actions)
      })
    });
  }
  onChange(message):void {
    /*增加一条记录*/
    // if(message.type == 'add'){
    //   this._router.navigate(['/basic-info/message-template/add']);
    // }
    // /*修改*/
    // if(message.type == 'update'){
    //   this._router.navigate(['/basic-info/message-template/edit',message.data.tplId]);
    // }
    // /*删除一条记录*/
    // if(message.type=='delete'){
    //   this.service.deleteTemplate(message.data.tplId).then((data) => {
    //     if ( data.success ){
    //       this.allTplsList();
    //     }else {
    //       alert("删除失败");
    //     }
    //   });
    // }
    // /*删除多条记录*/
    // if(message.type=='delete_all') {
    //   let ids = [];
    //   message.data.map((template:Template)=>ids.push(template.tplId));
    //   this.service.deleteTemplate(ids.toString()).then((data) => {
    //     if ( data.success) {
    //       this.allTplsList();
    //     }else {
    //       alert("删除失败");
    //     }
    //   });
    // }

    const type = message.type;
    console.log(type);
    
    let data = message.data;
    switch ( type ) {
      case 'add':
        this._router.navigate(['/basic-info/message-template/add']);
        break;
      case 'update': 
        this._router.navigate(['/basic-info/message-template/edit',message.data.tplId])
        break;
      case 'delete':
      console.log("1111111");
      
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              // this.service.deleteOne(message.data.id)
              //   .subscribe(data => {
              //     this.getList();
              // });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }
}
