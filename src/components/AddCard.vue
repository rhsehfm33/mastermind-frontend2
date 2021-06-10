<template>
  <v-card class="add-card">
    <div class="title-wrapper">
      <h5>
        New Card
      </h5>
      <v-btn plain color="blue" @click.prevent="SET_IS_ADD_BOARD(false)"
        >&times;
      </v-btn>
    </div>
    <v-form @submit.prevent="onSubmitNewCard">
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
      <div class="btn-wrapper">
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
import { mapActions } from "vuex";

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
  justify-content: center;
  align-items: baseline;
}

.btn-wrapper {
  text-align: center;
}
</style>
