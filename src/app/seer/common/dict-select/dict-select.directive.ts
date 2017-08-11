import {
  Directive, Input, OnInit, ViewContainerRef, HostBinding, OnChanges, SimpleChanges,
} from '@angular/core';
import {BaseService} from "../../base.service";

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[dict-select]',
  providers: [BaseService],
})
export class DictSelectDirective implements OnInit {

  @Input() selected: string = '';
  @Input() topOption: {dictValueId,dictValueName};
  @Input() key: string;
  @Input() ngModel;

  private el: HTMLInputElement;

  constructor(private baseService: BaseService<any>,
              private viewContainerRef: ViewContainerRef,) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    if (null == this.key) throw new Error("Attribute 'key' is required");
    //添加提示选项
    if (this.topOption) {
      let wrapper = document.createElement('option');
      wrapper.value = this.topOption.dictValueId;
      wrapper.text = this.topOption.dictValueName;
      if (!this.selected) {
        wrapper.selected = true;
      }
      this.el.appendChild(wrapper);
    }
    let translateFields: {field: string,dictKeyId?: string}[] = [];
    translateFields.push({field:this.key, dictKeyId: this.key.toUpperCase()});
    //从服务器获取并加载
    this.baseService.getDictTranslate(translateFields).then(result => {
      if (result.success) {
        let isFirstOption = true;
        result.data[this.key].sort((a,b)=>+a.dictSort-+b.dictSort).forEach(dict=>{
          let wrapper = document.createElement('option');
          wrapper.value = dict.dictValueId;
          wrapper.text = dict.dictValueName;
          if (this.selected == dict.dictValueId) {
            wrapper.selected = true;
          }
          if(!this.topOption && !this.selected && isFirstOption){
            wrapper.selected = true;
            this.ngModel = dict.dictValueId;
            isFirstOption = false;
          }
          this.el.appendChild(wrapper);
        });
      }
    })
  }

}
