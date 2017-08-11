"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModalComponent = (function () {
    function ModalComponent() {
        var _this = this;
        this.overrideSize = null;
        this.animation = true;
        this.backdrop = true;
        this.inAnimation = false;
        setTimeout(function () { return _this.inAnimation = true; }, 10);
    }
    ModalComponent.prototype.onOutsideClick = function () {
        var _this = this;
        if (this.componentInstance) {
            this.inAnimation = false;
            setTimeout(function () {
                _this.componentInstance.onDestroy();
            }, 500);
        }
    };
    Object.defineProperty(ModalComponent.prototype, "fadeClass", {
        get: function () {
            return this.animation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "backdropClass", {
        get: function () {
            return this.backdrop;
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.isSmall = function () {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    };
    ModalComponent.prototype.isLarge = function () {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    };
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "componentInstance", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "animation", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "backdrop", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "size", void 0);
    __decorate([
        core_1.HostBinding('class.fade')
    ], ModalComponent.prototype, "fadeClass", null);
    __decorate([
        core_1.HostBinding('class.backdrop')
    ], ModalComponent.prototype, "backdropClass", null);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            host: {
                'class': 'modal',
                '[class.in]': 'inAnimation',
                'role': 'dialog',
                'tabindex': '-1',
                'style': 'display:block; '
            },
            template: "\n        <div class=\"modal-dialog\" [ngClass]=\"{ 'modal-sm': isSmall(), 'modal-lg': isLarge() }\" (clickOutside)=\"onOutsideClick()\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            styles: [
                ".backdrop{\n    background-color:rgba(100,100,100,0.5);\n    }",
            ],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
var ModalSize = (function () {
    function ModalSize() {
    }
    ModalSize.Small = 'sm';
    ModalSize.Large = 'lg';
    return ModalSize;
}());
exports.ModalSize = ModalSize;
