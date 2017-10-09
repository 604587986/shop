<template>
    <select>
    </select>
</template>

<script>
import '@/assets/css/selectize.default.css'
import $ from 'jquery'
// 导入这个$上才会被绑定selectize方法
import 'selectize'
export default {
    props: ['settings', 'data'],
    data() {
        return {
            $selectize: null
        }
    },
    mounted() {
        if (!$().selectize) {
            return
        }
        this.settings.options = this.data
        this.$selectize = $(this.$el).selectize(this.settings)[0].selectize
    },
    watch: {
        data(val) {
            this.$selectize.clearOptions();
            this.$selectize.addOption(val);
        }
    },
    destroyed() {
        if (this.$el.selectize) {
            this.$el.selectize.destroy()
        }
    }
}
</script>

<style>

</style>