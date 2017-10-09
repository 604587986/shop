<template>
    <div class="hello">
        <div class="block">
            <el-date-picker v-model="value6" type="daterange" placeholder="默认">
            </el-date-picker>
        </div>
        <div class="block">
            <el-date-picker v-model="value7" type="daterange" align="right" placeholder="带快捷选项" :picker-options="pickerOptions2">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
export default {
    name: 'peoplename',
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value6: '',
            value7: ''
        }
    }
}
</script>

<style scoped>
.hello {
    padding: 20px;
}
</style>
