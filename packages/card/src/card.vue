<!--
    卡片
    JiaLing Liao
    2018-07-24
-->
<template>
    <div :class="'fl-card-wrapper' + (span ? (' fl-col-' + span) : '')">
        <div :class="classes">
            <i class="scalable-icon fl-icon-maximize" v-on:click="scaleView()" v-if="scalable"></i>
            <div :class="{'fl-card-header': true,'border': headerBorder}" v-if="$slots.header">
                <slot name="header"></slot>
            </div>
            <div class="fl-card-body">
                <slot></slot>
            </div>
            <div :class="{'fl-card-footer': true,'border': footerBorder}" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'FlCard',
        props: {
            "span": [Number,String], //卡片宽度：1-24
            "box-shadow": { //是否显示阴影
                type: Boolean,
                default: true
            },
            "header-border": { //是否显示头部分割线
                type: Boolean,
                default: false
            },
            "footer-border": { //是否显示尾部分割线
                type: Boolean,
                default: false
            },
            "scalable": { //是否可放大到全屏
                type: Boolean,
                default: false
            },
            "on-scale": Function
        },
        data(){
            return {
                zoom: "out" //当前缩放类型
            }
        },
        computed: {
            classes: function(){
                let classObj = {
                    "fl-card-container": true,
                    "shadow": this.boxShadow,
                    "scaled": this.zoom == "in"
                };

                return classObj;
            }
        },
        methods: {
            scaleView: function(){
                this.zoom = this.zoom == "in" ? "out" : "in";
                if(this.onScale){
                    this.onScale(this.zoom);
                }
            }
        }
    }
</script>