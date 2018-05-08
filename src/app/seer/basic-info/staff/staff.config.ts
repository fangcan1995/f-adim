export const hasGlobalFilter = true;
export const filters = [
  {key: 'staffDtoNo', label: '员工编号', type: 'input.text'},
  {key: 'staffDtoName', label: '姓名', type: 'input.text'},
  {key: 'staffDtoCardId', label: '身份证', type: 'input.text'},
];
export const titles = [
  // {key: 'empName', label: '姓名', type: 'clickable'},
  {key: 'empName', label: '姓名'},
  {key: 'emCode', label: '员工编号'},
  {key: 'pDepartmentName', label: '分公司'},
  {key: 'departmentName', label: '团队'},
  {key: 'position', label: '职位'},
  {key: 'entryTime', label: '入职时间', type: 'date'},
  {key: 'inviteNum', label: '邀请人数', hidden:false},
  // {key: 'loginTimes', label: '登录次数'},
  // {key: 'lastLoginTime', label: '最后登录时间', type: 'date-time', hidden:true},
  // {key: 'loginIp', label: '最后登录IP' , hidden:true}
];
export const titlesEducation = [
  {key: 'college', label: '毕业院校'},
  {key: 'eduMajor', label: '所学专业'},
  {key: 'eduLevel', label: '学历'},
  {key: 'endTime', label: '毕业时间'},
];
export const titlesRelation = [
  {key: 'contRelation', label: '与本人关系'},
  {key: 'contName', label: '姓名'},
  {key: 'jobInfo', label: '工作单位及职务'},
  {key: 'contPhone', label: '联系电话'},
];
export const titlesExperience = [
  {key: 'companyName', label: '公司名称'},
  {key: 'jobType', label: '职务/工种'},
  {key: 'proveName', label: '证明人'},
  {key: 'proveTel', label: '联系电话'},
  {key: 'startTime', label: '开始日期'},
  {key: 'endTime', label: '结束日期'}
];
