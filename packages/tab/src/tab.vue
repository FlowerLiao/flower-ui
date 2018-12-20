<!--
    tab
    JiaLing Liao
    2018-09-03
-->
<template>
    <div class="fl-tabs-container">
        <ul class="nav-tabs">
            <template v-for="(item,index) in tabItems">
                <li v-if="item.show" :name="item.name"
                    :class="{'active': currentIndex == index}" 
                    v-on:click="tabItemClick(index,item)">
                    <template v-if="item.link">
                        <router-link :to="item.link">{{item.label}}</router-link>
                    </template>
                    <template v-else>
                        <a>{{item.label}}</a>
                    </template>
                </li>
            </template>
        </ul>
        <div class="fl-tab-content" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FlTab',
        props: {
            "height": "",
            "class-name": String,
            "on-change": Function,
            "delay-render": "" //是否延迟加载tab内容，即是否点击到这个tab再渲染它的内容
        },
        data () {
            return {
                tabItems: [],
                currentIndex: 0
            }
        },
        computed: {
            styles: function(){
                return {
                    height: this.height ? this.height : "auto",
                }
            },
            delayRenderContent: function(){
                return this.delayRender == undefined ? false : true;
            }

        },
        mounted: function(){
            this.tabItemClick(this.currentIndex,this.tabItems[this.currentIndex]);
        },
        methods: {
            tabItemClick: function(index,item){
                if(item){
                    this.currentIndex = index;
                    item.loaded = true;

                    //tab点击事件
                    let clickFun = item.onClick;
                    if(clickFun && typeof clickFun == "function"){
                        clickFun(index,item);
                    }

                    //tab切换事件
                    let changeFun = this.onChange;
                    if(changeFun && typeof changeFun == "function"){
                        changeFun(index,item);
                    }
                }
            }
        }
    }
</script>