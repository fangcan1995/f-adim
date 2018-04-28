import { TableTitleModel } from '../../common/seer-table/seer-table.component';
export const hasGlobalFilter = true;
export const tableTitles: Array<any> = [
	/* { key: 'roleId', label: '角色编号' }, */
	{ key: 'roleName', label:'角色名称' },
	{ key: 'userCount', label:'用户数' },
	/* { key: 'roleStatus', label: '状态', isDict: true, category: 'ROLE_STATUS' }, */
	{ key: 'updateTime', label: '更新时间', type: 'date-time' },
	{ key: 'updateUser', label: '修改人' },
	{ key:'createTime', label:'创建时间', type: 'date-time' },
	{ key:'createUser', label:'创建用户' },
];