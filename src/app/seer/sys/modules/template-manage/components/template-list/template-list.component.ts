import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Role} from "../../../../../model/auth/role";
import {TemplateManageService} from "../../template-manage.service";
import {Result} from "../../../resource-manage/result-model.class";
@Component({
  selector: 'print-list',
  templateUrl: './template-list.component.html',
  providers: [TemplateManageService],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateListComponent implements OnInit{

  title = '模板列表';

  data = [];

  titles = [
    {key:'templateName',label:'模板名称'},
    {key:'templateType',label:'模板类型',isDict:true},
    {key:'templateState',label:'模板状态',isDict:true},
    {key:'operateTime',label:'修改时间'},
    {key:'createTime',label:'创建时间'}
  ];

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.service.getTemplates().then((result) => {
      this.data = result.data;
    });
  }

  constructor(protected service: TemplateManageService, private _router: Router) {
  }

  onChange(message):void {

    if(message.type=='add'){
      this._router.navigate(['/seer/sys/template-manage/edit']);
    }

    if(message.type=='update'){
      this._router.navigate(['/seer/sys/template-manage/edit', message.data.id]);
    }

    if(message.type=='delete') {
        this.deleteTemplate(message.data.id);
    }

    if(message.type=='delete_all') {

    }
  }

  /**
   * 根据id删除模板
   * @returns {any}
   */
  deleteTemplate(templateId): void{
    this.service.deleteTemplate(templateId).then((result: Result) => {
      if (result.success) {
        this.getAllData();
      }else {
        alert(result.message);
      }
    });
  }
}
