import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';


window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.0/standard/';
import 'ckeditor';


@Component({
  selector: 'seereditor',
  styleUrls: ['./seer-editor.css'],
  templateUrl: './seer-editor.html',

})
export class seerEditorComponent implements OnInit {


  @Input() data;

  public config = {
    uiColor: '#F0F3F4',
    height: '200'
  };

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {

  }


  onChange(event){
    this.notify.emit({type: 'changed', data: event});
  }




}



