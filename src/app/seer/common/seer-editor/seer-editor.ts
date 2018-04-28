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
export class SeerEditorComponent {
  private dataValue;
  public config = {
    uiColor: '#F0F3F4',
    height: '200',
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




