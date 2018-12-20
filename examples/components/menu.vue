<template>
    <div class="menu-wapper">
        <ul class="menu-list">
            <li v-for="menu in menus" class="menu-item">
                <router-link :to="{name: menu.path}">{{menu.name}}</router-link>
                <template v-if="menu.children && menu.children.length">
                    <ul class="sub-menu">
                        <li v-for="sub in menu.children" class="menu-item">
                            <router-link :to="{name: sub.path}">{{sub.name}}</router-link>
                        </li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
    
</template>

<script>
    import Menu from "@/menu.json"
    export default {
        name: 'main-menu',
        data(){
            return {
                menus: Menu.menus
            }
        }
    }
</script>

