import { TableTitleModel } from '../../common/seer-table/seer-table.component';
export const hasGlobalFilter = true;
export const tableTitles: Array<TableTitleModel> = [
	{ key:'roleName', label:'角色名称', textAlign: 'left', },
	{ key:'validState', label:'有效状态', isDict: true, },
	{ key:'operateTime', label:'修改时间' },
	{ key:'operator', label:'修改者' },
	{ key:'createTime', label:'创建时间' },
	{ key:'createUser', label:'创建者' },
];