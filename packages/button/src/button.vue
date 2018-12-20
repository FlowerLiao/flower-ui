<!--
    按钮
    JiaLing Liao
    2018-07-20
-->
<template>
    <button type="button" :class="classes" @click="handleClick" :disabled="disabled">
        <i v-if="type" :class="'fl-icon-' + (tempType || type)"></i>
        <slot></slot>
    </button>
</template>
<script>
    export default{
        name: 'FlButton',
        props: {
            type: String, //按钮图标类型
            color: String, //按钮颜色
            size: String, //按钮大小
            disabled: { //是否可操作
                type: Boolean,
                default: false
            },
            "show-more": {
                type: [Boolean,String],
                default: false
            },
            target: String
        },
        computed: {
            classes: function(){
                let color = this.color;
                if(!color && this.type){
                    switch(this.type){
                        case "search":
                        case "import":
                        case "export":
                            color = "blue";
                            break;
                        case "add":
                        case "submit":
                            color = "green";
                            break;
                        case "delete":
                            color = "yellow";
                            break;
                        case "return":
                        case "cancel":
                        case "close":
                            color = "white";
                            break;
                        default: 
                            color = "blue";
                    }
                }
                
                return "fl-btn" + (this.$slots.default ? '' : ' auto') + (color ? (" fl-btn-" + color) : "") + 
                       (this.size ? (" fl-btn-" + this.size) : "");
            },
            _showMore: function(){
                return this.showMore && this.showMore != "false" ? true : false;
            }
        },
        data () {
            return {
                tempType: "",
                timer: null
            }
        },
        methods: {
            handleClick(event) {
                if(this._showMore && this.target){
                    let type = this.tempType || this.type,
                        $toggle = document.querySelector("#" + this.target);
                    if($toggle){
                        if(type == "angle_down"){
                            this.tempType = "angle_up";
                            $toggle.classList.remove("hide");
                        } else if(type == "angle_up"){
                            this.tempType = "angle_down";
                            $toggle.classList.add("hide");
                        }
                    }
                }
                if(this.timer){
                    clearTimeout(this.timer);
                }
                let _this = this;
                this.timer = setTimeout(function(){
                    _this.$emit('click', event);
                },10);
            }
        }
    }
</script>