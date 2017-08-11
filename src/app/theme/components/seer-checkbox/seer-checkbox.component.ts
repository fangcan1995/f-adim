import {Component, Input, Self} from '@angular/core';

@Component({
  selector: 'seer-checkbox',
  styles: [`
.check-span{
  cursor: pointer;
  margin: 0 15px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
}
.virtual-checkbox {
  font-size: 20px;
  cursor: pointer;
  vertical-align: sub;
}

`],
  template: `
<span class="check-span">
  <i id="{{label+id}}" class="virtual-checkbox" [ngClass]="{'ion-android-checkbox-outline-blank': !isChecked, 'ion-android-checkbox-outline':isChecked}"></i>
  <label for="{{label+id}}" style="cursor: pointer;">{{label}}</label>
</span>
`
})
export class SeerCheckbox {
  @Input() label:string;
  id = new Date().getTime();
  @Input() isChecked:boolean;
}
