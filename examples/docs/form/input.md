
>## Input 文本框

1、文本框

``type``默认值为``text``,除标签改为``fl-input``之外与``input``原生标签无任何不同

<div class="demo-block">
  	<fl-input type="text" v-model="search.remark"></fl-input>
    <!-- type="text"可省略 -->
    <fl-input />
</div>

<script>
  export default {
    data() {
        return {
            search: {}
        };
    }
  }
</script>


::: demo
```html
<fl-input type="text"></fl-input>
<!-- type="text"可省略 -->
<fl-input />
```
:::

2、textarea 长文本框

除标签改为``fl-textarea``之外与``textarea``原生标签无任何不同

<div class="demo-block">
    <fl-textarea type="text"></fl-textarea>
</div>

::: demo
```html
<fl-textarea type="text"></fl-textarea>
```
:::