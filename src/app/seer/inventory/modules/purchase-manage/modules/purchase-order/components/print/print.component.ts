import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';
import {TemplateManageService} from "../../../../../../../sys/modules/template-manage/template-manage.service";
import {TemplateVO} from "../../../../../../../sys/modules/template-manage/components/edit-template/TemplateVO";
import {Result} from "../../../../../../../sys/modules/resource-manage/result-model.class";
@Component({
  selector: 'edit-template',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
  providers: [TemplateManageService],
  encapsulation: ViewEncapsulation.None,
})
export class PrintComponent implements OnInit{

  title = '打印预览';

  template :TemplateVO = new TemplateVO();

  isEdit : boolean = false;

  loadComplete = false;

  ngOnInit() {
    setTimeout(()=>{
      this.route.params.subscribe((params: Params) => {
        //若有id，证明是编辑模板
        if (params['id']) {
          this.getTemplateById(params['id']);
          console.log(this.template);
        }
        else {
          this.loadComplete = true;
        }
      });
    },0)
  }

  constructor(private route: ActivatedRoute, private location: Location,protected service: TemplateManageService) {}

  /**
   * 新增模板
   * @returns {any}
   */
  save():void {

    if(this.isEdit) {
      this.service.updateTemplate(this.template).then((result: Result) => {
        if (result.success) {
          this.goBack();
        }else {
          alert(result.message);
        }
      });
    }else {
      this.service.createTemplate(this.template).then((result: Result) => {
        if (result.success) {
          this.goBack();
        }else {
          alert(result.message);
        }
      });
    }
  }

  /**
   * 根据id获取模板
   * @returns {any}
   */
  getTemplateById(templateId): void{
    this.service.getTemplateById(templateId).then((result: Result) => {
      if (result.success) {
        this.template = result.data;
        this.isEdit = true;
        this.loadComplete = true;
      }else {
        alert(result.message);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
