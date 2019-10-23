<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
import mainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "app",
  components: {
    mainTabBar
  }
};
</script>
<style lang="scss">
@import "~assets/css/base.scss";
</style>
