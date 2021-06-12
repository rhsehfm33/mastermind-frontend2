<template>
  <v-main>
    <v-container align="center" justify="center">
      <v-row>
        <!--  -->
        <v-col v-for="(board, i) in boardList" :key="i" cols="4">
          <router-link class="router-link" :to="`/board/${board.id}`">
            <v-card
              class="board-item"
              height="150"
              :data-bgcolor="board.bgColor"
            >
              <v-card-title class="white--text d-flex justify-center">{{
                board.title
              }}</v-card-title>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="12" sm="2"> </v-col>
      </v-row>
      <AddBoard v-if="isAddBoard" />
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AddBoard from "./AddBoard.vue";

export default {
  components: { AddBoard },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      boardList: "boardList",
    }),
  },
  created() {
    this.FETCH_BOARD_LIST();
    this.SET_THEME();
  },
  updated() {
    Array.from(document.querySelectorAll(".board-item")).forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor || "rgb(103,58,181)";
    });
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD", "SET_THEME"]),
    ...mapActions(["FETCH_BOARD_LIST"]),
  },
};
</script>

<style scoped>
.board-item {
  margin: 10px;
}
</style>
