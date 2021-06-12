<template>
  <v-card class="card-item" :data-card-id="card.id" :data-card-pos="card.pos">
    <router-link :to="`/board/${boardId}/card/${card.id}`">
      <div>{{ card.title }}</div>
      <!-- 카드의 description이 있으면 특수문자 출력 -->
      <div class="card-item-meta" v-if="card.description">&equiv;</div>
    </router-link>
    <!-- 카드 삭제 버튼 -->
    <a plain class="delete-card-btn" href="" @click.prevent="onClickDelete"
      >&times;</a
    >
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  // props로 부모 컴포넌트에서 card, boardId 전달 받음
  props: ["card", "boardId"],
  methods: {
    ...mapActions(["DELETE_CARD"]),
    // 카드 삭제 함수
    onClickDelete() {
      if (!window.confirm("카드를 삭제하시나요?")) return;
      this.DELETE_CARD(this.card.id);
    },
  },
};
</script>

<style>
.card-item {
  margin: 8px;
  padding: 6px 20px 2px 8px;
  position: relative;
}
.card-item a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: block;
}
.card-item:hover,
.card-item:focus {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.card-item-meta {
  font-size: 26px;
  padding: 5px 0 0 3px;
  color: #8c8c8c;
}
</style>
