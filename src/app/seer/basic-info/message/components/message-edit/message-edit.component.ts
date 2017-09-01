import {Component,OnInit} from '@angular/core';
import {Location} from '@angular/common';  //返回上一层
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../../message.service";
import {Message} from "../../../../model/auth/message-edit";
import {Result} from "../../../../model/result.class";
@Component({
  selector: 'message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  title = '修改消息';
  template: Message = new Message();
  // data:Array<any>
  constructor(private location: Location , private route: ActivatedRoute,private service: MessageService,){}

  ngOnInit() {
    // ==================跳转后获取路由===========================
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.service.getRoleById(params['params']).then((result: Result) => {
      //  console.log(data)
      result = {
          'success': "true","message": "成功",
          'data':
            { tplId: "01",
              tplName:"小花",
              tplCode:"13520550355",
              tplType:"短信",
            }   
        }
       if (result.success) {
          this.template = result.data;
          this.title = '修改消息';
        } else {
          alert(result.message);
        }
      });    
    }
  )}
  // ============================返回上一层=======================
  goBack(): void {
    this.location.back();
  }
  // ============================保存============================
  save(canContinue: boolean = false): void {
    let resourceIds = [];
    if (this.template.tplId) {
      //console.log(this.template);
      /*修改*/
      this.service.updateMessage(this.template).then((result: Result) => {
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
      } 
    };
  }
