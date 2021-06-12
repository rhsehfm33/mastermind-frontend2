<template>
  <nav>
    <v-app-bar class="header" elevation="4">
      <v-btn v-if="isNewBoardValid" @click.prevent="onClickCreateBoard"
        >+ New Board</v-btn
      >
      <v-btn v-if="isShowMenuValid" @click.prevent="onClickShowMenu"
        >Show Menu</v-btn
      >
      <v-spacer></v-spacer>
      <v-toolbar-title class="header-logo"
        ><router-link to="/">{{ appTitle }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-auth">
        <a v-if="isAuthenicated" href="" @click.prevent="logout">Logout</a>
        <template v-else class="header-auth">
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
      rPath: "",
    };
  },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      isShowBoardMenu: "isShowBoardMenu",
      navbarColor: "navbarColor",
      bodyColor: "bodyColor",
    }),
    isAuthenicated() {
      return this.$store.getters.isAuthenticated;
    },
    isNewBoardValid() {
      return this.rPath === "/" && this.isAuthenicated;
    },
    isShowMenuValid() {
      return this.rPath.includes("/board/") && this.isShowBoardMenu == false;
    },
  },
  created() {
    this.rPath = this.$router.currentRoute.path;
  },
  watch: {
    $route: function (to, from) {
      this.rPath = to.path;
    },
    bodyColor: "updateTheme",
  },
  mounted() {
    // mount 됐을 때 Theme를 업데이트하는 작업
    this.updateTheme();
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD", "SET_IS_SHOW_BOARD_MENU"]),
    updateTheme() {
      const header = document.querySelector(".header");
      // body가 없으면 return, 있으면 배경화면에 bodyColor 값 대입
      if (!header) return;
      header.style.backgroundColor = this.navbarColor;
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
    },
  },
};
</script>

<style>
.header {
  position: relative;
  font-weight: bold;
  opacity: 0.8;
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

.header-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header-auth {
  float: right;
}
</style>
