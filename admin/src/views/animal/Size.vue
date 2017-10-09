<template>
    <div class='size'>
        <el-color-picker v-model="color3" show-alpha></el-color-picker>
    </div>
</template>

<script>
export default {
    name: 'AnimalSize',
    data() {
        return {
            color3: 'rgba(19, 206, 102, 0.8)'
        }
    },
    mounted() {
        // $('.test').selectize({
        //     valueField: 'id',
        //     labelField: 'name',
        //     options: [{ id: 1, name: '颜色' }],
        //     create: false,
        //     sortField: 'text',
        //     onChange: id => {
        //         const selectize = $select[0].selectize;
        //         // 刷新规格项
        //         refreshOptions(selectize, id);
        //         // 重置DOM和数据
        //         resetSpec(which);
        //         insertSpecTable();

        //         // 显示隐藏表格容器div
        //         if (skuDOM.find('.sku-table .tr-quantity-div tr').length === 0) {
        //             skuDOM.find('.sku-table .tr-quantity-div').css('display', 'none');
        //         } else {
        //             skuDOM.find('.sku-table .tr-quantity-div').css('display', 'flex');
        //         }
        //     }
        // })
    },
    created() {
        // console.log('$', selectize)
    }
}
</script>

<style scoped>
.size {
    padding: 20px;
}
</style>
