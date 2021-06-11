import { setAuthInHeader } from "../api";

const mutations = {
  LOGIN(state, { accessToken }) {
    if (!accessToken) return;
    state.accessToken = accessToken;
    localStorage.accessToken = accessToken;
    setAuthInHeader(accessToken);
  },
  LOGOUT(state) {
    state.accessToken = null;
    delete localStorage.accessToken;
    setAuthInHeader(null);
  },
  SET_BOARD_LIST(state, { list }) {
    state.boardList = list.map(board => board);
  },
  SET_BOARD(state, { item }) {
    state.board = item;
  },
  SET_IS_ADD_BOARD(state, toggle) {
    state.isAddBoard = toggle;
  },
  SET_CARD(state, card) {
    state.card = card;
  },
  SET_IS_SHOW_BOARD_MENU(state, toggle) {
    state.isShowBoardMenu = toggle;
  },
  SET_THEME(state, color) {
    // 배경화면 색깔 : bodyColor 상태에 color가 들어오면 color로, 아니면 보라색 기본값으로 변경
    state.bodyColor = color ? color : "rgb(0,0,0)";
    // 상단 색깔 : navbarColor에 color값이 있으면 color, 없을 경우 기본값 설정
    state.navbarColor = color ? "rgba(0,0,0,.15)" : "rgb(0,0,0)";
  }
};

export default mutations;
