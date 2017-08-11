"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var resource_manage_service_1 = require("../../resource-manage.service");
var ResourceOperationComponent = (function () {
    function ResourceOperationComponent(service) {
        this.service = service;
        this.title = '角色操作';
    }
    ResourceOperationComponent = __decorate([
        core_1.Component({
            selector: 'role-operation',
            templateUrl: 'resource-operation.component.html',
            providers: [resource_manage_service_1.ResourceManageService],
            styles: [require('./role-operation.scss')],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ResourceOperationComponent);
    return ResourceOperationComponent;
}());
exports.ResourceOperationComponent = ResourceOperationComponent;
