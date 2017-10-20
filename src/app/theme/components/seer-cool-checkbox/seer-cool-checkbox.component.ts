import { Component, Input } from '@angular/core';

@Component({
  selector: 'seer-cool-checkbox',
  styles: [`
    .cool-checkbox {
      position: relative;
      display: inline-flex;
      height: 1rem;
      padding-left: 1rem;
      margin-bottom: 0;
    }
    .cool-checkbox .custom-control-input:checked ~ .custom-control-indicator {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
      box-shadow: none;
    }

    .cool-checkbox .custom-control-input:focus ~ .custom-control-indicator {
          box-shadow: none;
        }

    .cool-checkbox .custom-control-input:active ~ .custom-control-indicator {
          box-shadow: none;
        }
  `],
  template: `
    <label class="cool-checkbox ">
      <input type="checkbox" class="custom-control-input">
      <span class="custom-control-indicator"></span>
    </label>
    
  `
})
export class SeerCoolCheckboxComponent {

}
