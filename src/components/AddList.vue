<template>
  <v-card class="list add-list">
    <!-- isAddList 상태 토글 여부에 따라 출력 -->
    <v-text-field
      v-if="isAddList"
      outlined
      label="Add a List"
      ref="inputTitle"
      v-model="inputTitle"
      @keyup.enter="onSubmitTitle"
      @blur="resotre"
    ></v-text-field>
    <v-btn plain v-else @click="onClickAddList">&plus; Add another list</v-btn>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isAddList: false,
      inputTitle: "",
    };
  },
  // state 가져오기
  computed: {
    ...mapState({
      board: "board",
    }),
  },
  methods: {
    ...mapActions(["ADD_LIST"]),
    // 리스트 제목 입력할 때 포커즈
    onClickAddList() {
      this.isAddList = true;
      this.$nextTick(_ => {
        this.$refs.inputTitle.focus();
      });
    },
    // 리스트 제목 입력 후 제출
    onSubmitTitle() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return this.resotre();
      const title = this.inputTitle;
      const pos = this.board.lists.length
        ? this.board.lists[this.board.lists.length - 1].pos * 2
        : 65535;
      const boardId = this.board.id;
      this.ADD_LIST({ title, pos, boardId }).then(_ => this.resotre());
    },
    // 초기화
    resotre() {
      this.isAddList = false;
      this.inputTitle = "";
    },
  },
};
</script>

<style scoped>
.add-list {
  opacity: 0.5;
  padding: 20px;
  text-decoration: none;
}
.add-list:hover,
.add-list:focus {
  opacity: 0.8;
  cursor: pointer;
}
</style>
