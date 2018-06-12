import axios from 'axios';
import Base64 from 'js-base64';
require('es6-promise').polyfill();
//Axios配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:3000/';
//获取公共参数
const getBaseParams = function () {
  //deviceType:1:android、2:iphone、3.ipad ,4:PC、5:H5
  var deviceType = 5,platformSource = 'gyl_h5';
  if (navigator.userAgent.indexOf('GYL_IOS') > -1) {
    deviceType = 2;
    platformSource = 'gyl_iphone';
  }
  if (navigator.userAgent.indexOf('GYL_Android')) {
    deviceType = 1;
    platformSource = 'gyl_android';
  };
  let token = localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != 'undefined' && JSON.parse(localStorage.getItem('userInfo')).token;
  var str = '&deviceTypeOrig=5&device_type=' + deviceType + '&token=' + token + '&platformSource=' + platformSource;
  var baseparams = JSON.parse(sessionStorage.getItem('baseparams'));
  if (baseparams) str += '&system_os=' + baseparams.system_os + '&app_version=' + baseparams.app_version + '&brand=' + baseparams.brand + '&model=' + baseparams.model + '&channel=' + baseparams.channel + '&device_id=' + baseparams.device_id;
  return str;
}
export default {
  setAjax: function (opts = {}) {
    if (!opts.url) {
      return console.log('Request url is undefined');
    }
    let showLoading = opts.showLoading === false ? false : true;
    if (showLoading) {
      this.$vux.loading.show({
        text: 'loading'
      });
    }
    axios({
      method: opts.type || 'post',
      url: opts.url + getBaseParams(),
      params: opts.data || {},
      time: opts.time || 10 * 1000,
      responseType: opts.dataType || 'json'
    }).then(res => {
      if (showLoading) {
        this.$vux.loading.hide();
      }
      if (res.data.status.code === 0) {
        if (opts.success) {
          opts.success.call(this, res.data, res);
        }
      } else {
        this.$vux.toast.show({
          width: 'auto',
          text: res.data.status.message,
          position: 'bottom',
          type: 'text'
        });
        if (opts.error) opts.error(res);
      }
    }).catch(err => {
      console.log("Try catch:" + JSON.stringify(err));
      if (showLoading) {
        this.$vux.loading.hide();
      }
    });
  },
  setAjaxAll: function (opts = {}) {
    if (!opts.options.length) {
      return console.log('options is undefined');
    }
    let showLoading = opts.showLoading === false ? false : true;
    if (showLoading) {
      this.$vux.loading.show({
        text: 'loading'
      });
    }
    let self = this;
    let requests = opts.options.map(function (item) {
      return axios({
        method: item.type || 'post',
        url: item.url + getBaseParams(),
        params: item.data || {},
        time: item.time || 10 * 1000,
        responseType: item.dataType || 'json'
      });
    });
    axios.all(requests).then(axios.spread(function () {
      if (showLoading) {
        self.$vux.loading.hide();
      }
      let args = Array.prototype.slice.call(arguments).map(function (arg) {
        return arg.data;
      })
      if (opts.success) {
        opts.success.apply(self, args);
      }
    })).catch(err => {
      console.log("Try catch:" + JSON.stringify(err));
      if (showLoading) {
        this.$vux.loading.hide();
      }
    });
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$ajax', {
      value: this.setAjax
    });
    Object.defineProperty(Vue.prototype, '$ajaxAll', {
      value: this.setAjaxAll
    });
  }
}
