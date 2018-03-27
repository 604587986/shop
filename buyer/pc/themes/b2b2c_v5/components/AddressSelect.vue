<template>
  <div :id="_uid"></div>
</template>

<script>
  export default {
    name: 'EnAddressSelect',
    props: {
      changed: {
        type: Function,
        default: () => {}
      },
      default: {
        type: Array,
        default: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        $(this.$el).addressSelect({
          host: 'http://localhost:3001/javashop/',
          appApi: 'api/base/region/get-children.do?regionid=@id',
          callback: this.changed,
          deData: this.default
        })
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
