<template>
    <div v-click-outside="onClickedOutside">
    <span ref="trigger" @click="toggle">
      <slot>
      </slot>
    </span>
        <div class="vux-popover"
             ref="popover"
             :style="popoverStyle"
             v-show="show">
            <div class="vux-popover-arrow" :class="arrowClass" :style="arrowStyle"></div>
            <div @click="$emit('on-click-content')">
                <slot name="content">
                    <div v-html="content"></div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'popover',
        mounted () {
            this.$nextTick(() => {
                const trigger = this.$refs.trigger.children[0];
                const popover = this.$refs.popover;
                let top = trigger.getBoundingClientRect().top - popover.offsetHeight - this.gutter -16;
                this.position.top = top > 0 ? top : (trigger.getBoundingClientRect().top + trigger.offsetHeight + this.gutter);
                let left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
                this.position.left = left > 0 ? left : 5;
                this.arrowClass = top > 0 ? 'vux-popover-arrow-down' :'vux-popover-arrow-up';
                this.position.arrow = trigger.offsetLeft + trigger.offsetWidth / 2 + (left > 0 ? 0 : -5);
                this.show = false
                this.popoverStyle = {
                    top: this.position.top + 'px',
                    left: this.position.left + 'px',
                    display: 'none'
                }
                this.arrowStyle = {
                    left: this.position.arrow + 'px'
                }
            })
        },
        directives: {
            ClickOutside:{
                bind: function (el, { value }) {
                    let onClickOutside = value
                    el.handler = function (e) {
                        if (el && !el.contains(e.target)) {
                            onClickOutside(e)
                        }
                    }
                    document.addEventListener('click', el.handler, true)
                },
                unbind: function (el) {
                    document.removeEventListener('click', el.handler, true)
                    el.handler = null
                }
            }
        },
        props: {
            content: String,
            gutter: {
                type: Number,
                default: 10
            }
        },
        methods: {
            onClickedOutside () {
                if (this.show) {
                    this.show = false
                    this.$emit('on-hide')
                }
            },
            toggle () {
                this.show = !this.show
                this.$emit(`on-${this.show === true ? 'show' : 'hide'}`)
            }
        },
        data () {
            return {
                position: {
                    top: 0,
                    left: 0
                },
                arrowStyle:{
                    left:0
                },
                arrowClass:'',
                show: true,
                popoverStyle: {}
            }
        }
    }
</script>

<style lang="less">
    @popover-bg-color: rgba(0,0,0,.5);
    @popover-font-color: #fff;
    @popover-border-radius: 3px;
    @popover-border-width: 6px;
   .vux-popover {
        position: absolute;
        left: 0;
        top: 0;
        padding: 8px 12px;
        line-height: 18px;
        margin-right:5px;
        background-color: @popover-bg-color;
        color: @popover-font-color;
        border-radius: @popover-border-radius;
        z-index: 500;
    }
    .vux-popover-arrow {
        position: absolute;
        width: 0;
        height: 0;
    }
    .vux-popover-arrow-up {
        border-left: @popover-border-width solid transparent;
        border-right: @popover-border-width solid transparent;
        border-bottom: @popover-border-width solid rgba(0,0,0,.5);
        top: -@popover-border-width;
    }
    .vux-popover-arrow-down {
        border-left: @popover-border-width solid transparent;
        border-right: @popover-border-width solid transparent;
        border-top: @popover-border-width solid @popover-bg-color;
        bottom: -@popover-border-width;
    }
</style>
