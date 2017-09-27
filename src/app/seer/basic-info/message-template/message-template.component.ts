import {Component, ViewEncapsulation} from "@angular/core";
import {messageTplManageService} from "./message-template.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../model/auth/message-template";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service'
import {UPDATE, DELETE,CREATE} from "../../common/seer-table/seer-table.actions"
import * as _ from 'lodash';
@Component({
  selector: 'message-template',
  templateUrl: './message-template.Component.html',
  providers: [messageTplManageService],
  encapsulation: ViewEncapsulation.None
})
export class MessageTemplateComponent {
  hasGlobalFilter = true;
  // optionType=[{value:'', content: '请选择'}];
  // optionisSystem=[{value:'', content: '请选择'}];
  
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
     this.source = _.map(this.source, r => _.set(r, 'actions', [ UPDATE, CREATE,DELETE ]));
    });
  }
  onChange(message):void {
    const type = message.type;
    console.log(type);
    
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['/basic-info/message-template/add']);
        break;
      case 'update': 
        this._router.navigate(['/basic-info/message-template/edit',message.data.tplId])
        break;
      case 'delete':
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
