import {Component,OnInit,ViewChild} from '@angular/core';
import {Location} from '@angular/common';  //返回上一层
import {ActivatedRoute, Params} from "@angular/router";
import {MessageService} from "../../message.service";
import {Message} from "../../../../model/auth/message-edit";
import {Result} from "../../../../model/result.class";
import {DynamicComponentLoader,DynamicComponentParam} from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { GlobalState } from "../../../../../global.state";
import { MessageAddedDialogComponent } from "../message-added-dialog/message-added-dialog.component";
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
  // data:Array<any>
  constructor(private location: Location , private route: ActivatedRoute,private service: MessageService,private _state: GlobalState){
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });
  }

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
    // 模态层
  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }
    ngOnDestroy(): any {
    this._state.unsubscribe(this.EVENT);
  }
  /*弹出新增用户模态窗口*/
  popupAdd(): void {
    let param: DynamicComponentParam = {component: MessageAddedDialogComponent, data: {title:'新增用户'} };
    console.log(param);
    
    this._state.notify(this.EVENT, param);
  }

  // /*弹出修改用户模态窗口*/
  // popupEdit(event):void {
  //   let param: DynamicComponentParam = {component: MessageAddedDialogComponent, data: {user: event, title:'修改用户', flag: '1'} };
  //   this._state.notify(this.EVENT, param);
  // }

  // onDelete(event):void {
  //   this.service.deleteUser(event.data.id).then(()=>true).catch(()=>false);
  // }
  chooseInfo():void{
    this.popupAdd();
  }
  // onChange(message):void {
  //   if(message.type == 'add'){ //新增
  //     this.popupAdd();
  //   }
  //   if(message.type == 'update'){ //修改
  //     this.popupEdit(message.data);
  //   }
  // }
}
