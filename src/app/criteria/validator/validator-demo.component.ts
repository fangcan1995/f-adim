import {Component} from "@angular/core";
import {BaseDynamicComponent} from "../../theme/directives/dynamicComponent/dynamic-component.directive";

class Hero {
  race: string;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'seer-tree-demo',
  templateUrl: './validator-demo.component.html',
})
export class ValidatorDemoComponent extends BaseDynamicComponent {
  hero:Hero = new Hero();

  submitted = false;

  onSubmit() {
    console.log(this.hero)
    this.submitted = true;
  }
}
