import {Component, ViewEncapsulation,OnInit} from "@angular/core";
import {messageTplManageService} from "../../message-template.service"
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';
import {Result} from "../../../../../model/result.class";
import {Template} from "../../../../../model/auth/message-template";

@Component({
  selector: 'message-template-edit',
  templateUrl: './message-template-edit.component.html',
  providers: [messageTplManageService],
  encapsulation: ViewEncapsulation.None
})
export class MessageTemplateEditComponent implements OnInit {
  template: Template = new Template();
  title = '新增消息模板';
  constructor(private route: ActivatedRoute, private location: Location,private service: messageTplManageService){
  };
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      //若有id，证明是编辑角色
      if (params['id']) {
        this.service.getTemplateById(params['id']).then((result: Result) => {
          /*假数据*/
          result={"success":"true","message": "成功",
            data:{
              tplId: "02",
              tplName:"借款人借款标未满标，流标",
              tplCode:"FAILD_MARK",
              tplType:"2",
              tplTitle:"借款人借款标未满标，流标",
              tplContent:"【巴巴汇】客官，很遗憾，您的借款标（#subject_name ）未满标，现已流标，您可再次提交借款",
              tplBusiness:"11",
              tplisSystem:"1"
            }
          };
          /*/假数据*/
          if (result.success) {
            this.template = result.data;
            this.title = '修改消息模板';
          } else {
            alert(result.message);
          }
        });
      }
    });
  }
  save(canContinue: boolean = false): void {
    if (this.template.tplId) {
      //console.log(this.template);
      /*修改*/
      this.service.updateTemplate(this.template).then((result: Result) => {
          if (result.success) {
            alert(result.message);
            this.template = result.data;
            if (!canContinue) {
              this.goBack();
            }
          } else {
            alert(result.message);
          }
        })
      /**/
    } else {
      /*新增*/
      this.service.createTemplate(this.template).then((result: Result) => {
        if (result.success) {
          alert(result.message);
          this.template = result.data;
          if (!canContinue) {
            this.goBack();
          }
        } else {
          alert(result.message);
        }
      })
      /**/
    }
  };
  goBack(): void {
    this.location.back();
  }

}
