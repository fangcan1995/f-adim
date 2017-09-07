import {Component, ViewEncapsulation, OnInit, ViewChild, Renderer, EventEmitter, ElementRef,OnDestroy,AfterViewInit,TemplateRef} from '@angular/core';
import {Router,ActivatedRoute,} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { InfoPublishService } from "../../info-publish.service";
import {Ng2Uploader} from "ng2-uploader";
import {GlobalState} from "../../../../../global.state";
// import { ModalComponent } from "../../../../../theme/components/ng2-bs4-modal/modal";
import { SeerTree } from "../../../../../theme/modules/seer-tree/seer-tree/seer-tree.component";
import { TREE_EVENTS } from "../../../../../theme/modules/seer-tree/constants/events";
import { jsonTree } from "../../../../../theme/utils/json-tree";
// import { BaseModalComponent } from "../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { ModalDirective ,BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  templateUrl: './info-publish-edit.component.html',
  styleUrls: ['./info-publish-edit.component.scss'],
  providers: [Ng2Uploader],
})
// export class OrgTreeDialogComponent extends BaseModalComponent implements OnInit
export class InfoPublishEditComponent implements OnInit {
  nodes = [];
  public editor;
  public title:string;
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };
  public uploadInProgress:boolean = false;
  public picture = '';
  imageError;
  currentStaff;
  // 模态层
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  // 树
  @ViewChild(SeerTree) seerTree: SeerTree;
  // 图片上传
  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();
  constructor(private InfoPublishService:InfoPublishService,private renderer:Renderer, protected _uploader:Ng2Uploader,private gs:GlobalState,private modalService: BsModalService) {
    //  super();
  }
  ngOnInit() {
    this.title = '基本信息';
    this.getOrganizations();
  }
  // 模态层
   public modalRef: BsModalRef;

 
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // 图片上传
  public onFiles():void {
    let files = this._fileUpload.nativeElement.files;
    if(files[0].size<1048576){
      if(files[0].type == ("image/png")||
         files[0].type == ("image/jpeg")||
         files[0].type == ("image/jpg")||
         files[0].type == ("image/bmp")||
         files[0].type == ("image/gif")){
            this.imageError = false;
            if (files.length) {
              const file = files[0];
              this._changePicture(file);
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () =>{
                // this.currentStaff.file = reader.result;
              };
              if (this._canUploadOnServer()) {
                this.uploadInProgress = true;
                this._uploader.addFilesToQueue(files);
              }
            }
      }else {
        this.imageError = "请您选择格式为jpeg、jpg、bmp、gif、png的图片。";
      }
    }else{
      this.imageError = "请您选择小于1Mb的图片。";
    }
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture():boolean {
    this.picture = '';
    return false;
  }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  protected _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

// 模态层 树
 



  /*
   * 获取全部组织机构
   * */
  getOrganizations() {
    this.InfoPublishService.getOrganizations().then((result) => {
      this.nodes = jsonTree(result.data,{parentId:'orgParentId',children:'children'},[{origin:'orgName',replace:'name'}]);
    });
  }

  onNotify($event) {

    if ($event.eventName == TREE_EVENTS.onActivate) {
      $event.node.setIsExpanded(true)
    }
  }


  // tinymce 编辑器
  ngAfterViewInit() {
    tinymce.init({
        selector: '#post_editor',
        skin_url: '/assets/skins/lightgray',
        //menubar:false,
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
        image_advtab: true,
        codesample_content_css:'/assets/css/prism.css',
        //文件和图片上传相关的选项
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
          console.log(type);
          console.log(type=='image');
          if(type=='image'){
              let event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              let fileInput = document.getElementById('img_input');
              fileInput.dispatchEvent(event);
          } 
        },
        setup: editor => {
          this.editor = editor;
          editor.on('keyup', () => {
              const content = editor.getContent();
              console.log(content);
          });
        }
      });
  	}
  	ngOnDestroy() {
    	tinymce.remove(this.editor);
    }
    // 所选栏目点击弹出模态层事件
    springing():void{
      // 弹出模态层
      
    }
}
