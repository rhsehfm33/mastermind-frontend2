<template>
  <v-main>
    <!-- <v-container></v-container>
    <v-layout>
      <v-flex>
        <input
          class="form-control"
          v-if="isEditTitle"
          type="text"
          v-model="inputTitle"
          ref="inputTitle"
          @keyup.enter="onTitleSubmit"
          @blur="onTitleSubmit"
        />
        <span
          v-else
          @click="onClickTitle"
          class="board-header-btn board-title"
          >{{ board.title }}</span
        >
      </v-flex>
      <v-flex> </v-flex>
      <v-flex>
        <a
          class="board-header-btn show-menu"
          href=""
          @click.prevent="onClickShowMenu"
          >... Show Menu</a
        ></v-flex
      >
      <v-flex>
        <div class="board">
          <div class="list-section-wrapper">
            <div class="list-section">
              <div
                class="list-wrapper"
                v-for="list in board.lists"
                :key="list.pos"
              >
                <list :list="list"></list>
              </div>
              <div class="list-wrapper">
                <add-list />
              </div>
            </div>
          </div>
          <board-settings v-if="isShowBoardMenu" />
          <router-view :boardId="board.id"></router-view></div
      ></v-flex>
    </v-layout> -->
  </v-main>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import List from "./List.vue";
import AddList from "./AddList.vue";
import BoardSettings from "./BoardSettings.vue";
import dragula from "dragula";
import "dragula/dist/dragula.css";

export default {
  components: { List, AddList, BoardSettings },
  data() {
    return {
      drakeList: null,
      drake: null,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  computed: {
    ...mapState({
      board: "board",
      isShowBoardMenu: "isShowBoardMenu"
    })
  },
  created() {
    this.fetchData().then(_ => {
      this.inputTitle = this.board.title;
      this.SET_THEME(this.board.bgColor);
    });
  },
  updated() {
    if (this.drakeList) this.drakeList.destroy();
    if (this.drake) this.drake.destroy();

    this.drakeList = dragula([...this.$el.querySelectorAll(".list-section")], {
      invalid: (el, handle) => {
        console.log(handle.className);
        return !/^list/.test(handle.className);
      }
    }).on("drop", (el, wrapper, target, siblings) => {
      const targetList = {
        id: el.children[0].dataset.listId,
        pos: 65535
      };
      let prevList = null;
      let nextList = null;

      Array.from(wrapper.querySelectorAll(".list")).forEach((el, idx, arr) => {
        const listId = null;
        const listFound = targetList.id === el.dataset.listId;

        if (!listFound) return;

        prevList =
          idx > 0
            ? {
                id: arr[idx - 1].dataset.listId,
                pos: arr[idx - 1].dataset.listPos
              }
            : null;

        nextList =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].dataset.listId,
                pos: arr[idx + 1].dataset.listPos
              }
            : null;
      });

      if (!prevList && nextList) targetList.pos = nextList.pos / 2;
      else if (!nextList && prevList) targetList.pos = prevList.pos * 2;
      else if (nextList && prevList)
        targetList.pos = (prevList.pos + nextList.pos) / 2;

      this.UPDATE_LIST(targetList);
    });

    this.drake = dragula([...this.$el.querySelectorAll(".card-list")]).on(
      "drop",
      (el, wrapper, target, silblings) => {
        const targetCard = {
          id: el.dataset.cardId,
          listId: wrapper.dataset.listId,
          pos: 65535
        };
        let prevCard = null;
        let nextCard = null;

        Array.from(wrapper.querySelectorAll(".card-item")).forEach(
          (el, idx, arr) => {
            const cardId = el.dataset.cardId;

            if (targetCard.id === cardId) {
              prevCard =
                idx > 0
                  ? {
                      id: arr[idx - 1].dataset.cardId,
                      pos: arr[idx - 1].dataset.cardPos
                    }
                  : null;
              nextCard =
                idx < arr.length - 1
                  ? {
                      id: arr[idx + 1].dataset.cardId,
                      pos: arr[idx + 1].dataset.cardPos
                    }
                  : null;
            }
          }
        );

        if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2;
        else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2;
        else if (nextCard && prevCard)
          targetCard.pos = (prevCard.pos + nextCard.pos) / 2;

        this.UPDATE_CARD(targetCard);
      }
    );
  },
  methods: {
    ...mapActions([
      "FETCH_BOARD",
      "UPDATE_BOARD",
      "UPDATE_CARD",
      "UPDATE_LIST"
    ]),
    ...mapMutations(["SET_IS_SHOW_BOARD_MENU", "SET_THEME"]),
    fetchData() {
      return this.FETCH_BOARD(this.$route.params.id);
    },
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(_ => this.$refs.inputTitle.focus());
    },
    onTitleSubmit() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;
      const id = this.board.id;
      const title = this.inputTitle;

      if (title === this.board.title) return (this.isEditTitle = false);

      this.UPDATE_BOARD({ id, title }).then(_ => (this.isEditTitle = false));
    },
    onClickShowMenu() {
      this.SET_IS_SHOW_BOARD_MENU(true);
    }
  }
};
</script>

<style></style>
