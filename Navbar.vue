<template>
  <nav class="header">
    <v-app-bar color="deep-purple" dark>
      <v-btn @click.prevent="onClickCreateBoard">+ New Board</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        ><router-link to="/">{{ appTitle }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-auth">
        <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AddBoard from "./AddBoard.vue";

export default {
  components: { AddBoard },
  data() {
    return {
      appTitle: "MasterMind"
    };
  },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      navbarColor: "navbarColor",
      bodyColor: "bodyColor"
    }),
    isAuthenicated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  watch: {
    bodyColor: "updateTheme"
  },
  mounted() {
    this.updateTheme();
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    updateTheme() {
      this.$el.style.backgroundColor = this.navbarColor;
      const body = document.querySelector("body");
      if (!body) return;
      body.style.backgroundColor = this.bodyColor;
    },
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/login");
    },
    onClickCreateBoard() {
      this.SET_IS_ADD_BOARD(true);
    }
  }
};
</script>

<style>
.header {
  font-weight: bold;
}
.header a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}
.header a:hover,
.header a:focus {
  color: rgba(255, 255, 255);
}
</style>
