<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <span>Menu</span>
      <v-btn plain x-large @click.prevent="onClickClose">&times;</v-btn>
    </div>
    <ul class="menu-list">
      <li><a href="" @click.prevent="onClickDeleteBoard">Delete Board</a></li>
      <li>Change Theme</li>
      <div class="color-picker">
        <a
          href=""
          data-value="rgb(0, 121, 191)"
          @click.prevent="onClickChangeColor"
        ></a>
        <a
          href=""
          data-value="rgb(210, 144, 52)"
          @click.prevent="onClickChangeColor"
        ></a>
        <a
          href=""
          data-value="rgb(81, 152, 57)"
          @click.prevent="onClickChangeColor"
        ></a>
        <a
          href=""
          data-value="rgb(176, 70, 50)"
          @click.prevent="onClickChangeColor"
        ></a>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      board: "board",
    }),
  },
  // 부모 컴포넌트에 붙어서 돔 조작이 가능한 시점
  mounted() {
    Array.from(this.$el.querySelectorAll(".color-picker a")).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });
  },
  methods: {
    ...mapMutations(["SET_IS_SHOW_BOARD_MENU"]),
    ...mapActions(["DELETE_BOARD", "UPDATE_BOARD"]),
    onClickClose() {
      this.SET_IS_SHOW_BOARD_MENU(false);
    },
    // 보드 삭제
    onClickDeleteBoard() {
      if (!confirm(`${this.board.title} 보드를 삭제하시나요?`)) return;
      this.DELETE_BOARD(this.board.id).then(_ => this.$router.push("/"));
    },
    // 색상 변경
    onClickChangeColor(el) {
      // board의 id 값을 가져온다.
      const id = this.board.id;
      // color-picker class를 가진 div 내에 a 태그의 data(색상값)를 bgColor에 대입한다.
      const bgColor = el.target.dataset.value;
      // 변경된 배경 색상을 id값과 함께 api를 요청하여 서버로 전달한다. 완료되면 then 함수가 실행된다.
      this.UPDATE_BOARD({ id, bgColor }).then(_ => {
        document.querySelector(".body").style.backgroundColor =
          this.board.bgColor;
        document.querySelector(".header").style.backgroundColor =
          this.board.bgColor;
      });
    },
  },
};
</script>

<style scoped>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all 0.3s;
}
.board-menu-header {
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
  font-size: 24px;
  font-weight: 700;
}

.menu-list {
  list-style: none;
  padding-left: 0px;
}
.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0, 0, 0, 0.1);
}
.menu-list li a {
  text-decoration: none;
  color: inherit;
}
.color-picker {
  margin: 0 15px;
}
.color-picker a {
  display: inline-block;
  margin-top: 15px;
  width: 20%;
  height: 50px;
  border-radius: 10px;
}
</style>
