import { Component } from "@angular/core";
import { cityJson } from "../../theme/libs/cityJson";
import * as _ from "lodash";

declare let echarts;
@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {

  investOption = {
    xAxis: {
      type: "category",

      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ]
    },
    yAxis: {
      name: "元",
      type: "value"
    },
    series: [
      {
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          2000,
          1000,
          1200,
          1100,
          1500
        ],
        type: "line",
        itemStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3B9FF3'
              }, {
                  offset: 1,
                  color: '#65E5A8'
              }])
          }
      },
      }
    ]
  };
  objectOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "right",
      y:'bottom',
      data: ["3月汇车贷", "6月汇车贷", "9月汇车贷", "12月汇车贷"]
    },
    series: [
      {
        name: "标的组成",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "18",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "3月汇车贷" },
          { value: 310, name: "6月汇车贷" },
          { value: 234, name: "9月汇车贷" },
          { value: 135, name: "12月汇车贷" },
        ],
        color: ['#65E5A8','#54D1B3','#35ADC8','#0E81E1']
      }
    ]
  };
  columnarOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['投资A', '投资B']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['北京','上海','广州','深圳','大连','沈阳','郑州','青岛','石家庄','南京']

    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    series: [
        {
            name: '投资A',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 131744,120000,110000,154201,136000],
            barGap: 0,
            barWidth:10,
            color:'#0E81E1'
        },
        {
            name: '投资B',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 23489, 29034, 104970, 131744,236000],
            barGap: 0,
            barWidth:10,
            color:'#A2D5FF'
        },
    ]
};

  constructor() {}

  ch = {
    /** 每周第一天，0代表周日 */
    firstDayOfWeek: 0,
    /** 每周天数正常样式 */
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    /** 每周天数短样式（位置较小时显示） */
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    /** 每周天数最小样式 */
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    /** 每月月份正常样式 */
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    /**每月月份短样式 */
    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  };

  value: Date;
}
