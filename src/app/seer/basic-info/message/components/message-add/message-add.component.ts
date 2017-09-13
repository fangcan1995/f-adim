import {Component,OnInit,ViewChild,TemplateRef} from '@angular/core';
import {Location} from '@angular/common';  //返回上一层
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../../message.service";
import {Message} from "../../../../model/auth/message-edit";
import {Result} from "../../../../model/result.class";
import {DynamicComponentLoader,DynamicComponentParam} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { GlobalState } from "../../../../../global.state";
import { MessageAddedDialogComponent } from "../message-added-dialog/message-added-dialog.component";
import { MessageEditDialogComponent } from "../message-edit-dialog/message-edit-dialog.component";
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';



@Component({
  selector: 'message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.css'],
})
export class MessageAddComponent {
  basicTitle: string = "基本信息";
  sendTitle: string = "发送参数信息";
  title = '修改消息';
  EVENT = 'openUserAddedDialog';
  SAVEEVENT = 'saveSysUser';
  EDITEVENT = 'editSysUser';
   @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;
  template: Message = new Message();
  hasGlobalFilter = true;
  record = []
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
    {key:'name',label:'用户名'},
    {key:'realName',label:'真实姓名'},
    {key:'phone',label:'手机号'},
    {key:'idCard',label:'身份证'},
    {key:'sex',label:'行别'},
  ];
  source = [];
  // data:Array<any>
  constructor(private location: Location , private route: ActivatedRoute,private service: MessageService,private _state: GlobalState,private modalService: BsModalService){
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });
  }

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
    // =======================模态层==================================
  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component);
  }
    ngOnDestroy(): any {
    this._state.unsubscribe(this.EVENT);
  }
  //=====================弹出新增用户模态窗口==========================
  popupAdd(): void {
    let param: DynamicComponentParam = {component: MessageAddedDialogComponent};
    console.log(param);
    
    this._state.notify(this.EVENT, param);
  }
  chooseInfo():void{
    this.popupAdd();
  }
  // ==================模态层=========================
  public modalRef: BsModalRef;
  public open(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  }
 // ===================假数据======================
   getDatas(params?):void{
      this.service.getdialogData()
      .then(res => {
        this.source = res.data;
    });
  }
}
