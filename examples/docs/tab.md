
>## Tab 标签页

1、基础用法
<div class="demo-block clearfix">
  	<fl-tab>
        <fl-tab-item label="Tab1" active>
            <!-- 标签页内容 -->
            <div>
                Content of tab1 
            </div>
        </fl-tab-item>
        <fl-tab-item label="Tab2">
            Content of tab2
        </fl-tab-item>
    </fl-tab>
</div>

::: demo
```html

```
:::

<p class="tip"> ami-tab参数说明</p>

键|值类型|说明|默认值
-|-|-|-|-
height|String|设置tab内容页高度|auto
on-change|Function(index,tab)|tab切换时处理方法|
delay-render|Boolean|是否延迟加载tab内容，即是否点击到这个tab再渲染它的内容|false

<p class="tip"> ami-tab-item参数说明</p>

键|值类型|说明|默认值
-|-|-|-|-
label|String|Tab标签显示文字|
name|String|标签页名字|
link|String|标签项渲染为链接|
active|Boolean|设置当前tab页默认显示|默认显示第一个tab页
on-click|Function(index,tab)|切换到当前tab页时处理方法|