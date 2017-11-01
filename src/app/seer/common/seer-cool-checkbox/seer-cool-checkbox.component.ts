import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'seer-cool-checkbox',
  templateUrl: './seer-cool-checkbox.component.html',
  styleUrls: [ './seer-cool-checkbox.component.scss' ],
})
export class SeerCoolCheckboxComponent {
  @Input() id;
  @Input() name;
  @Input() checkedValue: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter();
  @Output() click = new EventEmitter();
  @Input()
  get checked() {
    return this.checkedValue;
  }
  set checked(val) {
    this.checkedValue = val;
    this.checkedChange.emit(this.checkedValue);
  }
}
