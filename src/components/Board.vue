<template>
  <v-main class="body">
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <v-btn plain color="black" class="title-btn">
            <input
              class="board-title-form"
              v-if="isEditTitle"
              v-model="inputTitle"
              ref="inputTitle"
              @keyup.enter="onTitleSubmit"
              @blur="onTitleSubmit"
            />
            <h2 v-else @click="onClickTitle">{{ board.title }}</h2>
          </v-btn>
        </div>
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
        <router-view :boardId="board.id"></router-view>
      </div>
    </div>
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
      inputTitle: "",
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  computed: {
    ...mapState({
      board: "board",
      isShowBoardMenu: "isShowBoardMenu",
    }),
  },
  created() {
    this.fetchData().then(_ => {
      this.inputTitle = this.board.title;
      // 테마 컬러 전달
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
      },
    }).on("drop", (el, wrapper, target, siblings) => {
      const targetList = {
        id: el.children[0].dataset.listId * 1,
        pos: 65535,
      };
      let prevList = null;
      let nextList = null;
      Array.from(wrapper.querySelectorAll(".list")).forEach((el, idx, arr) => {
        const listId = null;
        const listFound = targetList.id === el.dataset.listId * 1;
        if (!listFound) return;
        prevList =
          idx > 0
            ? {
                id: arr[idx - 1].dataset.listId * 1,
                pos: arr[idx - 1].dataset.listPos * 1,
              }
            : null;
        nextList =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].dataset.listId * 1,
                pos: arr[idx + 1].dataset.listPos * 1,
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
          pos: 65535,
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
                      pos: arr[idx - 1].dataset.cardPos * 1,
                    }
                  : null;
              nextCard =
                idx < arr.length - 1
                  ? {
                      id: arr[idx + 1].dataset.cardId,
                      pos: arr[idx + 1].dataset.cardPos * 1,
                    }
                  : null;
            }
          },
        );

        if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2;
        else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2;
        else if (nextCard && prevCard)
          targetCard.pos = (prevCard.pos + nextCard.pos) / 2;

        this.UPDATE_CARD(targetCard);
      },
    );
  },
  methods: {
    ...mapActions([
      "FETCH_BOARD",
      "UPDATE_BOARD",
      "UPDATE_CARD",
      "UPDATE_LIST",
    ]),
    ...mapMutations(["SET_THEME"]),
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
  },
};
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.title-btn {
  margin: 1rem 0 1rem 0;
}

.board-title-form {
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  font-size: 2rem;
  padding: 0.1em 0.1em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border-bottom: 1px solid;
  outline-style: none; /* 포커스시 발생하는 효과 제거 */
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
}
</style>
