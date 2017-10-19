import * as _ from 'lodash';
export const resources2Menu = (resources: any[]) => {
  let menu = [];
  _.sortBy(resources, 'sortNum');
  _.each(resources, v => {
    let parent = _.find(resources, t => v.menuPid == t.menuId);
    v.data = v.data || {};
    v.data.menu = v.data.menu || {};
    v.data.menu.title = v.menuName;
    v.data.menu.icon = v.icon;
    v.path = v.hrefUrl;

    if ( parent && parent.menuId != v.menuId ) {
      !parent.children && (parent.children = []);
      parent.children.push(v);
    } else {
      menu.push(v)
    }
  })
  return menu;
}