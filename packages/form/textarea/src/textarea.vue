<!--
    长文本输入框
    JiaLing Liao
    2018-07-23
-->
<template>
    <textarea v-model="tempValue" v-on:change="formatValue"
        v-bind="$attrs" v-on="listeners" inheritAttrs:false></textarea>
</template>

<script>
    export default {
        name: 'FlTextarea',
        props: {
           "value": ""
        },
        data () {
            return {
            }
        },
        computed: {
            tempValue: {
                get:function() {
                    return this.value;
                },
                set:function(val) {
                    this.$emit('input', val)
                }
            },
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => {
                        this.tempValue =  event.target.value;
                    }
                }
            }
        },
        methods: {
            formatValue: function(){
                if(this.tempValue){
                    this.tempValue = this.tempValue.trim();
                }
            }
        }
    }
</script>