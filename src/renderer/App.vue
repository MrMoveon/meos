<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import {setZoom} from '@/utils/utils'
export default {
  name: 'meos',
  created () {
    // setZoom()
  }
}
</script>

<style>
  /* CSS */
  html,body{background:transparent!important;}
  #app{
    height: 100%;
  }
</style>
