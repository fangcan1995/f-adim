"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var login_service_1 = require("../../../seer/login/login.service");
var BaPageTop = (function () {
    function BaPageTop(_state, _loginService, router) {
        var _this = this;
        this._state = _state;
        this._loginService = _loginService;
        this.router = router;
        this.isScrolled = false;
        this.isMenuCollapsed = false;
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    BaPageTop.prototype.toggleMenu = function () {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    };
    BaPageTop.prototype.scrolledChanged = function (isScrolled) {
        this.isScrolled = isScrolled;
    };
    BaPageTop.prototype.logout = function () {
        var _this = this;
        this._loginService.logout().subscribe(function (json) {
            _this.isSuccess = json.success;
            localStorage.removeItem('data');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('leftMenus');
            if (_this.isSuccess == true) {
                _this.router.navigate(['/login']);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    return BaPageTop;
}());
BaPageTop = __decorate([
    core_1.Component({
        selector: 'ba-page-top',
        styles: [require('./baPageTop.scss')],
        template: require('./baPageTop.html'),
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [login_service_1.LoginService]
    })
], BaPageTop);
exports.BaPageTop = BaPageTop;
