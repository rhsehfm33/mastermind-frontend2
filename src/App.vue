<template>
  <div id="app">
    <v-app>
      <Navbar />
      <v-main>
        <router-view></router-view>
      </v-main>
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
.router-link {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
