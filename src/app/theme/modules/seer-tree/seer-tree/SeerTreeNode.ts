export interface SeerTreeNode {
  name: string;
  id: string;
  expanded?: boolean;
  selected?: boolean;
  children?: SeerTreeNode[];
  /**
   * 如果有这个，，并且!children, 表明子节点是动态加载的！
   */
  hasChildren?: boolean;
  forbidChangeType?:boolean;
  customIcon?:string;
}
