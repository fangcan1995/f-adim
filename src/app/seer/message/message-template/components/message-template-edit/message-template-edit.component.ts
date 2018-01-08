import {Component, ViewEncapsulation,Input,OnInit,ViewChild} from "@angular/core";
import {messageTplManageService} from "../../message-template.service"
import {Router,ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';
import {Result} from "../../../../model/result.class";
import {SeerDialogService, SeerMessageService,} from '../../../../../theme/services';
/*import {Template} from "../../../../model/auth/message-template";*/

@Component({
  selector: 'message-template-edit',
  templateUrl: './message-template-edit.component.html',
  styleUrls: ['./message-template-edit.component.css'],
  providers: [messageTplManageService],
  /*encapsulation: ViewEncapsulation.None*/
})
export class MessageTemplateEditComponent implements OnInit {
  //template: Template = new Template();
  template:any={};
  title="";
  _editType: string = 'add';
  isAdd: boolean;
  editId: string;
  public forbidSaveBtn: boolean = true;
  isPickUsersAble:boolean=true;  //选择用户按钮无效
  IsChecked={"sendMail":false,"sendNotify":false,"sendMessage":false,"now":false}
  disabled={"sendMail":true,"sendNotify":true,"sendMessage":true,"now":false}; // checkbox是否可用
  sendMail;
  sendNotify;
  sendMessage;
  @ViewChild('validationForm') validationForm;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private location: Location,
    private service: messageTplManageService,
    private _messageService: SeerMessageService,
  ){
  };
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.editId = params['id'];
      this.isAdd = !this.editId;
      this.isPickUsersAble=true;
    });
    this.title = this.isAdd ? '新建消息模板' : '修改消息模板';
    this.forbidSaveBtn=false;
    if(!this.isAdd) {
      //this.getResourceById(this.editId);
      this._editType='edit';
      this.isPickUsersAble=false;
      this.service.getTemplateById(this.editId).then((data) => {
        this.template = data.data;
      }).catch(err=>{
        this.showError(err.json().message || "连接失败");
      });
    }else {
      this.isPickUsersAble=false;
    };
  }
  handleSaveBtnClick(): void {
    this.forbidSaveBtn =true;
    let resourceIds = [];
    this.template.sendMail=this.Cint(this.template.sendMail);
    this.template.sendNotify=this.Cint(this.template.sendNotify);
    this.template.sendMessage=this.Cint(this.template.sendMessage);
    if (this.template.id) {
      /*修改*/
      this.service.updateTemplate(this.template).then((data: any) => {

        this.showSuccess(data.msg || '更新成功')
          .onClose()
          .subscribe(() => {
            this._router.navigate(['/message/message-template/']);
          });
        }).catch(err=>{
        this.forbidSaveBtn = false;
        this.showError(err.msg || '更新失败')
      })
      /**/
    } else  if ( this._editType === 'add' ) {
      //console.log(this.template);
      /*新增*/
      this.service.createTemplate(this.template).then((data:any) => {
        this.showSuccess(data.msg || '保存成功').onClose()
          .subscribe(() => {
            this._router.navigate(['/message/message-template/']);
          });
      }).catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '保存失败')
      });
      /**/
    }else{
      return
    }
  };
  //激活选择用户按钮
  selectUsersType(userTypeId){
    //要判断是否选择，并判断选中了前台用户还是后台用户
    if(userTypeId=='0'){
      this.disabled.sendMail=false;
      this.disabled.sendNotify=false;
      this.disabled.sendMessage=false;
    }else if(userTypeId=='1'){
      this.disabled.sendMail=true;
      this.disabled.sendNotify=true;
      this.disabled.sendMessage=false;
    }else{
      this.disabled.sendMail=true;
      this.disabled.sendNotify=true;
      this.disabled.sendMessage=true;
    }
  }
  //将true false转成1 0
  Cint(parm:Boolean){
    return parm === true ? 1 : 0;
  }
  //返回
  handleBackBtnClick() {
    this.location.back()
  }
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }

}
