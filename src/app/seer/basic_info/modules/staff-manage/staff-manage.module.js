"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var dict_manage_routing_1 = require("./staff-manage.routing.ts");
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var nga_module_1 = require("../../../../theme/nga.module");
var shared_module_1 = require("../../../common/shared.module");
var alert_component_1 = require("./components/staff.component.ts");
var dict_manage_service_1 = require("./staff-manage.service.ts");
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var AlertManageModule = (function () {
    function AlertManageModule() {
    }
    AlertManageModule = __decorate([
        core_1.NgModule({
            imports: [
                nga_module_1.NgaModule,
                dict_manage_routing_1.alertManageRouting,
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.sharedModule,
                ng2_bootstrap_1.TabsModule,
            ],
            declarations: [
                alert_component_1.alertComponent,
                AlertManageComponent,
            ],
            providers: [
                dict_manage_service_1.alertService
            ]
        })
    ], AlertManageModule);
    return AlertManageModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertManageModule;
