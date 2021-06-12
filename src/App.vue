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
  },
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

.form-control {
  width: 100%;
  box-sizing: border-box;
  background-color: #e2e4e6;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color 0.3s;
}
</style>
