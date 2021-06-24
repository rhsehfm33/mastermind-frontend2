<template>
  <v-main>
    <div class="board-wrapper body">
      <div class="board">
        <div class="board-header">
          <v-btn plain color="black" class="title-btn">
            <input
              style="color: white"
              class="board-title-form"
              v-if="isEditTitle"
              v-model="inputTitle"
              ref="inputTitle"
              @keyup.enter="onTitleSubmit"
              @blur="onTitleSubmit"
            />
            <h2 v-else @click="onClickTitle">{{ board.title }}</h2>
          </v-btn>
        </div>
        <!-- list 컴포넌트  -->
        <div class="list-section-wrapper">
          <div class="list-section">
            <div
              class="list-wrapper"
              v-for="list in board.lists"
              :key="list.pos"
            >
              <!-- list 데이터를 바인딩해서 list 컴포넌트 출력 -->
              <list :list="list"></list>
            </div>
            <!-- AddList 컴포넌트 사용하여 리스트 추가 -->
            <div class="list-wrapper">
              <add-list />
            </div>
          </div>
        </div>
        <div>
          <board-settings v-if="isShowBoardMenu" />
          <!-- 중첩 라우팅으로 board 컴포넌트 내에 card 컴포넌트가 출력 -->
          <router-view :boardId="board.id"></router-view>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import List from "./List.vue";
import AddList from "./AddList.vue";
import BoardSettings from "./BoardSettings.vue";
// dragula 라이브러리
import dragula from "dragula";
import "dragula/dist/dragula.css";

export default {
  components: { List, AddList, BoardSettings },
  data() {
    return {
      drakeList: null,
      drake: null,
      isEditTitle: false,
      inputTitle: "",
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
    navbarColor: "updateTheme",
    bodyColor: "updateTheme",
  },
  // mapState 함수 호출
  computed: {
    ...mapState({
      board: "board",
      isShowBoardMenu: "isShowBoardMenu",
      navbarColor: "navbarColor",
      bodyColor: "bodyColor",
    }),
  },
  mounted() {
    // mount 됐을 때 Theme를 업데이트하는 작업
    this.updateTheme();
  },
  created() {
    // create 되면 테마 컬러 전달
    this.fetchData().then(_ => {
      this.inputTitle = this.board.title;
      this.SET_THEME(this.board.bgColor);
    });
  },
  updated() {
    // dragula drag & drop
    // destroy() 함수를 통해 불필요한 객체 삭제
    if (this.drakeList) this.drakeList.destroy();
    if (this.drake) this.drake.destroy();
    // 객체 생성
    this.drakeList = dragula([...this.$el.querySelectorAll(".list-section")], {
      // 드래그될 아이템(handle) 의 드래그를 막는 invalid 함수
      invalid: handle => {
        return !/^list/.test(handle.className);
      },
      // 리스트 드래그 구현
    }).on("drop", (el, wrapper, target, siblings) => {
      const targetList = {
        id: el.children[0].dataset.listId,
        pos: 65535,
      };
      let prevListPos = null;
      let nextListPos = null;
      // 리스트 배열 가져오기
      Array.from(wrapper.querySelectorAll(".list")).forEach((el, idx, arr) => {
        const listId = el.dataset.listId;
        // 이동하려는 리스트가 맞으면
        if (targetList.id == listId) {
          // 이전 리스트
          prevListPos = idx > 0 ? arr[idx - 1].dataset.listPos * 1 : null;
          // 다음 리스트
          nextListPos =
            idx < arr.length - 2 ? arr[idx + 1].dataset.listPos * 1 : null;
        }
      });
      // 리스트가 맨 앞에 있으면
      if (!prevListPos && nextListPos) {
        targetList.pos = nextListPos / 2;
      }
      // 리스트가 맨 뒤에 있으면
      else if (prevListPos && !nextListPos) {
        targetList.pos = prevListPos * 2;
      }
      // 중간에 있는 리스트일 경우
      else if (prevListPos && nextListPos) {
        targetList.pos = (prevListPos + nextListPos) / 2;
      }
      this.UPDATE_LIST(targetList);
    });
    // 카드 드래그 구현 : 컨테이너를 배열로 반환해야 함
    this.drake = dragula([...this.$el.querySelectorAll(".card-list")]).on(
      "drop",
      // el: 드래그하고 있는 요소
      // wrapper: el이 드래그 후 놓아진 리스트 요소
      (el, wrapper) => {
        // drag & drop 할 때 리스트 내의 카드가 어느 위치에 있는지 확인해야 카드의 포지션 값을 계산할 수 있음
        // targetCard는 어디로 이동해야할지 정보를 담고 있음
        const targetCard = {
          id: el.dataset.cardId,
          listId: wrapper.dataset.listId,
          pos: 65535,
        };
        let prevCardPos = null;
        let nextCardPos = null;
        // 카드 드랍 구현하기 위해 카드 배열 가져오기
        // 유사 배열이므로  Array.from
        Array.from(wrapper.querySelectorAll(".card-item")).forEach(
          (el, idx, arr) => {
            // 현재 카드 아이디 값 받아오기
            const cardId = el.dataset.cardId;
            // 만약에 카드 아이디가 이동하고자 하는 카드 아이디라면 앞 뒤의 카드를 계산함
            if (targetCard.id === cardId) {
              // prevCard 인덱스 값이 0보다 크면 맨 앞이 아니므로 이전 카드는 arr[인덱스-1]
              // pos는 dataset의 cardPos를 가져옴
              prevCardPos = idx > 0 ? arr[idx - 1].dataset.cardPos * 1 : null;
              // 인덱스 값이 배열의 마지막값보다 작으면 nextCard 있음
              // 그렇지 않으면 마지막 카드이므로 null 값
              nextCardPos =
                idx < arr.length - 1 ? arr[idx + 1].dataset.cardPos * 1 : null;
            }
          },
        );
        // 이전 카드가 없고 다음 카드가 있다면 = 맨 앞에 있다면
        if (!prevCardPos && nextCardPos) {
          // nextCard 위치의 절반값
          targetCard.pos = nextCardPos / 2;
        }
        // 맨 뒤 카드라면
        else if (prevCardPos && !nextCardPos) {
          // prevCard 위치의 2배
          targetCard.pos = prevCardPos * 2;
        }
        // 중간에 있는 카드라면
        else if (prevCardPos && nextCardPos) {
          // prevCard 위치와 nextCard 위치를 더해서 절반으로 나눈 값
          targetCard.pos = (prevCardPos + nextCardPos) / 2;
        }
        // 포지션 값을 전달
        this.UPDATE_CARD(targetCard);
      },
    );
  },
  methods: {
    ...mapActions([
      "FETCH_BOARD",
      "UPDATE_BOARD",
      "UPDATE_CARD",
      "UPDATE_LIST",
    ]),
    ...mapMutations(["SET_THEME"]),
    fetchData() {
      return this.FETCH_BOARD(this.$route.params.id);
    },
    // 보드 제목 수정
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(_ => this.$refs.inputTitle.focus());
    },
    // 보드 제목 수정할 때 제출하는 이벤트
    onTitleSubmit() {
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;
      const id = this.board.id;
      const title = this.inputTitle;
      if (title === this.board.title) return (this.isEditTitle = false);
      this.UPDATE_BOARD({ id, title }).then(_ => (this.isEditTitle = false));
    },
    // 보드 색상 변경
    updateTheme() {
      const body = document.querySelector(".body");
      // body가 없으면 return, 있으면 배경화면에 bodyColor 값 대입
      if (!body) return;
      else body.style.backgroundColor = this.navbarColor;
    },
  },
};
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.title-btn {
  margin: 1rem 0 1rem 0;
}

.board-title-form {
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  font-size: 2rem;
  padding: 0.1em 0.1em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border-bottom: 1px solid;
  outline-style: none; /* 포커스시 발생하는 효과 제거 */
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
}
</style>
