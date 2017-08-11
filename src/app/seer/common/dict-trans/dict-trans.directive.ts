import {
  Directive, Input, OnInit, ViewContainerRef, OnChanges, SimpleChanges,
} from '@angular/core';
import {BaseService} from "../../base.service";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[dict-trans]',
  providers: [BaseService],
})
export class DictTranslateDirective implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['value']){
      this.value = changes['value']['currentValue'];
      this.getValueName();
    }
  }

  @Input() key: string;
  @Input() value: string;

  private el: HTMLInputElement;

  constructor(private baseService: BaseService<any>,
              private viewContainerRef: ViewContainerRef,) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  getValueName() {
    this.baseService.getDictByKey(this.key.toUpperCase()).then(result => {
      if (result.success) {
        for (let dict of result.data) {
          if (dict.dictValueId == this.value) {
            this.el.innerText = dict.dictValueName;
          }
        }
      }
    });
  }

  ngOnInit(): void {
    if (null == this.key) throw new Error("Attribute 'key' is required");
    //先从缓存查找，若没有则从服务器获取并加载
    this.getValueName();
  }

}
