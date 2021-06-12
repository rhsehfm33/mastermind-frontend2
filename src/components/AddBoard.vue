<template>
  <modal>
    <div slot="header">
      <span> Create New Board </span>
      <v-btn color="blue" plain x-large @click.prevent="SET_IS_ADD_BOARD(false)"
        >&times;
      </v-btn>
    </div>
    <div slot="body">
      <form id="add-board" @submit.prevent="onSubmitCreateBoard">
        <v-text-field
          type="text"
          solo
          label="Input Board Title"
          v-model="inputBoardTitle"
          ref="inputBoardTitle"
        />
      </form>
    </div>
    <div slot="footer">
      <v-btn
        color="black"
        class="white--text"
        block
        :class="{ 'btn-success': isValidInput }"
        type="submit"
        form="add-board"
        :disabled="!isValidInput"
      >
        CREATE
      </v-btn>
    </div>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  components: { Modal },
  data() {
    return {
      inputBoardTitle: "",
      isValidInput: false,
    };
  },
  watch: {
    inputBoardTitle(val) {
      this.isValidInput = !!val.trim().length;
    },
  },
  mounted() {
    this.$refs.inputBoardTitle.focus();
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    ...mapActions(["ADD_BOARD"]),
    onSubmitCreateBoard() {
      if (!this.inputBoardTitle.trim()) return;
      // 보드 생성 action에 board 제목을 전달
      // id 값을 받아서 router로 생성한 보드 화면으로 리다이렉트
      this.ADD_BOARD(this.inputBoardTitle)
        .then(id => this.$router.push(`/board/${id}`))
        .catch(err => console.log(err))
        .finally(() => this.SET_IS_ADD_BOARD(false));
    },
  },
};
</script>
