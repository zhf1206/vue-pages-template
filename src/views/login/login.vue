<template>
  <div class="login_page">
    <div class="title">根源链商城</div>
    <div class="tip">新用户手机号获取验证码直接登录，无需注册</div>
    <div class="txt-row"><input class="mobile" type="tel" maxlength="11" placeholder="手机号" id="telephone" v-model="phonenum"/></div>
    <div class="txt-row">
      <input class="smscode" type="text" placeholder="短信验证码" id="yzm" v-model="yzm"/>
      <div class="send" @click="sendMessage" :class="{'ok':!sendFlag}">
        <span v-if="!sendFlag">发送验证码</span>
        <span v-if="sendFlag">重新发送({{time}})</span>
      </div>
    </div>
    <div class="rules">同意<a href="#">《用户注册协议》</a></div>
    <div class="row-login"><div class="loginBtn ok" @click="login">进入商城</div></div>
  </div>
</template>

<script type="text/ECMAScript-6">
  import global from 'assets/js/global';
  import {default  as apiUrl} from 'assets/js/apiUrl';
  import {showMessage,getQueryString} from 'assets/js/ddbase'
  export default{
    data: function(){
       return {
        phonenum:'',
         yzm:'',
         sendFlag: false,
         time:60
      }
    },
    methods:{
      sendMessage: function () {
        if(!this.phonenum || !(/^1[34578]\d{9}$/.test(this.phonenum))){
         return showMessage('请填写正确的手机号');
        }
        this.$ajax({
          url: apiUrl.login,
          data:{
            phoneNumber:this.phonenum
          },
          dataType:'json',
          success: response => {
              this.sendFlag = true;
              var tid = setInterval(()=>{
                if(this.time == 0){
                  clearInterval(tid);
                  this.sendFlag = false;
                }else{
                  this.time--;
                }
              },1000)
          }
        });
      },
      login: function () {
          if(!this.phonenum || !(/^1[34578]\d{9}$/.test(this.phonenum))){
            return showMessage('请填写正确的手机号');
          }
          if(!this.yzm){
              return showMessage('请填写正确验证码')
          }
          this.$ajax({
            url:'/user/api.go?action=login',
            data:{
              phoneNumber:this.phonenum,
              identifyCode:this.yzm
            },
            dataType:'json',
            success: response => {
              localStorage.setItem('userInfo',JSON.stringify(response.data.userBaseInfo));
              localStorage.setItem('logindate',new Date().getTime());
              location.href = url;
            }
          })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .login_page{
    .title{
      line-height: 44px;
      color: #444;
      font-size: 30px;
      text-align: center;
      margin-top: 20px;
    }
    .tip{
      line-height: 16px;
      margin: 12px 0 16px;
      color: #8e8e8e;
      font-size: 11px;
      text-align: center;
    }
    .mobile{
      width:96%;
      height: 48px;
      line-height: 48px;
      border-radius: 4px;
      background-color: #f7f7f7;
      font-size: 14px;
      color: #444;
      padding-left: 12px;
      margin-top: 16px;
    }
    .smscode{
      width:60%;
      height: 48px;
      line-height: 48px;
      border-radius: 4px;
      background-color: #f7f7f7;
      font-size: 14px;
      color: #444;
      padding-left: 12px;
      margin-top: 16px;
    }
    
    #telephone,#yzm{
      padding: 10px 0 10px 12px;
      height: 23px;
      line-height: 23px;
    }
    .txt-row{
      padding: 0 16px;
      .send{
        margin-top: 16px;
        width: 104px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 4px;
        background-color: #efefef;
        font-size: 11px;
        color: #a7a7a7;
        float:right;
      }
    }
    .rules{
      margin-left: 16px;
      color: #8e8e8e;
      font-size: 8px;
      line-height: 20px;
      margin-top: 10px;
      a{
        color: #0af;
      }
    }
    .row-login{
      padding:0 16px;
      margin-top:16px;
      .loginBtn{
          height: 48px;
          line-height: 48px;
          border-radius: 4px;
          background-color: #f7f7f7;
          font-size: 14px;
          color: #444;
          text-align: center;
          margin:0 auto;
      }
      .loginBtn.ok,.send.ok{
        background-color: #0af;
        color: #fff;
      }
    }
    
    .message-tip{
      bottom: auto;
      top: 250px;
    }
  }
</style>
