"use strict";
var router_1 = require('@angular/router');
var alert_component_1 = require("./components/staff.component.ts");
var dict_manage_component_1 = require("./staff-manage.component.ts");
// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: dict_manage_component_1.AlertManageComponent,
        children: [
            { path: '', component: alert_component_1.alertComponent },
        ]
    }
];
exports.alertManageRouting = router_1.RouterModule.forChild(routes);
