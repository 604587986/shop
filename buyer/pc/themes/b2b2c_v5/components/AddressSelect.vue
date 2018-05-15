<template>
  <div :id="_uid"></div>
</template>

<script>
  export default {
    name: 'EnAddressSelect',
    props: {
      default: {
        default: null
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
        this.$nextTick(() => {
          $(this.$el).addressSelect({
            host: 'http://localhost:3001/javashop/',
            appApi: 'api/base/region/get-children.do?regionid=@id',
            callback: this.callback,
            deData: this.default
          })
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
