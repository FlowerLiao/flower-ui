<template>
    <div id="flower">
        <header>
            <div class="header-container">
                <div class="slogan">他穷得只剩一朵花  是这个世界崩塌前最后一个傻瓜</div>
            </div>
        </header>
        <main-menu></main-menu>
        <div class="main-container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Menu from "./components/menu"
    export default {
        name: 'Flower',
        methods: {
        },
        components: {
            "main-menu": Menu
        }
    }
</script>

<style>
    #flower {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
