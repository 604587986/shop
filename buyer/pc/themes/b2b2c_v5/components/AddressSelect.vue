<template>
  <div :id="_uid"></div>
</template>

<script>
  export default {
    name: 'EnAddressSelect',
    props: {

    },
    mounted() {
      this.$nextTick(() => {
        $(this.$el).addressSelect({
          host: 'http://localhost:3001/javashop/',
          appApi: 'api/base/region/get-children.do?regionid=@id'
        })
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
