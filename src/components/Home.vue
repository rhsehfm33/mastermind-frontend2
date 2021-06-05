<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="(board, i) in boardList" :key="i" cols="4">
            <router-link class="router-link" :to="`/board/${board.id}`">
              <v-card height="200" :data-bgcolor="board.bgColor">
                <v-card-title>{{ board.title }}</v-card-title>
              </v-card>
            </router-link>
          </v-col>
          <v-col cols="12" sm="2"> </v-col>
        </v-row>
        <AddBoard v-if="isAddBoard" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AddBoard from "./AddBoard.vue";

export default {
  components: { AddBoard },
  computed: {
    ...mapState({
      isAddBoard: "isAddBoard",
      boardList: "boardList"
    })
  },
  created() {
    this.FETCH_BOARD_LIST();
    this.SET_THEME();
  },
  updated() {
    Array.from(document.querySelectorAll(".board-item")).forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor || "#ddd";
    });
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD", "SET_THEME"]),
    ...mapActions(["FETCH_BOARD_LIST"])
  }
};
</script>

<style></style>
