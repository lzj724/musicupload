<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./components/home";
export default {
  components: {
    Home
  }
};
</script>

<style>
body{
  background-color: #eee;
}
</style>
