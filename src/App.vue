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

a {
  text-decoration: none;
}

h2 {
  font-size: 1.6rem;
}

h3 {
  font-size: 1.4rem;
}

h4 {
  font-size: 1.2rem;
}

h5 {
  font-size: 1rem;
}
</style>
