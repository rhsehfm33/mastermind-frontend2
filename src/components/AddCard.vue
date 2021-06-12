<template>
  <v-card class="add-card">
    <div class="title-wrapper">
      <h5>New Card</h5>
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
          color="black"
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
  // 부모 컴포넌트인 list 컴포넌트에서 props로 데이터 전달받음
  props: ["pos", "listId"],
  data() {
    return {
      inputCardTitle: "",
    };
  },
  // v-model로 바인딩한 inputCardTitle 값이 trim 해서 있으면 false
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim();
    },
  },
  // 부모 컴포넌트에 mount되서 보여질 시점에
  // ref="inputText"로 접근해서 돔 엘리먼트 사용하여 focus
  mounted() {
    this.$refs.inputCardTitle.focus();
  },
  methods: {
    // 카드 생성하는 액션 함수
    ...mapActions(["ADD_CARD"]),
    onSubmitNewCard() {
      if (this.invalidInput) return;
      const { inputCardTitle, pos, listId } = this;
      this.ADD_CARD({ title: inputCardTitle, pos, listId }).finally(
        _ => (this.inputCardTitle = ""),
      );
    },
  },
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
