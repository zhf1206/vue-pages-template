<template>
  <div :class="winClass" id="popMsg" v-show="showPop">
    <!-- 带Header弹出层页面 -->
    <div v-if="winType=='0'" class="container">
      <div v-if="winType=='0'" v-show="showTitle" class="pop-head">
        <div class="left"><i class="icon" @click="closeWin"></i><span v-show="icoLeftTitle" v-text="leftTitle"></span></div>
        <div class="title" v-text="layTitle"></div>
        <div class="right"><span v-show="icoRightTitle" v-text="rightTitle"></span></div>
      </div>
      <div v-if="!showSlot" class="content" v-text="content" v-html="contentHtml"></div>
      <div v-if="showSlot" class="content"><slot></slot></div>
    </div>
    <!-- 弹出层显示内容 -->
    <div v-if="winType=='1'" class="container">
      <div class="pop-head1"><span class="close" @click="closeWin"></span></div>
      <div v-if="!showSlot" class="content" v-text="content" v-html="contentHtml"></div>
      <div v-if="showSlot" class="content"><slot></slot></div>
    </div>
  </div>
</template>
<script>
import {Hi} from "assets/js/ddbase";
  export default {
    data:function(){
      return {
        title:"提示框",
        showPop:false,
        showSlot:false
      }
    },
    comments:{Hi},
    props:{
      winType:{
        type:String,
        default:"0"
      },
      open:{
        type:Boolean,
        default:false
      },
      showTitle:{
        type:Boolean,
        default:true
      },
      layTitle:{
        type:String,
        default:""
      },
      icoLeftTitle:{
        type:Boolean,
        default:false
      },
      leftTitle:{
        type:String,
        default:"关闭"
      },
      icoRightTitle:{
        type:Boolean,
        default:false
      },
      rightTitle:{
        type:String,
        default:"首页"
      },
      content:{
        type:String,
        default:""
      },
      contentHtml:{
        type:String,
        default:""
      },
      options: {
        type: Object
      }
    },
    computed:{
      winClass:function(){
        //不同类型切换Class
        switch(this.winType){
          case "0":
            return "hiapp-pop-msg";
            break;
          case "1":
            return "hiapp-pop-msg1";
            break;
          default:
            return "hiapp-pop-msg";
        }
      }
    },
    methods:{
      openWin:function(){
        //显示组件
        Hi.setOverflowHidden();
        this.showPop = true;
      },
      closeWin:function(){
        //关闭组件
        Hi.removeOverflowHidden();
        this.showPop = false
      }
    },
    watch:{
      content:function(){
        if(this.content!=""){
          //显示文本内容
          this.contentHtml = "";
        }
        if(this.content==""&&this.contentHtml==""){
          //显示插槽内容
          this.showSlot = true;
        }
      },
      contentHtml:function(){
        if(this.contentHtml!=""){
          //显示html内容
          this.content = "";
        }
        if(this.content==""&&this.contentHtml==""){
          //显示插槽内容
          this.showSlot = true;
        }
      }
    },
    mounted:function(){
      //初始化信息
      this.showPop = this.open;
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
.fl{float: left;}
.fr{float: right;}
.hiapp-pop-msg{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 9999;
  background: #fff;
  overflow: hidden;
  .pop-head{
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    width:100%;
    height:44px;
    line-height: 44px;
    font-size: 16px;
    color:#191919;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    .left{
      width:44px;
      padding-left:15px;
      font-size: 14px;
    }
    .title{
      flex:1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right{
      width:60px;
    }
    .icon{
      width:44px;
      height:44px;
      position: absolute;
      left:0;
      right:0;
      background: url("./back.png") no-repeat 12px center;
      -webkit-background-size:24px;
      background-size:24px;
    }
    .icon-right:after{
      content:"";
      position: absolute;
      width:12px;
      height: 12px;
      top:13px;
      border-top:2px solid #afafaf;
      border-left:2px solid #afafaf;
      transform: rotate(180deg);
    }
  }
  .container{
    height: 100%;
    overflow: hidden;
  }
  .content{
    position: relative;
    height: 90%;
    line-height: 22px;
    padding: 10px 12px;
    background-color: #fff;
    font-size:15px;
    color:#333333;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .modal-scale-transition{
    transition: transform,opacity .3s ease;
  }

  .modal-scale-enter,
  .modal-scale-leave {
      opacity: 0;
  }

  .modal-scale-enter {
    transform: scale(1.1);
  }
  .modal-scale-leave {
    transform: scale(0.8);
  }
}
.pop-msg1{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  z-index: 999;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  background-color:rgba(0,0,0,0.5);
  overflow: hidden;
  .pop-head1{
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    .close{
      display:block;
      width:30px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background-color: #7f7f7f;
      float: right;
      margin-top:5px;
      margin-right:10px;
      text-align: center;
      font-size: 16px;
    }
    .close:after{
      content:"\2716";
      position: relative;
      width:28px;
      height: 28px;
      line-height: 28px;
      color:#fff;
      text-align: center;
      top:1px;
      left:0;
    }
  }
  .container{
    width:90%;
    height: 95%;
    margin: 5% auto;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }
  .content{
    position: relative;
    padding:10px;
    height:90%;
    background-color: #fff;
    overflow-y: auto;
  }
}
</style>
