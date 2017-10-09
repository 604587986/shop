<template>
    <div class="hello">
        <el-card class="box-card">
            <h1>卡片: 高度可定制</h1>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'peopleage',
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.hello {
    padding: 20px;
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
}
</style>
