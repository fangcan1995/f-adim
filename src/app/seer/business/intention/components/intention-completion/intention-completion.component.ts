
import {Component, OnInit} from "@angular/core";
import {DELETE, UPDATE} from "../../../../common/seer-simple-table/seer-simple-table.actions";
@Component({
  templateUrl: './intention-completion.component.html',
  styleUrls: ['./intention-completion.component.scss']
})
export class IntentionCompletionComponent implements OnInit {

  hasGlobalFilter = true;
  filters = [
    /*{ key: 'name', label: '用户名', type: 'input.text' },
    { key: 'gender', label: '性别', type: 'select', options:
      [ { content: '请选择' },
        { value: '0', content: '男' },
        { value: '1', content: '女', }
      ]
    },
    { key: 'mobile', label: '手机号', type: 'input.text' },*/
  ];
  title = '意向处理';

  titles = [
    { key:'projectId', label:'项目编号' },
    { key:'projectName', label:'项目名称', },
    { key:'memberId', label:'会员编号' },
    { key:'memberName', label:'会员姓名' },
    { key:'loanAmount', label:'借款金额' },
    { key:'lifeOfLoan', label:'借款期限' },
    { key:'applyTime', label:'申请时间' },
    { key:'projectStatus', label:'项目状态' },
  ];
  actionSet = {
    'completion': {
      'type': 'completion',
      'name': '补全资料',
      'className': 'btn btn-xs btn-info',
    }
  }

  data = [
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "1111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "111", "projectStatus": "111"},
    { "actions": [UPDATE, DELETE], "projectId" : "122433223", "projectName": "000000", "memberId": "232343432", "memberName": "0000", "loanAmount": "2222", "lifeOfLoan": "1111", "applyTime": "11111", "projectStatus": "111"},
  ];






  public member: any = {};

  public loanInfo: any = {};


  public provices =[]

  constructor(){}

  ngOnInit() {


  }

}
