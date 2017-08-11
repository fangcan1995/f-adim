"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ng2_smart_table_1 = require("ng2-smart-table");
var role_manage_service_1 = require("../role-manage.service");
var RoleListComponent = (function () {
    function RoleListComponent(service) {
        var _this = this;
        this.service = service;
        this.title = '角色列表';
        this.source = new ng2_smart_table_1.LocalDataSource();
        this.query = '';
        this.settings = {
            mode: 'inline',
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                columnTitle: 'Actions',
                add: true,
                edit: true,
                delete: true
            },
            filter: {
                inputClass: '',
            },
            add: {
                addButtonContent: '<i class="ion-ios-plus-outline"></i>',
                createButtonContent: '<i class="ion-checkmark"></i>',
                cancelButtonContent: '<i class="ion-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="ion-edit"></i>',
                saveButtonContent: '<i class="ion-checkmark"></i>',
                cancelButtonContent: '<i class="ion-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="ion-trash-a"></i>',
                confirmDelete: true
            },
            columns: {
                id: {
                    title: 'ID',
                    type: 'number'
                },
                firstName: {
                    title: 'First Name',
                    type: 'string'
                },
                lastName: {
                    title: 'Last Name',
                    type: 'string'
                },
                username: {
                    title: 'Username',
                    type: 'string'
                },
                email: {
                    title: 'E-mail',
                    type: 'string'
                },
                age: {
                    title: 'Age',
                    type: 'number'
                }
            }
        };
        this.service.getData().then(function (data) {
            _this.source.load(data);
        });
    }
    RoleListComponent.prototype.onDeleteConfirm = function (event) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        }
        else {
            event.confirm.reject();
        }
    };
    RoleListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            templateUrl: 'resource-list.component.html',
            providers: [role_manage_service_1.RoleManageService],
            styles: [require('./resource-list.scss')],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], RoleListComponent);
    return RoleListComponent;
}());
exports.RoleListComponent = RoleListComponent;
