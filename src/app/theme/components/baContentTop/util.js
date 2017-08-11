"use strict";
var app_menu_1 = require("../../../app.menu");
//{"title":"用户管理","selected":true,"expanded":false,"order":0,"route":{"path":"user-manage","data":{},"paths":["/","seer","sys","user-manage"]},"target":"","pathMatch":"full"}
function getPathsNames(activeLink) {
    if (!activeLink || !activeLink.route || !activeLink.route.paths) {
        return;
    }
    var pathsNames = ['Home'];
    var paths = activeLink.route.paths;
    getName(pathsNames, paths, app_menu_1.MENU);
    return pathsNames;
}
exports.getPathsNames = getPathsNames;
function getName(pathsNames, paths, menus) {
    for (var j = 0; j < menus.length; j++) {
        var menu = menus[j];
        if (paths[pathsNames.length] == menu.path) {
            if (menu.data && menu.data.menu && menu.data.menu.title) {
                pathsNames.push(menu.data.menu.title);
            }
            else {
                pathsNames.push(undefined);
            }
            if (menu.children) {
                getName(pathsNames, paths, menu.children);
            }
        }
    }
}
