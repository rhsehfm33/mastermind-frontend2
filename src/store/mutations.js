import { setAuthInHeader } from "../api";

const mutations = {
  // 로그인
  LOGIN(state, { accessToken }) {
    if (!accessToken) return;
    state.accessToken = accessToken;
    localStorage.accessToken = accessToken;
    setAuthInHeader(accessToken);
  },
  // 로그아웃
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
  // 보드 메뉴 사이드바
  SET_IS_SHOW_BOARD_MENU(state, toggle) {
    state.isShowBoardMenu = toggle;
  },
  // 테마 변경
  SET_THEME(state, color) {
    // 배경화면 색깔 : bodyColor 상태에 color가 들어오면 color로, 아니면 하얀색 기본값으로 변경
    state.bodyColor = color ? color : "rgb(255,255,255)";
    // 상단 색깔 : navbarColor에 color값이 있으면 color, 없을 경우 검은색 기본값 설정
    state.navbarColor = color ? color : "rgb(0,0,0)";
  },
};

export default mutations;
