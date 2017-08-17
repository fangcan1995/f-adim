import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import { ModalDirective } from "ng2-bootstrap";



@Component({
  selector: 'seeralert',
  templateUrl: './seer_alert.html',
  styleUrls: ['./seer_alert.css'],
})
export class seerAlertComponent implements OnInit, OnChanges{


  @Input() type;
  @Input() content;
  @Input() action;

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor() {
  }

  ngOnInit(): void {

  }


  ngOnChanges(action) {
    if (this.action && this.action == 'show') {
        this.showChildModal();
    } else if (this.action && this.action == 'hide') {
        this.hideChildModal();
    }
  }



  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  submit(){
    this.hideChildModal();
    this.notify.emit({type: 'save'});
  }

  cancel(){
    this.hideChildModal();
    this.notify.emit({type: 'cancel'});
  }



}




