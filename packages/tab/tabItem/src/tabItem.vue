<template>
    <div :class="{'fl-tab-panel': true,'active': index == $parent.currentIndex}" 
        v-if="!$parent.delayRenderContent || item.loaded || (!item.loaded && index == $parent.currentIndex)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'FlTabItem',
        props: {
            "label": String,
            "name": String,
            "show": {
                type: Boolean,
                default: true
            },
            "link": String,
            "active": false,
            "on-click": Function
        },
        data(){
            return {
                index: 0,
                item: {}
            }
        },
        created () {
            this.index = this.$parent.tabItems.length;
            this.item = {
                label: this.label,
                name: this.name,
                show: this.show,
                link: this.link,
                loaded: false,
                "on-click": this.onClick
            };
            this.$parent.tabItems.push(this.item);
            if(this.active || this.active === ""){
                this.$parent.currentIndex = this.index;
            }
        }
    }
</script>