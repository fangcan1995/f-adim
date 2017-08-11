
export function getPathsNames(activeLink): any[] {
  if (!activeLink||!activeLink.route||!activeLink.route.paths){
    return []
  }
  let pathsNames = ['Home'];
  let paths = activeLink.route.paths;

  getName(pathsNames,paths,JSON.parse(localStorage.getItem("leftMenus")));
  return pathsNames;
}

function getName(pathsNames: any[], paths, menus): void {
  for (let j = 0; j < menus.length; j++) {
    let menu = menus[j];
    if (paths[pathsNames.length] == menu.path) {
      if (menu.data && menu.data.menu && menu.data.menu.title) {
        pathsNames.push(menu.data.menu.title);
      }else {
        pathsNames.push(undefined)
      }
      if (menu.children){
        getName(pathsNames,paths,menu.children);
      }
    }
  }
}
