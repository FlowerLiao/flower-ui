<!--
    输入框
    JiaLing Liao
    2018-07-23
-->
<template>
    <input :type="type" v-model="tempValue"
        v-bind="$attrs" v-on="listeners" v-on:change="formatValue" inheritAttrs:false/>
</template>

<script>
    export default {
        name: 'FlInput',
        props: {
            "value": "",
            "type": {
                type: String,
                default: "text"
            }
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