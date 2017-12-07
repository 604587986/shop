<template>
  <div class='sku-editor-container'></div>
</template>

<script>
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/plugins/selector/css/jquery.filesUpload.css'
import '@/plugins/selector/css/selectize.default.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'selectize'
import '@/plugins/selector/js/jquery.filesUpload.js'
import SkuEditor from '@/plugins/selector/js/skueditor.js'

export default {
  name: 'SkuEditor',
  props: ['init', 'categoryID', 'sn'],
  mounted() {
    $('.sku-editor-container').html(
      SkuEditor.getEditorDOM({
        categoryID: this.categoryID
      })
    )
    if (this.init && (this.init.quantity || this.init.quantity === 0)) {
      SkuEditor.initData({
        data: this.init.skuList,
        quantity: this.init.quantity
      })
    }
  },
  methods: {
    getSkuList() {
      return SkuEditor.getSkuList()
    },
    generateSN() {
      return SkuEditor.generateSN(this.sn)
    },
    skuHasChanged() {
      return SkuEditor.skuHasChanged()
    }
  },
  beforeDestroy() {
    $('.sku-editor-container').empty()
  }
}
</script>
<style lang='scss' scoped>
table {
  border-collapse: collapse;
}

div,
span,
input {
  box-sizing: content-box;
}

.sku-container {
  background: #f8f8f8;
  padding: 15px;
}

.sku-container .sku-tr {
  width: 100%;
  margin-top: 1.5rem;
}

.sku-container .sku-tr > div:first-child {
  width: 8%;
}

.sku-container .sku-tr > div:first-child > span {
  float: right;
  margin-top: 0.3rem;
  font-weight: 700;
  color: #333;
}

.sku-container .sku-tr:last-child > div:first-child > span {
  margin-top: 0.5rem;
}

.sku-container .sku-tr .td-body {
  border: 1px solid #e5e5e5;
  background: #fff;
  width: 80%;
}

.sku-container .sku-tr .td-section {
  padding: 20px;
  box-sizing: border-box;
}

.sku-container .sku-tr .td-section .sku-group-item {
  max-width: 1049px;
}

.sku-container .sku-tr .td-section .sku-group-item .bg-grey {
  position: relative;
}

.sku-container .sku-tr .td-section .sku-group-item .bg-grey .delete-item {
  border-radius: 50%;
  background: #bfbfbf;
  color: white;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 19px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}

.sku-container .sku-tr .td-section .add-sku-value {
  color: #38f;
  margin: 10px;
  width: 60px;
  display: inline-block;
}

.sku-container .sku-tr .td-section .sku-group-item .select-sku {
  margin-top: 11px;
}

.sku-container .sku-tr .td-section .bg-grey > div.select-sku {
  width: 100px;
}

.sku-container .sku-tr .td-section .sku-group-item .select-sku > div {
  padding: 5px;
}

div.td.td-body.td-section
  > div.sku-group-item
  > div.bg-grey
  > div
  > div.selectize-dropdown.single.select-sku {
  margin-top: 0;
  padding: 0;
  z-index: 99;
}

.sku-container .bg-grey {
  height: 28px;
  padding: 7px;
  width: 100%;
  line-height: 28px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
}

.sku-container .add-sku-group-item button {
  width: 98px;
  height: 28px;
  padding: 0;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  background: #fafafa;
  color: #777;
  font-size: 13px;
}

.sku-container .sku-group-item button {
  width: 100px;
  height: 30px;
  padding: 0;
}

.sku-container .sku-group-item .sku-item-body {
  display: flex;
  box-sizing: content-box;
  flex-wrap: wrap;
}

.sku-container .sku-group-item .sku-item-body .spec-values {
  display: flex;
  align-items: center;
  position: relative;
}

.sku-container .sku-table {
  display: flex;
  flex-direction: column;
}

.sku-container .sku-table .sku-tr {
  display: flex;
}

.sku-container .sku-table .sku-tr:nth-child(3),
.sku-container .sku-table .sku-tr:nth-child(4) {
  height: 50px;
  min-height: unset;
}

.sku-container .sku-table .sku-tr .td-body {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.sku-container .sku-group-item .sku-value-group-item {
  top: 3rem;
  position: absolute;
  box-sizing: border-box;
  width: 500px;
  height: 54px;
  padding: 0 20px;
  background: #fff;
  align-items: center;
  justify-content: space-around;
  margin: 1rem 0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  z-index: 50;
}

.sku-container .sku-group-item .sku-value-group-item .select-sku-value {
  width: 80%;
  width: calc(100% - 120px);
}

.sku-container .sku-group-item .sku-value-group-item button {
  width: 50px;
  margin: 2px;
}

.sku-container .sku-group-item .value-item {
  border-radius: 3px;
  width: 90px;
  padding: 4px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #ccc;
  text-align: center;
  position: relative;
  margin: 7px;
}

.sku-container .sku-group-item .value-item .delete {
  position: absolute;
  top: -10px;
  right: -10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 20px;
  display: none;
}

.sku-container .sku-table .sku-tr .td-quantity table {
  width: 100%;
}

.sku-container .sku-table .sku-tr .td-quantity {
  padding: 10px 20px;
  box-sizing: border-box;
}

.sku-container
  .sku-table
  .sku-tr
  .td-quantity
  table
  > tbody
  > tr
  > td:nth-child(1) {
  border-left-width: 0;
}

.sku-container
  .sku-table
  .sku-tr
  .td-quantity
  table
  > tbody
  > tr
  > td:last-child {
  border-right-width: 0;
}

.sku-container .sku-table .sku-tr .td-quantity table thead th,
.sku-container .sku-table .sku-tr .td-quantity table tbody td {
  text-align: center;
  padding: 10px 6px;
}

.sku-container .sku-table .sku-tr .td-quantity table thead .th-price,
.sku-container .sku-table .sku-tr .td-quantity table thead .th-cost,
.sku-container .sku-table .sku-tr .td-quantity table thead .th-weight,
.sku-container .sku-table .sku-tr .td-quantity table thead .th-sn,
.sku-container .sku-table .sku-tr .td-quantity table thead .th-quantity {
  width: 100px;
}

.sku-container .sku-table .sku-tr .td-quantity table tbody tr td {
  border: 1px solid #e5e5e5;
  position: relative;
}

.sku-container .sku-table .sku-tr .td-quantity table tbody tr {
  height: 47px;
}

.sku-container .sku-table .sku-tr .td-quantity table tbody input {
  height: 50%;
  margin: auto;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot tr {
  border-bottom: 1px solid #e5e5e5;
  height: 35px;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot .foot {
  display: flex;
  align-items: center;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot .foot > span {
  color: black;
  margin-right: 0.5rem;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot .foot .set span,
.sku-container .sku-table .sku-tr .td-quantity table tfoot .foot .input span {
  color: #38f;
  margin: 0 0.2rem;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot .foot input {
  width: 70px;
  height: 20px;
}

.sku-container .sku-table .sku-tr .td-quantity table tfoot .input {
  display: none;
  align-items: center;
}

.sku-container .sku-tr .td-seller-code input {
  width: 102px;
  height: 32px;
  box-sizing: border-box;
}

.sku-container .sku-table .sku-tr tbody .cost input,
.sku-container .sku-table .sku-tr tbody .quantity input,
.sku-container .sku-table .sku-tr tbody .weight input,
.sku-container .sku-table .sku-tr tbody .sn input {
  width: 80px;
}

.sku-container .sku-table .sku-tr tbody .price input {
  max-width: 100px;
  float: left;
}

.sku-container .sku-table .tr-quantity-div {
  display: none;
}

#storeGoodsForm
  > div
  > div
  > div.store_add_goods.hide0
  > div
  > div:nth-child(3)
  > div
  > div.info-group-cont.vbox
  > div.sku-editor-contianer
  > div
  > div
  > div:nth-child(3)
  > div:nth-child(1)
  > span
  > em {
  color: #f00;
  font-size: 22px;
}

.sku-container .td .all-quantity {
  height: 17px;
  margin-left: 20px;
}

.sku-container .sku-tr .td-right {
  margin-left: -4px;
  position: relative;
}

.sku-container .sku-tr .td:first-child span {
  padding-right: 5px;
  word-break: keep-all;
}

.sku-container .note-info {
  position: absolute;
  top: -8px;
  display: none;
  width: 100px;
  left: 0px;
  color: #f00;
  font-size: 12px;
}

.sku-container .td-right .note-info {
  top: -12px;
  left: 40px;
}

.sku-container .sku-table div.sku-tr.quantity-management-tip {
  display: none;
}

.sku-container .quantity-management-tip div.td-right .alert {
  margin-left: 20px;
  letter-spacing: 1px;
  font-size: 15px;
}
</style>