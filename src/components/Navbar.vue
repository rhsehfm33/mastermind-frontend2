<template>
  <nav class="header">
    <v-app-bar color="deep-purple">
      <v-btn v-if="isNewBoardValid" @click.prevent="onClickCreateBoard">+ New Board</v-btn>
      <v-btn v-if="isShowMenuValid" @click.prevent="onClickShowMenu">Show Menu</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        ><router-link to="/">{{ appTitle }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-auth">
        <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
        <template v-else>
          <router-link to="/login" class="user-nav-btn">Login</router-link>
          <router-link to="/register" class="user-nav-btn">Sign Up</router-link>
        </template>
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
      appTitle: "Mastermind",
      rPath: ""
    };
  },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      isShowBoardMenu: "isShowBoardMenu",
      navbarColor: "navbarColor",
      bodyColor: "bodyColor"
    }),
    isAuthenicated() {
      return this.$store.getters.isAuthenticated;
    },
    isNewBoardValid() {
      return this.rPath === "/" && this.isAuthenicated;
    },
    isShowMenuValid() {
      return this.rPath.includes("/board/") && this.isShowBoardMenu == false;
    }
  },
  created() {
    this.rPath = this.$router.currentRoute.path;
  },
  watch: {
    $route: function(to, from) {
      this.rPath = to.path;
    },
    bodyColor: "updateTheme"
  },
  mounted() {
    this.updateTheme();
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD", "SET_IS_SHOW_BOARD_MENU"]),
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
    },
    onClickShowMenu() {
      this.SET_IS_SHOW_BOARD_MENU(true);
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
.user-nav-btn {
  padding-left: 10px;
}
</style>
