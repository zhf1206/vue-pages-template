<template>
  <div class="hiapp-help" @click="closeWin" v-show="showWin">
    <div class="container_Help">
      <div class="title" v-text="title"></div>
      <div v-if="!showSlot" class="content" v-text="content">
      </div>
      <div v-if="showSlot" class="content"><slot></slot></div>
    </div>
  </div>
</template>
<script type="text/ECMAScript-6">
import Util from "assets/js/global";
import {Hi} from "assets/js/ddbase";
export default {
  data:function(){
    return {
      showWin:false,
      showSlot:false,
      contents:""
    }
  },
  comments:{Hi},
  props:{
    title:{
        type:String,
        default:"微分使用规则"
    },
    content:{
        type:String,
        default:"目前仅支持微分全额抵扣；若微分不足以抵扣费用全额，则不可使用。"
    }
  },
  methods:{
    closeWin:function(){
      Hi.removeOverflowHidden();
      this.showWin = false;
    },
    openWin:function(){
      Hi.setOverflowHidden();
      this.showWin = true;
    }
  },
  mounted:function(){
    this.contents = this.content;
  }
}
</script>
<style lang="less">
.hiapp-help{
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,.6);
  overflow: hidden;
  .container_Help{
    position: absolute;
    width:279px;
    height:118px;
    border-radius: 4px;
    background-color: #ffffff;
    top:50%;
    left:50%;
    margin-top:-60px;
    margin-left:-139px;
    .title{
      display: inline-block;
      width: 100%;
      margin-top:16px;
      margin-bottom: 12px;
      font-size: 15px;
      text-align: center;
      color: #000000;
    }
    .content{
      line-height: 25px;
      margin:0 24px;
      color:#8d8d8d;
      font-size:13px;;
    }
  }
}
</style>
