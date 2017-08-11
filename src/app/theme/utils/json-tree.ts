/**
 * 把普通json数组转为树形结构
 * @param data
 * @param config
 * @param rename
 * @returns {Array}
 */
export const jsonTree = function (data:any, config:JsonTreeConfig={}, rename:renameConfig[]=[]) {
  let id = config.id || 'id',
    pid = config.parentId || 'parentId',
    children = config.children || 'children';

  let idMap = [],
    treeJson = [];

  data.forEach(v => {
    idMap[v[id]] = v;
  });

  data.forEach(v => {
    let parent = idMap[v[pid]];
    rename.map((rename:renameConfig)=>{
      if (v[rename.origin]){
        v[rename.replace] = v[rename.origin];
      }
    });
    if(parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(v);
    } else {
      treeJson.push(v);
    }
  });

  return treeJson;
};
export const menuTree = function (data:any[]) {
  let id = 'resourceId',
    pid = 'resourceParentId',
    children = 'children',
    path = 'resourceContent';

  let idMap = [],
    treeJson = [];

  data.sort((a, b)=>a.resourceSort-b.resourceSort);

  data.forEach(v => {
    idMap[v[id]] = v;
  });

  data.forEach(v => {
    let parent = idMap[v[pid]];
    if(parent) {
      !parent[children] && (parent[children] = []);
      v['path'] = v.resourceContent;
      if(v.resourceName){
        v['data'] = v['data'] || {};
        v['data']['menu'] = v['data']['menu'] || {};
        v['data']['menu']['title'] = v['resourceName'];
      }
      if(v.resourceIcon){
        v['data'] = v['data'] || {};
        v['data']['menu'] = v['data']['menu'] || {};
        v['data']['menu']['icon'] = v['resourceIcon'];
      }
      parent[children].push(v);
    } else {
      v['path'] = v['resourceContent'];
      if(v.resourceName){
        v['data'] = v['data'] || {};
        v['data']['menu'] = v['data']['menu'] || {};
        v['data']['menu']['title'] = v['resourceName'];
      }
      if(v.resourceIcon){
        v['data'] = v['data'] || {};
        v['data']['menu'] = v['data']['menu'] || {};
        v['data']['menu']['icon'] = v['resourceIcon'];
      }
      treeJson.push(v);
    }
  });

  return treeJson;
};

interface JsonTreeConfig {
  id?:string,
  parentId?:string,
  children?:string,
}

interface renameConfig{
  origin:string,
  replace:string
}
