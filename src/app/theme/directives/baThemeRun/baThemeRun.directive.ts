import {Directive, HostBinding} from '@angular/core';
import {isMobile} from "../../theme.constants";
import {BaThemeConfigProvider} from "../../theme.configProvider";

@Directive({
  selector: '[baThemeRun]'
})
export class BaThemeRun {

  private _classes:Array<string> = [];
  @HostBinding('class') classesString:string;

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  public ngOnInit():void {
    this._assignTheme();
    this._assignMobile();
  }

  private _assignTheme():void {
    this._addClass(this._baConfig.get().theme.name);
  }

  private _assignMobile():void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  private _addClass(cls:string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
