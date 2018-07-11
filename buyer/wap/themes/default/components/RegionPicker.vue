<template>
  <div></div>
</template>

<script>
  export default {
    name: 'EnRegionPicker',
    props: {
      default: {
        default: null
      },
      api: {
        type: String,
        required: true
      }
    },
    watch: {
      default() {
        this.initAddressSelect()
      }
    },
    mounted() {
      this.initAddressSelect()
    },
    methods: {
      callback(object) {
        this.$emit('changed', object)
      },
      initAddressSelect() {
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
