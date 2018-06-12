<template>
    <div class="content">
        <popover>
            <div slot="content" class="popover-demo-content"></div>
            <div class="button"></div>
        </popover>
        <div>
          <pre>倒计时：</pre>
          <clocker time="2018-08-01" v-if="flag">
            <span style="color:red">%D 天</span>
            <span style="color:green">%H 小时</span>
            <span style="color:blue">%M 分 %S 秒</span>
          </clocker>
        </div>
        <div class="baidumap">
          <input type="text" id="baidumap" @change="changeAds"/>
        </div>
    </div>
</template>

<script type="text/ECMAScript-6">
    import Util from 'assets/js/global';
    import Popover from 'components/popover/index';
    import { Clocker } from 'vux'
    export default{
      data(){
        return {
          flag:true,
        }
      },
      components:{Popover,Clocker},
      mounted:function(){
      },
      methods:{
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .content{
        margin-top:10px;
        .button{
            width: 10px;
            height:10px;
            border-radius: 100%;
            background: red;
            margin-left:10px;
        }
      .baidumap{
        margin-top:100px;
        input[type=text]{
          border: 1px solid #aaa;
        }
      }
    }
</style>

