<template>
  <modal>
    <div slot="header">
      <h1>
        Create New Board
        <a href="" class="modal-close" @click.prevent="SET_IS_ADD_BOARD(false)"
          >&times;
        </a>
      </h1>
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
        color="deep-purple"
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
      isValidInput: false
    };
  },
  watch: {
    inputBoardTitle(val) {
      this.isValidInput = !!val.trim().length;
    }
  },
  mounted() {
    this.$refs.inputBoardTitle.focus();
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    ...mapActions(["ADD_BOARD"]),
    onSubmitCreateBoard() {
      if (!this.inputBoardTitle.trim()) return;

      this.ADD_BOARD(this.inputBoardTitle)
        .then(id => this.$router.push(`/board/${id}`))
        .catch(err => console.log(err))
        .finally(() => this.SET_IS_ADD_BOARD(false));
    }
  }
};
</script>
