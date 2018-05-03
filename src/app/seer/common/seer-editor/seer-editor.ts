import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import {
  BaseService,
  HttpInterceptorService,
  API,
  BASE_URL,
  ResModel,
  TEST_URL
} from "../../../theme/services";
import { getStorage } from '../../../theme/libs';


import './ckeditor.loader';
import 'ckeditor';


@Component({
  selector: 'seer-editor',
  templateUrl: './seer-editor.html',
  styleUrls: ['./seer-editor.scss'],
})
export class SeerEditorComponent {
  apiUrl = `http://172.16.1.252:9080/subjects`;
  access_token = "access_token=6b2dc14f-13b6-4d0f-894f-d67a074249e5"
  // access_token ="access_token="+ getStorage({ key: 'token' }).access_token;
  private dataValue;
  public config = {
    // uiColor: '#F0F3F4',
    // height: '200',
    toolbar: [
      { name: 'document', items: [ 'Print' ] },
      { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
      { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
      '/',
      { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
      { name: 'links', items: [ 'Link', 'Unlink' ] },
      { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
      { name: 'insert', items: [ 'Image', 'Table' ] },
      { name: 'tools', items: [ 'Maximize' ] },
      { name: 'editing', items: [ 'Scayt' ] } 
    ],

    extraAllowedContent: 'h3{clear};h2{line-height};h2 h3{margin-left,margin-top}',
    extraPlugins: 'print,format,font,colorbutton,justify,uploadimage',
    uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?type=Images',
    filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
    //filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
    filebrowserImageUploadUrl: `${this.apiUrl}/file?${this.access_token}`,
    height: 200,

    removeDialogTabs: 'image:advanced;link:advanced'
  };

  @Input()
  set data(val) {
    this.dataValue = val;
    this.dataChange.emit(this.dataValue);
  }
  get data() {
    return this.dataValue;
  }
  @Output() dataChange: EventEmitter<any> = new EventEmitter();
}




