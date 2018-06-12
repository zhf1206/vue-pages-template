import Vue from 'vue';
// 任强强
export function callApp(actionName,params) {
  let json = {
    action: actionName,
    params: params
  };
  if(navigator.userAgent.indexOf('iOSUYUTrip') > -1){
    return window.webkit.messageHandlers.uyutrip.postMessage(json);
  }
  if(navigator.userAgent.indexOf('com.hna.hi') > -1){
    return LocalNative.execute(JSON.stringify(json));
  }
};
export function goHotelDeatail(hotelId,arrivalDate,departureDate){
  let params = {
    hotelId:hotelId,
    arrivalDate:arrivalDate,
    departureDate:departureDate
  };
  callApp('hotelDetailAction',params);
}
//调取APP登录
export function login(burl){
  let params = {
    backUrl: burl,
    callback:'loginCallback'
  };
  callApp('LoginAction',params);
}
//跳转历史页面
export function backTo(url){
  // console.log('back')
  history.back(url);
  setTimeout(function () {
    location.href = 'close://current';
  },300)
}
//调取APP支付
export function pay(orderNo){
  let  params = {
    orderId:orderNo,
    callback:'payResult'
  };
  callApp('PayAction',params);
}
//调取APP评价
export function OrderComment(orderNo){
  let  params = {
    orderNo:orderNo,
    callback:'orderCommentResult'
  };
  callApp('OrderComment',params);
}
//获取url传参
export function getQueryString(a) {
  var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)","i")
    , c = window.location.search.substr(1).match(b);
  return null  != c ? decodeURIComponent(c[2]) : null
}

//设置微信分享
export function setShare(params){

  if(navigator.userAgent.match(/MicroMessenger/)){
    var openId = localStorage.getItem('openId');

    new Vue().$ajax({
      url:'/user/api.go?action=weixinTicket&openId='+openId+'&fxUrl='+location.href.replace(/&/ig, '%26'),
      success:function(response){
        eval(response.data.config);
        wx.ready(function(){
          var setting = {
            title: params.title,
            link: params.url || location.href,
            imgUrl: params.imgUrl,
            desc: params.descs
          }
          wx.onMenuShareTimeline(setting);
          wx.onMenuShareAppMessage(setting);
        });
      }
    })
  }
}
//获取公众号的ipenId
export function get_openId(){
  return localStorage.getItem('openId');
}
//获取token
export function getToken(){
  return localStorage.getItem('userInfo')&&localStorage.getItem('userInfo') != 'undefined'&&JSON.parse(localStorage.getItem('userInfo')).token;
}
//toast提示信息
export function showMessage(text) {
  new Vue().$vux.toast.show({
    width: 'auto',
    text: text,
    position:'bottom',
    type:'text'
  })
}
//判断浏览器
export const versions={         //移动终端浏览器版本信息
  ios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1, //android终端或uc浏览器
  uyu_android:navigator.userAgent.indexOf('com.hna.yoyu') > -1,
  uyu_ios:navigator.userAgent.indexOf('iOSUYUTrip')> -1,
  wx: !! navigator.userAgent.match(/MicroMessenger/), //weixin
  safari: navigator.userAgent.indexOf("Safari") > -1,
  weibo: navigator.userAgent.match(/WeiBo/i)
};
export const Hi = {
    body: document.getElementById('gyl_body'),
    html: document.getElementById('gyl_html'),
    scrollTop:0,
    setOverflowHidden: function () {
        this.scrollTop = this.body.scrollTop;
        Hi.addClass(Hi.body, 'overhidden_hi');
        Hi.addClass(Hi.html, 'overhidden_hi');
    },
    removeOverflowHidden: function () {
        Hi.removeClass(Hi.body, 'overhidden_hi');
        Hi.removeClass(Hi.html, 'overhidden_hi');
        this.body.scrollTop = this.scrollTop;
        this.scrollTop = 0;
    },
    addClass:function(obj, cls){
        if(obj.className.indexOf(cls) > 0) return;
        var obj_class = obj.className,blank = (obj_class != '') ? ' ' : '';
        obj.className = obj_class + blank + cls;
    },
    removeClass:function(obj, cls){
        let reg=new RegExp(cls,'g');
        obj.className =obj.className.replace(reg,'').replace(/(\s+)/gi, ' ');
    },
    hasClass:function(obj, cls){
        var obj_class = obj.className,//获取 class 内容.
            obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
        x = 0;
        for(x in obj_class_lst) {
            if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                return true;
            }
        }
        return false;
    }
}

/**
 * 文本验证
 * 2017-10-24
 */
export const valid = {
  phone: function (val) {
    //手机号
    const reg = /^1[34578]\d{9}$/;
    return reg.test(val);
  },
  email: function (val) {
    //邮箱
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(val);
  },
  money: function (val) {
    //金额，最多两位小数
    const reg = /^([0-9]*)+(.[0-9]{1,2})?$/;
    return reg.test(val);
  },
  number: function (val) {
    //整数数字
    const reg = /^[0-9]*$/;
    return reg.test(val);
  },
  date: function (val) {
    //日期yyyy-MM-dd
    const reg = /^\d{4}-\d{1,2}-\d{1,2}/;
    return reg.test(val);
  },
  telephone: function (val) {
    //国内电话
    const reg = /\d{3}-\d{8}|\d{4}-\{7,8}/;
    return reg.test(val);
  },
  zipcode: function (val) {
    //邮编
    const reg = /[1-9]\d{5}(?!\d)/;
    return reg.test(val);
  },
  idCard: function (val) {
    //身份证
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
  },
  characters: function (val) {
    //汉字
    const reg = /^[u4e00-u9fa5],{0,}$/;
    return reg.test(val);
  }
}