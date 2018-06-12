<template>
  <div class="gyl-register"></div>
</template>
<script type="text/ECMAScript-6">
  import global from 'assets/js/global';
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
         return Util.showMessage('请填写正确的手机号');
        }
        this.$ajax({
          url: '/user/api.go?action=sendMessageCode',
          data:{
            phoneNumber:this.phonenum
          },
          dataType:'json',
          success: (res) => {
          }
        });
      },
      login: function () {
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
            success: (res) => {
              location.href = url;
            }
          })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .gyl-register{
      width:100%;
      height:100%;
  }
</style>
