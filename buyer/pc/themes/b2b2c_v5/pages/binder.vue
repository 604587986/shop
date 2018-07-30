<template>
  <div id="binder" class="binder-container w"></div>
</template>

<script>
  export default {
    name: 'binder',
    layout: 'full',
    mounted() {
      this.$layer.open({
        title: '授权成功',
        btn: ['登录', '注册'],
        closeBtn: 0,
        content: '当前已授权成功，请您：',
        move: false,
        yes: (index) => {
          this.$layer.close(index)
          this.$router.push({ name: 'login', query: { form: 'connect' } })
        },
        btn2: (index) => {
          this.$layer.close(index)
          this.$router.push({ name: 'register', query: { form: 'connect' } })
        }
      })
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/styles/color";
  .binder-container {
    min-height: 200px;
  }
</style>
