<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script>
import Layout from 'views/layout/Layout'

export default {
    name: 'App',
    components: {
        Layout
    }
}
</script>

<style>
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    box-sizing: content-box;
}

body,
div,
span,
a,
p,
ul,
li,
ol,
h1,
h2,
h3,
table,
tbody,
thead,
tfoot,
tr,
td,
th {
    margin: 0;
    padding: 0;
}
</style>
