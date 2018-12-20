
>## Button 按钮

1、默认样式
<div class="demo-block">
  	<fl-button>Default</fl-button>
    <fl-button type="search" disabled>Disabled</fl-button>
</div>

::: demo
```html
<fl-button>Default</fl-button>
<fl-button type="search" disabled>Disabled</fl-button>
```
:::

2、图标： 通过``type``字段设置按钮图标，icon中的所有值均可用，部分type有特殊颜色，其余均为蓝色
<div class="demo-block">
    <fl-button type="search">Search</fl-button>
    <fl-button type="add">add</fl-button>
    <fl-button type="delete">delete</fl-button>
    <fl-button type="return">return</fl-button>
    <fl-button type="assign">Assign</fl-button>
</div>

::: demo
```html
<fl-button type="search">Search</fl-button>
<fl-button type="add">add</fl-button>
<fl-button type="delete">delete</fl-button>
<fl-button type="return">return</fl-button>
<fl-button type="assign">Assign</fl-button>
```
:::

3、颜色： 通过``color``字段设置按钮颜色
<div class="demo-block">
	<fl-button color="white">White</fl-button>
    <fl-button color="blue">Blue</fl-button>
    <fl-button color="green">Green</fl-button>
    <fl-button color="yellow">Yellow</fl-button>
    <fl-button color="red">Red</fl-button>
</div>

::: demo
```html
<fl-button color="white">White</fl-button>
<fl-button color="blue">Blue</fl-button>
<fl-button color="green">Green</fl-button>
<fl-button color="yellow">Yellow</fl-button>
<fl-button color="red">Red</fl-button>
```
:::

4、大小： 通过``size``字段设置按钮大小，可选值：``medium``、``small``、``mini``
<div class="demo-block">
    <fl-button color="blue">Normal</fl-button>
    <fl-button color="blue" size="medium">Medium</fl-button>
    <fl-button color="blue" size="small">Small</fl-button>
    <fl-button color="blue" size="mini">Mini</fl-button>
</div>

::: demo
```html
<fl-button color="blue">Normal</fl-button>
<fl-button color="blue" size="medium">Medium</fl-button>
<fl-button color="blue" size="small">Small</fl-button>
<fl-button color="blue" size="mini">Mini</fl-button>
```
:::

5、按钮组合

<div class="demo-block clearfix">
    <div class="fl-btn-group fl-col-8">
        <fl-button color="blue">First Button</fl-button>
        <fl-button color="red">Secend Button</fl-button>
        <fl-button color="yellow">Last Button</fl-button>
    </div>
    <div class="fl-btn-group m-l-30 fl-col-4">
        <fl-button color="blue">With Icon</fl-button>
        <fl-button type="angle_right"></fl-button>
    </div>
</div>

::: demo
```html
<div class="fl-btn-group">
    <fl-button color="blue">First Button</fl-button>
    <fl-button color="red">Secend Button</fl-button>
    <fl-button color="yellow">Last Button</fl-button>
</div>
<div class="fl-btn-group">
    <fl-button color="blue">With Icon</fl-button>
    <fl-button type="angle_right"></fl-button>
</div>
```
:::

6、Show More 显示更多：通过``show-more``字段设置

``show-more``通过target关联控制元素

<div class="demo-block clearfix">
    <div class="fl-btn-group">
        <fl-button color="blue">Show More</fl-button>
        <fl-button type="angle_down" show-more target="showmore"></fl-button>
    </div>
    <div id="showmore" class="hide">这里有更多信息</div>
</div>

::: demo
```html
<div class="fl-btn-group">
    <fl-button color="blue">Show More</fl-button>
    <fl-button type="angle_down" show-more target="showmore"></fl-button>
</div>
<div id="showmore" class="hide">这里有更多信息</div>
```
:::

<p class="tip">参数说明：<font color="red">列表中未列出的原生属性使用方式不变</font></p>

键|值类型|说明|可取值|默认值
-|-|-|-|-
type|String|按钮图标类型|icon列表中的所有值|无
color|String|按钮颜色|white,blue,green,yellow,red|部分type有默认color值
size|String|按钮大小|medium,small,mini|无
show-more|Boolean|是否对紧邻当前按钮的fl-btn-group父类的元素进行显示控制||false