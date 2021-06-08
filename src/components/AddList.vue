<template>
  <v-card class="list add-list">
    <v-text-field
      v-if="isAddList"
      outlined
      label="Add a List"
      ref="inputTitle"
      v-model="inputTitle"
      @keyup.enter="onSubmitTitle"
      @blur="resotre"
    ></v-text-field>
    <a v-else @click="onClickAddList">&plus; Add another list</a>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isAddList: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState({
      board: "board"
    })
  },
  methods: {
    ...mapActions(["ADD_LIST"]),
    onClickAddList() {
      this.isAddList = true;
      this.$nextTick(_ => {
        this.$refs.inputTitle.focus();
      });
    },
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
    resotre() {
      this.isAddList = false;
      this.inputTitle = "";
    }
  }
};
</script>

<style scoped>
.add-list {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: #ddd;
  transition: all 0.3s;
  text-decoration: none;
}
.add-list:hover,
.add-list:focus {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
