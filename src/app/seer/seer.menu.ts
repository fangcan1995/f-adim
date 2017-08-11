import {SYS_MENU} from "./sys/sys.menu";
export const SEER_MENU = [
  {
    path: 'sys',
    data:{
      menu: {
        title: '系统管理',
        icon: 'fa fa-wrench',
      }
    },
    children:[
      ...SYS_MENU,
    ]
  },
  // {
  //   path: 'pages',
  //   data: {
  //     menu: {
  //       icon: 'ion-android-home',
  //       title: '管理员工作台'
  //     }
  //   }
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'ion-monitor',
  //       title: '我的工作台'
  //     }
  //   }
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-th-list',
  //       title: '基础信息管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '供应商管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '品牌管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '客户管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '人员管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '组织架构管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '库位管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '合同管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '车辆管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '商品管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '会议室管理'
  //       }
  //     }
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-shopping-cart',
  //       title: '进销存管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '采购管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '预订单管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '采购订单管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '采购退货管理'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '销售管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售订单管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售退货管理'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '库存管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '入库单查询'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '出库单查询'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '库存调拨管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '库存盘点'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '配送管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '发货列表'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '验收单管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '车辆调配'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '对账管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售对账'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '合同对账'
  //         }
  //       }
  //     }
  //   ]
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-th-large',
  //       title: 'POS门店管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: 'POS工作台'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: 'POS门店'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '总仓配送'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: 'VIP管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '库存管理'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '公告发布'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '对账管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售对账'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '合同对账'
  //         }
  //       }
  //     }
  //   ]
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-calendar',
  //       title: '计划管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '目标管理'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '销售目标'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '回款目标'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '运营资金分配'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '代垫计划'
  //       }
  //     }, children: [
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '代垫预算'
  //         }
  //       }
  //     },
  //     {
  //       path: '',
  //       data: {
  //         menu: {
  //           title: '核销管理'
  //         }
  //       }
  //     }
  //   ]
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '活动计划'
  //       }
  //     }
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-user',
  //       title: '人事管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '个人报销'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '人事考勤'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '人事调动'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '用品申请'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '薪资管理'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '公司公告'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '会议室申请'
  //       }
  //     }
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'fa fa-usd',
  //       title: '财务管理'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '应收账款'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '应付账款'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '预付账款'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '预收账款'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '财务分析'
  //       }
  //     }
  //   }
  // ]
  // },
  // {
  //   path: '',
  //   data: {
  //     menu: {
  //       icon: 'ion-stats-bars',
  //       title: '数据分析'
  //     }
  //   }, children: [
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '供应商分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '客户分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '仓储分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '车辆分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '组织架构分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '人员分析'
  //       }
  //     }
  //   },
  //   {
  //     path: '',
  //     data: {
  //       menu: {
  //         title: '商品分析'
  //       }
  //     }
  //   }
  // ]
  // },
];
