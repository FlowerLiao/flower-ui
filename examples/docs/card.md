
>## Card 卡片

1、基础用法
<div class="demo-block clearfix">
  	<fl-card span="4">
       <template slot="header">
           <div class="fl-card-title">
               Header
           </div>
       </template>
       Body
       <template slot="footer">
           Footer
       </template> 
    </fl-card>
    <fl-card span="4" header-border footer-border>
       <template slot="header">
           <div class="fl-card-title">
               Header
           </div>
       </template>
       body
       <template slot="footer">
           footer
       </template> 
    </fl-card>
    <fl-card span="4" footer-border>
       No Header.
       <template slot="footer">
           footer
       </template> 
    </fl-card>
    <fl-card span="6">
       No Header and Footer.
    </fl-card>
    <fl-card span="6" header-border footer-border :box-shadow="false">
       <template slot="header">
           <div class="fl-card-title">
               Header
           </div>
       </template>
       No Box Shadow.
       <template slot="footer">
           footer
       </template> 
    </fl-card>
</div>

::: demo
```html
<fl-card span="4">
   <template slot="header">
       <div class="fl-card-title">
           Header
       </div>
   </template>
   Body
   <template slot="footer">
       Footer
   </template> 
</fl-card>

<!-- header-border & header-border -->
<fl-card span="4" header-border header-border>
   <template slot="header">
       <div class="fl-card-title">
           Header
       </div>
   </template>
   body
   <template slot="footer">
       footer
   </template> 
</fl-card>

<!-- No Header -->
<fl-card span="4" footer-border>
   No Header.
   <template slot="footer">
       footer
   </template> 
</fl-card>

<!-- No Header and Footer -->
<fl-card span="6">
   No Header and Footer.
</fl-card>

<!-- No Box Shadow -->
<fl-card span="6" header-border footer-border :box-shadow="false">
   <template slot="header">
       <div class="fl-card-title">
           Header
       </div>
   </template>
   No Box Shadow.
   <template slot="footer">
       footer
   </template> 
</fl-card>
```
:::

2、可进行全屏缩放

<div class="demo-block clearfix">
    <fl-card span="8" header-border footer-border scalable>
       <template slot="header">
            Header
       </template>
       点击右上角缩放图标
    </fl-card>
</div>

::: demo
```html
<fl-card span="8" header-border footer-border scalable>
   <template slot="header">
        Header
   </template>
   点击右上角缩放图标
</fl-card>
```
:::

<p class="tip">参数说明</p>

键|值类型|说明|可取值|默认值
-|-|-|-|-
span|Number|卡片宽度|对应栅格类fl-col-*|无
box-shadow|Boolean|是否显示阴影||true
header-border|Boolean|是否显示头部分割线||false
footer-border|Boolean|是否显示尾部分割线||false
scalable|Boolean|是否可放大到全屏||false
on-scale|Function(scaleType)|卡片进行缩放时的处理方法|scaleType: "in","out"|
