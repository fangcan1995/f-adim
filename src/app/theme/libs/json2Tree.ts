/**
 * 把普通json数组转为树形结构
 * @param data
 * @param config
 * @param rename
 * @returns {Array}
 */
export const json2Tree = (data: any, config: JsonTreeConfig = {}, rename: renameConfig[] = []) => {
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

interface JsonTreeConfig {
  id?:string,
  parentId?:string,
  children?:string,
}

interface renameConfig {
  origin:string,
  replace:string
}