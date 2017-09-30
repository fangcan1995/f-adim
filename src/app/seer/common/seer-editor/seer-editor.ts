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

import './ckeditor.loader';
import 'ckeditor';


@Component({
  selector: 'seer-editor',
  templateUrl: './seer-editor.html',
  styleUrls: ['./seer-editor.scss'],
})
export class SeerEditorComponent implements OnInit {
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




