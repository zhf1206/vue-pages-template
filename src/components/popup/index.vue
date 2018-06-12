<template>
  <div class="component_popup" v-if="showWin">
    <div class="component_popup_box">
      <div class="foot_bos" :class="popObj.popP5?'addClass':''" :style="{padding:popObj.popP1?popObj.popP1+'px':12+'px'}" v-html="popObj.popText"></div>
      <div class="foot_names" v-if="popObj.popFoot" v-for="item in popObj.popFoot" :style="{padding:popObj.popP2?popObj.popP2+'px':12+'px'}">{{ item }}</div>
      <div class="trueFn" @click="cancelFns" v-if="popObj.popIndex == 1">确定</div>
      <div  v-if="popObj.popIndex == 2" class="trueFnTwo">
        <div @click="cancelFns">{{ popObj.popFalse?popObj.popFalse:'取消' }}</div>
        <div @click="confirmFns">{{ popObj.popTrue?popObj.popTrue:'确定' }}</div>
      </div>

    </div>
  </div>
</template>

<script type="text/ECMAScript-6">
  import Vue from 'vue';
  import Util from 'assets/js/global';
  import {Hi} from 'assets/js/ddbase';
  export default{
    data: function () {
      return {
        showWin:false
      }
    },
    props:{
      popObj:{
        type:Object,
        default:function () {
          return {
            popText:{                   //文字
              type:String,
              default:""
            },
            popIndex:{                  //1确定  2取消+确定
              type:Number,
              default:1
            },
            popTrue:{
              type:String,
              default:"确定"
            },
            popFalse:{
              type:String,
              default:"取消"
            },
            popSure:{                         //点击确定后的业务逻辑
              type:Function,
              default:function () {
                return function () {
                }
              }
            },
            popFnFalse:{                         //点击取消后的业务逻辑
              type:Function,
              default:function () {
                return function () {
                }
              }
            },
          }
        }
      }
    },
    methods:{
      closeWin:function(){
        //TODO 关闭弹窗
        Hi.removeOverflowHidden();
        this.showWin = false;
      },
      openWin:function(){
        //TODO 打开弹窗
        Hi.setOverflowHidden();
        this.showWin = true;
      },
      cancelFns:function () {
        //关闭
        if(this.popObj.popFnFalse){
          this.popObj.popFnFalse()
          this.closeWin();
        }else {
          this.closeWin();
        }

      },
      confirmFns:function () {
        if(this.popObj.popSure){
          this.popObj.popSure();
          this.closeWin();
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .component_popup{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .component_popup_box{
      width: 270px;
      opacity: 0.9;
      border-radius: 6px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: #ffffff;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
     transform: translate(-50%,-50%);
      /*transform: translateY(-50%);*/
      .trueFn{
        width: 100%;
        height: 44px;
        text-align: center;
        color: #fd951e;
        font-size: 17px;
        letter-spacing: -0.3px;
        line-height: 44px;
      }
      .foot_bos{
        padding: 16px 16px 20px;
        font-size: 17px;
        line-height: 1.29;
        text-align: center;
        color: #191919;
        overflow: hidden;
        max-height: 300px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .addClass{
        text-align: left;
        line-height: 25px;
      }
    }
  }
  .trueFnTwo{
    width: 100%;
    height:44px;
    line-height: 44px;
    border-top:1px solid #e9e9e9;
    div{
      width: 130px;
      height: 44px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      font-size: 17px;
      letter-spacing: -0.4px;
      color: #fd951e;
    }
    div:nth-of-type(1){
      border-right: 1px solid #d9d9d9;
      box-sizing: border-box;
    }
  }
.foot_names{
  font-size: 17px;
  font-weight: 600;
  line-height: 1.29;
  text-align: center;
  color: #333333;
  padding-bottom: 20px;
}
</style>



