import {Component, ViewEncapsulation} from "@angular/core";
import {messageTplManageService} from "./message-template.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Template} from "../../../model/auth/message-template";

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
    {key:'account', label:'序号'},
    {key:'tplName', label:'模板名称'},
    {key:'tplCode', label:'模板编码'},
    {key:'tplType', label:'模板类型'},
    {key:'tplDeclaration', label:'参数说明'},
    {key:'tplContent', label:'模板内容'},
    {key:'tplisSystem', label:'系统模板'}
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
  constructor(protected service: messageTplManageService, private _router: Router) {}
  /*获取列表*/
  allTplsList():void{
    this.service.getTpls().then((data) => {
      /*假数据*/
      data={
        "data":[
          {"tplId":1,"account":"1","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":2,"account":"2","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":3,"account":"3","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":4,"account":"4","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":5,"account":"5","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":6,"account":"6","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":7,"account":"7","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":8,"account":"8","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":9,"account":"9","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":10,"account":"10","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":11,"account":"11","tplName":"借款人借款标未满标，流标","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"},
          {"tplId":12,"account":"12","tplName":"注册验证码","tplCode":"FAILD_MARK","tplType":"短信", "tplDeclaration":"参数说明1","tplContent":"模板内容2","tplisSystem":"是"}
        ],"success":"true","message": "成功"};
      /*假数据*/
      this.data = data.data;
      this.source = data.data;
    });
  }
  onChange(message):void {
    /*增加一条记录*/
    if(message.type == 'add'){
      this._router.navigate(['/seer/message-manage/message-template/add']);
    }
    /*修改*/
    if(message.type == 'update'){
      this._router.navigate(['/seer/message-manage/message-template/edit',message.data.tplId]);
    }
    /*删除一条记录*/
    if(message.type=='delete'){
      this.service.deleteTemplate(message.data.tplId).then((data) => {
        if ( data.success ){
          this.allTplsList();
        }else {
          alert("删除失败");
        }
      });
    }
    /*删除多条记录*/
    if(message.type=='delete_all') {
      let ids = [];
      message.data.map((template:Template)=>ids.push(template.tplId));
      this.service.deleteTemplate(ids.toString()).then((data) => {
        if ( data.success) {
          this.allTplsList();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
