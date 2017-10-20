import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'seer-cool-checkbox',
  templateUrl: './seer-cool-checkbox.component.html',
  styleUrls: [ './seer-cool-checkbox.component.scss' ],
})
export class SeerCoolCheckboxComponent {
  @Input() checkedValue: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter();
  @Output() click = new EventEmitter();
  @Output() change = new EventEmitter();
  @Input()
  get checked() {
    return this.checkedValue;
  }
  set checked(val) {
    this.checkedValue = val;
    this.checkedChange.emit(this.checkedValue);
  }
  onChange($event) {
    this.change.emit($event);
  }
  onClicked($event) {
    this.click.emit($event); 
  }
}
