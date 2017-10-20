import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'seer-cool-checkbox',
  styles: [`
    .cool-checkbox {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      
      margin-bottom: 0;
      outline: none;
    }
    .cool-checkbox .cool-checkbox-input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0;
    }
    .cool-checkbox .cool-checkbox-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 14px;
      height: 14px;
      border-radius: .2em;
      border-width: 1px;
      border-style: solid;
      border-color: #ddd;
      line-height: 12px;
    }
    .cool-checkbox .cool-checkbox-indicator {
      font-size: 12px;
      text-alight: center;
    }
    .cool-checkbox .cool-checkbox-indicator:before {
      display: none;
      color: #058;
    }
    .cool-checkbox .cool-checkbox-input:checked ~ .cool-checkbox-indicator {
      border-color: #058;
    }
    .cool-checkbox .cool-checkbox-input:checked ~ .cool-checkbox-indicator:before {
      display: inline-block;
    }
    .cool-checkbox .cool-checkbox-input:focus ~ .cool-checkbox-indicator {
      border-color: #058;
    }

    .cool-checkbox .cool-checkbox-input:active ~ .cool-checkbox-indicator {
      border-color: #058;
    }
    .cool-checkbox .cool-checkbox-input:disabled ~ .cool-checkbox-indicator {
      background-color: #ddd;
      border-color: #ddd;
    }
  `],
  template: `
    <label class="cool-checkbox" (click)="onClicked($event)">
      <input type="checkbox" class="cool-checkbox-input" [(ngModel)]="checked" (change)="onChange($event)" [disabled]="disabled" />
      <span class="cool-checkbox-indicator fa fa-check"></span>
    </label>
    
  `
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
