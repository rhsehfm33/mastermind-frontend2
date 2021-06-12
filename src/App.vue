<template>
  <div id="app">
    <v-app>
      <Navbar />
      <router-view></router-view>
    </v-app> 
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
 
export default {
  name: "app",
  components: { Navbar },
  data() {
    return {};
  }
};
</script>

<style>

.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}

.router-link {
  text-decoration: none;
}

.a {
  text-decoration: none;
}

</style>