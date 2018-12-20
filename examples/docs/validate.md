
>## Validate 表单校验

1、基本用法

<div class="demo-block">
    <div class="form-row">
        <div class="form-item">
            <label class="fl-col-8 required">Required 必填</label>
            <fl-input name="required"></fl-input>
        </div>
    </div>
    <div class="form-row">
        <div class="form-item">
            <label class="fl-col-8">Number 数字</label>
            <fl-input name="number"></fl-input>
        </div>
    </div>
    <div class="text-center">
        <fl-button v-on:click="checkForm1()">校验表单</fl-button>
    </div>
</div>

::: demo
```html
<div class="form-row">
    <div class="form-item">
        <label class="fl-col-8 required">Required 必填</label>
        <fl-input name="required"></fl-input>
    </div>
</div>
<div class="form-row">
    <div class="form-item">
        <label class="fl-col-8">Number 数字</label>
        <fl-input name="number"></fl-input>
    </div>
</div>
<div class="text-center">
    <fl-button v-on:click="checkForm()">校验表单</fl-button>
</div>

<script>
  export default {
    methods: {
        checkForm: function(){
            return this.validate([{
                el: ["input[name=required]"],
                rules: [{   
                    type: 'null'
                }]
            },{
                el: ["input[name=number]"],
                rules: [{   
                    type: 'number'
                }]
            }]);
        }
    }
  }
</script>
```
:::

2、多种类型混合

<div class="demo-block">
    <div class="form-row">
        <div class="form-item">
            <label class="fl-col-8 required">Required&&Number 必填且为数字</label>
            <fl-input name="required_number"></fl-input>
        </div>
    </div>
    <div class="text-center">
        <fl-button v-on:click="checkForm2()">校验表单</fl-button>
    </div>
</div>

::: demo
```html
<div class="form-row">
    <div class="form-item">
        <label class="fl-col-8 required">Required&&Number 必填且为数字</label>
        <fl-input name="required_number"></fl-input>
    </div>
</div>
<div class="text-center">
    <fl-button v-on:click="checkForm()">校验表单</fl-button>
</div>

<script>
  export default {
    methods: {
        checkForm: function(){
            return this.validate([{
                el: ["input[name=required_number]"],
                rules: [{   
                    type: 'null'
                },{   
                    type: 'number'
                }]
            }]);
        }
    }
  }
</script>
```
:::

3、图标提示

<div class="demo-block">
    <div class="form-row">
        <div class="form-item">
            <label class="fl-col-8 required">Required 必填</label>
            <fl-input name="required_icon"></fl-input>
        </div>
    </div>
    <div class="text-center">
        <fl-button v-on:click="checkForm3()">校验表单</fl-button>
    </div>
</div>

::: demo
```html
<div class="form-row">
    <div class="form-item">
        <label class="fl-col-8 required">Required 必填</label>
        <fl-input name="required_icon"></fl-input>
    </div>
</div>
<div class="text-center">
    <fl-button v-on:click="checkForm()">校验表单</fl-button>
</div>

<script>
  export default {
    methods: {
        checkForm: function(){
            return this.validate([{
                el: ["input[name=required_icon]"],
                layout: "icon",
                rules: [{
                    type: 'null'
                }]
            }]);
        }
    }
  }
</script>
```
:::

4、自定义校验错误提示语

<div class="demo-block">
    <div class="form-row">
        <div class="form-item">
            <label class="fl-col-8 required">Required 必填</label>
            <fl-input name="required_errormsg"></fl-input>
        </div>
    </div>
    <div class="text-center">
        <fl-button v-on:click="checkForm4()">校验表单</fl-button>
    </div>
</div>

::: demo
```html
<div class="form-row">
    <div class="form-item">
        <label class="fl-col-8 required">Required 必填</label>
        <fl-input name="required_icon"></fl-input>
    </div>
</div>
<div class="text-center">
    <fl-button v-on:click="checkForm()">校验表单</fl-button>
</div>

<script>
  export default {
    methods: {
        checkForm: function(){
            return this.validate([{
                el: ["input[name=required_errormsg]"],
                rules: [{
                    type: 'null',
                    message: "这是自定义的提示."
                }]
            }]);
        }
    }
  }
</script>
```
:::

<p class="tip">参数说明</p>

键|值类型|说明|可取值|默认值
-|-|-|-|-
el|String|需要被校验的元素选择字符串||
layout|String|校验错误提示方式|icon(图标方式)|文字方式
rules|Array|校验规则||

<p class="tip">type取值说明</p>

取值|说明
-|-
null|空 
number| 数字
num-letter|数字和字母
int|整数
non-neg-int|非负整数
positive-int|正整数
float|浮点型
non-neg-float|非负浮点型
positive-float|正浮点型
positive-number|正数
number-limit|数值大小和小数位,默认最小值0，最大值9999999999.99，小数位数2 
email|邮箱

<script>
  export default {
    data() {
        return {
            testValue: ""
        };
    },
    methods: {
        checkForm1: function(){
            return this.validate([{
                el: ["input[name=required]"],
                rules: [{   
                    type: 'null'
                }]
            },{
                el: ["input[name=number]"],
                rules: [{   
                    type: 'number'
                }]
            }]);
        },
        checkForm2: function(){
            return this.validate([{
                el: ["input[name=required_number]"],
                rules: [{   
                    type: 'null'
                },{   
                    type: 'number'
                }]
            }]);
        },
        checkForm3: function(){
            return this.validate([{
                el: ["input[name=required_icon]"],
                layout: "icon",
                rules: [{
                    type: 'null'
                }]
            }]);
        },
        checkForm4: function(){
            return this.validate([{
                el: ["input[name=required_errormsg]"],
                rules: [{
                    type: 'null',
                    message: "这是自定义的提示."
                }]
            }]);
        }
    }
  }
</script>