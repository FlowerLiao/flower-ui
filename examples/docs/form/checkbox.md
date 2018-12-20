
>## Checkbox 复选框

1、基础用法

通过``true-value/false-value``设置选中及取消选择值，默认值为``true/false``

<div class="demo-block checkboxs">
  	<fl-checkbox>checkbox</fl-checkbox>
  	<fl-checkbox checked>Default Checked 默认选中</fl-checkbox>
  	<fl-checkbox disabled>Disabled 禁用</fl-checkbox>
</div>

::: demo
```html
<fl-checkbox v-model="yourValue" true-value="checked this checkbox">checkbox</fl-checkbox>
<fl-checkbox checked>Default Checked 默认选中</fl-checkbox>
<fl-checkbox disabled>Disabled 禁用</fl-checkbox>
```
:::

<script>
	export default {
		data(){
			return {
				yourValue: ""
			}
		}
	}
</script>

<style>
	.checkboxs .fl-checkbox + .fl-checkbox{
		margin-left: 200px;
	}
</style>
