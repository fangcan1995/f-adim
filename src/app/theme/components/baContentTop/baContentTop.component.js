"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var util_1 = require("./util");
var BaContentTop = (function () {
    function BaContentTop(_state) {
        var _this = this;
        this._state = _state;
        this.activePageTitle = '';
        this.isMenuCollapsed = false;
        this.isScreenFull = false;
        this._state.subscribe('menu.activeLink', function (activeLink) {
            _this.breadcrumbs = util_1.getPathsNames(activeLink).filter(function (title) { return title; });
            if (activeLink) {
                _this.activePageTitle = activeLink.title;
            }
        });
    }
    BaContentTop.prototype.toggleMenu = function () {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    };
    BaContentTop.prototype.toggleFullScreen = function () {
        this.isScreenFull = !this.isScreenFull;
        if (this.isScreenFull) {
            this.launchFullScreen(document);
        }
        else {
            this.exitFullScreen(document);
        }
    };
    BaContentTop.prototype.launchFullScreen = function (document) {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };
    BaContentTop.prototype.exitFullScreen = function (document) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };
    BaContentTop.prototype.refreshPage = function () {
        window.location.reload();
    };
    return BaContentTop;
}());
BaContentTop = __decorate([
    core_1.Component({
        selector: 'ba-content-top',
        styles: [require('./baContentTop.scss')],
        template: require('./baContentTop.html'),
    })
], BaContentTop);
exports.BaContentTop = BaContentTop;
