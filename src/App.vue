<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <CMS msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import CMS from './components/CMS.vue'

export default {
  name: 'App',
  components: {
    CMS
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
