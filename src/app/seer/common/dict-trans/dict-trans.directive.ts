import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as _ from 'lodash';
import { ManageService, ResModel } from '../../../theme/services';

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[dict-trans]',
  providers: [ ManageService ],
})
export class DictTranslateDirective implements OnInit,OnChanges {
  ngOnInit(): void {
    if (null == this.key) throw new Error("Attribute 'key' is required");
    //先从缓存查找，若没有则从服务器获取并加载
    this.getValueName();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if( changes.value )  this.getValueName();
  }

  @Input() key: string;
  @Input() value: string;

  private el: HTMLInputElement;

  constructor(
    private manageService: ManageService,
    private viewContainerRef: ViewContainerRef,
    ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  getValueName() {
    this.manageService.getDictsByCategory(this.key)
    .then((res:ResModel) => {
      if ( res.code == 0 ) {
        let dict = _.find(res.data, t => t['itemId'] == this.value)
        if ( dict ) {
          this.el.innerText = dict['itemName'];
        }
      }
    });
  }

  

}
