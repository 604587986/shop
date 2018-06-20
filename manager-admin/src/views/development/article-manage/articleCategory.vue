<template>
  <div class="container">
    <en-grade-editor
      typeText="分类"
      :api="categoryApi"
      :max-level="2"
      :params-names="{id: 'id', text: 'name'}"
    />
  </div>
</template>

<script>
  export default {
    name: 'articleCategory',
    data() {
      return {
        categoryApi: process.env.BASE_API + '/pages/article-categories/@id/children'
      }
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
