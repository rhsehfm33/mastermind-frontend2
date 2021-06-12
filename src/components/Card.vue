<template>
  <modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input
          class="form-control"
          type="text"
          v-model="card.title"
          :readonly="!toggleTitle"
          @click.prevent="toggleTitle = !toggleTitle"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
      </div>
      <v-btn plain x-large color="blue" @click.prevent="onClickClose"
        >&times;</v-btn
      >
    </div>
    <div slot="body">
      <h3>Description</h3>
      <v-textarea
        solo
        cols="30"
        rows="5"
        placeholder="설명을 추가해보세요!"
        :readonly="!toggleDesc"
        @click.prevent="toggleDesc = !toggleDesc"
        @blur="onBlurInputDesc"
        ref="inputDesc"
        v-model="card.description"
      ></v-textarea>
    </div>
    <div slot="footer"></div>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { Modal },
  props: ["boardId"],
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false,
    };
  },
  computed: {
    ...mapState({
      card: "card",
    }),
  },
  created() {
    this.FETCH_CARD(this.$route.params.cid);
  },
  methods: {
    ...mapActions(["FETCH_CARD", "UPDATE_CARD"]),
    onClickClose() {
      this.$router.push(`/board/${this.boardId}`);
    },
    onBlurTitle() {
      this.toggleTitle = !this.toggleTitle;
      const title = this.$refs.inputTitle.value.trim();
      if (!title) return;
      this.UPDATE_CARD({ id: this.card.id, title });
    },
    onBlurInputDesc() {
      this.toggleDesc = !this.toggleDesc;
      const description = this.$refs.inputDesc.value.trim();
      if (!description) return;
      this.UPDATE_CARD({ id: this.card.id, description });
    },
  },
};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 500px;
  width: 60%;
}

.modal-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
