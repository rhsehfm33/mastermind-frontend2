<template>
  <v-card :data-list-id="list.id" :data-list-pos="list.pos">
    <div class="card-header">
      <v-text-field
        outlined
        v-if="isEditTitle"
        type="text"
        v-model="inputTitle"
        ref="inputTitle"
        @keyup.enter="onTitleSubmit"
        @blur="onTitleSubmit"
      />
      <v-card-title v-else @click="onClickTitle">
        {{ list.title }}
      </v-card-title>
    </div>

    <div class="card-list" :data-list-id="list.id">
      <div v-show="!list.cards.length" class="empty-card-item"></div>
      <card-item
        v-for="card in list.cards"
        :key="`${list.id}-${card.pos}`"
        :card="card"
        :boardId="list.boardId"
      ></card-item>
    </div>
    <div class="btn-wrapper">
      <div v-if="isAddCard">
        <add-card
          :pos="lastCardPos"
          :listId="list.id"
          @close="isAddCard = false"
        ></add-card>
      </div>
      <v-btn plain color="green" v-else @click.prevent="isAddCard = true">
        &plus; Add a card
      </v-btn>
      <v-btn plain color="red" @click.prevent="onDeleteList">delete</v-btn>
    </div>
  </v-card>
</template>

<script>
import CardItem from "./CardItem.vue";
import AddCard from "./AddCard.vue";
import { mapActions } from "vuex";

export default {
  components: { CardItem, AddCard },
  props: ["list"],
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  created() {
    this.inputTitle = this.list.title;
  },
  computed: {
    lastCardPos() {
      const lastCard = this.list.cards[this.list.cards.length - 1];
      let pos = 65535;
      if (lastCard) pos = lastCard.pos + pos;
      return pos;
    }
  },
  methods: {
    ...mapActions(["UPDATE_LIST", "DELETE_LIST"]),
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(_ => this.$refs.inputTitle.focus());
    },
    onTitleSubmit() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;
      const id = this.list.id;
      const title = this.inputTitle;

      if (title === this.list.title) return (this.isEditTitle = false);

      this.UPDATE_LIST({ id, title }).then(_ => (this.isEditTitle = false));
    },
    onDeleteList() {
      if (!confirm(`${this.list.title} 리스트를 삭제할까요?`)) return;
      this.DELETE_LIST({ id: this.list.id });
    }
  }
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: center;
}

.btn-wrapper {
  display: flex;
  justify-content: space-around;
}

.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}
</style>
