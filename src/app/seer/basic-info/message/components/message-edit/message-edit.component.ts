import {Component,OnInit,TemplateRef} from '@angular/core';
import {Location} from '@angular/common';  //返回上一层
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../../message.service";
import {Message} from "../../../../model/auth/message-edit";
import {Result} from "../../../../model/result.class";
import {GlobalState} from "../../../../../global.state";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
@Component({
  selector: 'message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  basicTitle: string = "基本信息";
  sendTitle: string = "发送参数信息";
  title = '修改消息';
  template: Message = new Message();
  EVENT = 'openUserAddedDialog'
  hasGlobalFilter = true;
  source = [];
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
  titles = [
    {key:'name',label:'姓名'},
    {key:'realName',label:'真实姓名'},
    {key:'phone',label:'手机号'},
  ];
  // data:Array<any>
  constructor(private location: Location , private route: ActivatedRoute,private service: MessageService,private gs:GlobalState,private modalService: BsModalService){}

  ngOnInit() {
    this.getDatas();
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
  // ==============获取假数据===================
  getDatas(params?):void{
      this.service.getdialog()
      .then(res => {
        this.source = res.data;
    });
  }
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
  // =====================模态层==============================
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  }
