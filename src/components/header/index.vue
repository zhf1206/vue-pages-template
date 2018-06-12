<template>
    <div class="MTS_header">
        <div class="backbtn" @click="backTo"></div>
        {{title}}
        <ul class="buttons">
            <li v-for="button in buttons">
                <div v-if="button.type == 'button'" class="button" :class="button.cls" @click="$emit(button.callBack)"></div>
                <div v-if="button.type == 'text'" class="text" :class="button.cls" @click="$emit(button.callBack)">{{button.text}}</div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ECMAScript-6">
    import {backTo} from 'assets/js/ddbase';
    export default{
        props:['backUrl','linkTo','title','buttons','backFun'],
        methods:{
            backTo: function () {
                //订单详情按钮
                if(this.linkTo){
                    return location.href = this.linkTo;
                }else if(this.backFun) {
                    this.backFun();
                }else{
                    backTo(this.backUrl);
                }

            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .MTS_header{
        height:44px;
        line-height:44px;
        background-color: #fff;
        text-align: center;
        color: #191919;
        position: fixed;
        top:0;
        left:0;
        right:0;
        z-index: 102;
        border-bottom:1px solid #efefef;
        box-sizing: border-box;
      overflow: hidden;
        .backbtn{
            width:44px;
            height:44px;
            position: absolute;
            left:0;
            right:0;
            background: url("./back.png") no-repeat 12px center;
            -webkit-background-size:24px;
            background-size:24px;
        }
        .buttons{
            position: absolute;
            right:0;
            top:0;
            .button{
                float:right;
                width:44px;
                height:44px;
                -webkit-background-size:24px;
                background-size:24px;
            }
            .text{
                font-size:15px;
                color:#000;
                padding: 0 12px;
            }
        }
    }
</style>
