# Data-table使用教程 #

### 在需要使用data-table的Module中引入sharedModule ###

### 在Component的HTML中引入  ###
<data_table
  	[data]="data"
  	[settings]="settings"
 	  (notify)="onChange($event)"
></data_table>

#### data为数据数，例如  ####
    data = [
    		{
    			Id: 1,
    			name: 'abc'
    },
    		{
    			Id: 2,
    			name: 'abc'
    },
    		{
    			Id: 3,
    			name: 'abc'
    }
    ]


#### settings为基础信息JSON  ####
例如      
settings ={
    columns: {
      id: {
    title: 'ID',
      },
      myName: {
    title: '姓名',
      },
      myAge: {
    title: '年龄',
      }
    },
    actions: {
      columnTitle: '操作',
    },
    pager:{
      perPage: 10
    }
 };

#### 其中，id , myName, myAge为data数组中对应属性的名字，title为显示在页面上的信息。 ####

#### onChange（）函数为在data-table组件中点击增删改按钮后返回的信息，在引入data-table对应的上级component中调用，方法如下。 ####

    
    onChange(message):void {
      if(message.type=='update'){
          //更新操作
      }
      if(message.type=='add'){
          //新增
      }
      if(message.type=='delete'){
       //删除
      }
    }
#### message.type 为对应操作类型， message.data为具体参数，然后根据需求调用Service进行数据操作。 ####
