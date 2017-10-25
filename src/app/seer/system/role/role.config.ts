import { TableTitleModel } from '../../common/seer-table/seer-table.component';
export const hasGlobalFilter = true;
export const filters = [
	{key: 'aaa', label: '用户名', type: 'input.text'},
	{key: 'bbb', label: '真实姓名', type: 'input.text'},
	{key: 'ddd', label: '身份证号', type: 'input.text'},
	{key: 'ccc', label: '手机号', type: 'input.text'},
	{key: 'lll1', label: '年龄', type: 'input.text'},
	{key: 'lll2', label: '-', type: 'input.text'},
	{
	  key: 'ggg', label: '会员状态', type: 'select',
	  isDict: true,
	  category: '1',
	},
	{key: 'fff1', label: '注册时间', type: 'datepicker'},
	{key: 'fff2', label: '-', type: 'datepicker'},
	{key: 'jjj', label: '邀请人', type: 'input.text'},
];
export const tableTitles: Array<TableTitleModel> = [
	{ key:'roleName', label:'角色名称', textAlign: 'left', },
	{ key:'validState', label:'有效状态', isDict: true, },
	{ key:'operateTime', label:'修改时间' },
	{ key:'operator', label:'修改者' },
	{ key:'createTime', label:'创建时间' },
	{ key:'createUser', label:'创建者' },
];