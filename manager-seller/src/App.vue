<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  import Storage from '@/utils/storage'
  export default{
    name: 'APP',
    mounted() {
      Storage.getItem('refreshToken') && this.$store.dispatch('getUserInfoAction')
    }
  }
</script>
