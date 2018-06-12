//全局公用样式表
require('assets/css/common.less');

//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大
import {ToastPlugin,LoadingPlugin,ConfirmPlugin } from 'vux';
import Vue from 'vue';

//VUX UI 注册
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

//封装ajax
import Ajax from './ajax.js';
Vue.use(Ajax)
//解决click点击300毫秒延时问题
import FastClick from 'fastclick';
FastClick.attach(document.body);
//过滤器相关------start
//时间格式化
let format = require('date-fns/format');
var differenceInMinutes = require('date-fns/difference_in_minutes')
let mapping = ['数字转化成汉字','一','二','三','四','五','六','七','八','九','十','十一','十二'];
Vue.filter('formattime', function (time) {
  let arr = time.split('');
  arr.splice(2,0,':');
  return arr.join('');
})
//分钟转化成小时分钟
Vue.filter('getHM',function(minute){
  return Math.floor(minute/60)+'h'+minute%60+'m';
})
Vue.filter('int',function(number){
  return Math.round(number);
})
//数字转化成对应的汉字
Vue.filter('changeNumber',function (num) {
  return mapping[num];
})
//日期格式化
Vue.filter('formatfilter',function (date,fmt) {
  return format(date,fmt);
})
//获取周几，例如周一
Vue.filter('getWeek',function (date) {
  let week = ['数字转化成汉字','一','二','三','四','五','六','日']
  return week[format(date,'E')];
})
//根据证件code获取证件名称
Vue.filter('getCradTypeName', function (idType) {
  var cardName = "";
  switch (idType) {
    case "PP":
      cardName = "护照";
      break;
    case "NI":
      cardName = "身份证";
      break;
    case "MTPTR":
      cardName = "台胞证";
      break;
    case "MTPHKMR":
      cardName = "回乡证";
      break;
    case "EEP":
      cardName = "港澳通行证";
      break;
    case "MRTTP":
      cardName = "台湾通行证";
      break;
    case "SMC":
      cardName = "军人证";
      break;
    case "HKB":
      cardName = "户口簿";
      break;
    case "BOC":
      cardName = "出生证明";
      break;
    case 'OT':
      cardName = "其他";
      break;
    default:
      return;
  }
  return cardName;
});
//过滤器相关-------end
//指令开始------start
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.innerText;
    el.remove();
  }
})
//指令结束------end

