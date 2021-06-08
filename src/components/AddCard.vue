<template>
  <v-card class="add-card">
    <div class="title-wrapper">
      <h5>
        New Card
        <a href="" class="modal-close" @click.prevent="SET_IS_ADD_BOARD(false)"
          >&times;
        </a>
      </h5>
    </div>
    <v-form @submit.prevent="onSubmitNewCard">
      <div class="form-box">
        <v-text-field
          type="text"
          v-model="inputCardTitle"
          ref="inputCardTitle"
          @keypress.enter="
            onSubmitNewCard();
            $emit('close');
          "
          @blur="$emit('close')"
        />
        <v-btn
          color="deep-purple"
          class="white--text"
          :disabled="invalidInput"
          @mousedown="onSubmitNewCard()"
        >
          Add Card
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["pos", "listId"],
  data() {
    return {
      inputCardTitle: ""
    };
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim();
    }
  },
  mounted() {
    this.$refs.inputCardTitle.focus();
  },
  methods: {
    ...mapActions(["ADD_CARD"]),
    onSubmitNewCard() {
      if (this.invalidInput) return;
      const { inputCardTitle, pos, listId } = this;
      this.ADD_CARD({ title: inputCardTitle, pos, listId }).finally(
        _ => (this.inputCardTitle = "")
      );
    }
  }
};
</script>

<style>
.add-card {
  padding: 1rem;
}

.title-wrapper {
  display: flex;
  justify-content: space-around;
}

.form-box {
  text-align: center;
}
</style>
