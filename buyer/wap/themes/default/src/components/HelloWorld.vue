<template>
  <div class="hello">
  </div>
</template>

<script>
  import { AlertModule } from 'vux'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      AlertModule.show({
        title: 'VUX is Cool',
        content: 'Do you agree?',
        onShow() {
          console.log('Module: I\'m showing')
        },
        onHide() {
          console.log('Module: I\'m hiding now')
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
