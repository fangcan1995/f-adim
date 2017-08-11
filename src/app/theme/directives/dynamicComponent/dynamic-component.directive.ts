import {Directive, ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';

import {ViewContainerRef} from '@angular/core';

import {EventEmitter} from "@angular/core";
import {ModalComponent} from "../../components/ng2-bs4-modal/modal";

export class BaseDynamicComponent{
  data:any;
  eventEmitter = new EventEmitter();

  onDestroy() {
    this.eventEmitter.emit('event');
  }
}

export class BaseModalComponent extends BaseDynamicComponent{
  modal;
  init(modal: ModalComponent){
    this.modal = modal;
  }
  closeModal(){
    if (this.modal && this.modal.componentInstance)
      this.modal.destroyComponent();
    else
      this.onDestroy();
  }
}

export interface DynamicComponentParam{
  component: Type<BaseDynamicComponent>,
  data?: any
}

@Directive({
  selector: '[dynamic-component]'
})
export class DynamicComponentLoader {
  constructor(private viewContainer:ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  loadComponent(modalComponent: { new(): BaseDynamicComponent }, data?: any): ComponentRef<BaseDynamicComponent> {
    this.viewContainer.clear();
    let dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory<BaseDynamicComponent>(modalComponent);
    let dynamicComponentRef = this.viewContainer.createComponent(dynamicComponentFactory);

    //给实例赋值
    //所有动态打开的组件的参数都放在data里,动态打开组件时数据都在该组件从父类继承的data属性中
    dynamicComponentRef.instance.data = data;
    dynamicComponentRef.instance.eventEmitter.subscribe(()=>{
      dynamicComponentRef.destroy();
    });
    return dynamicComponentRef;
  }
}
