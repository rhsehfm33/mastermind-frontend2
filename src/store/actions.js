import { auth, board, list, card } from "../api";

const actions = {
  // 로그인
  LOGIN({ commit }, { email, password }) {
    return auth
      .login(email, password)
      .then(({ accessToken }) => commit("LOGIN", { accessToken }));
  },
  // 이메일 중복 체크
  CHECK_EMAIL({ commit }, { email }) {
    return auth.check_email(email);
  },
  // 회원 가입
  REGISTER({ commit }, { name, email, password }) {
    return auth.register(name, email, password);
  },
  // 보드 목록 조회
  FETCH_BOARD_LIST({ commit }) {
    return board.fetch().then(data => commit("SET_BOARD_LIST", data));
  },
  // 보드 상세 조회 : 해당 보드의 id를 fetch 함수에 전달하면 board 객체를 변이 함수에 전달
  FETCH_BOARD({ commit }, id) {
    return board.fetch(id).then(data => commit("SET_BOARD", data));
  },
  // 보드 생성 : item의 id값 반환
  ADD_BOARD(_, title) {
    return board.create(title).then(({ item }) => item.id);
  },
  // 보드 색상 변경
  UPDATE_BOARD({ state, dispatch }, { id, title, bgColor }) {
    return board
      .update(id, { title, bgColor })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 보드 삭제
  DELETE_BOARD(_, id) {
    return board.destroy(id);
  },
  // 리스트 생성
  ADD_LIST({ state, dispatch }, { title, boardId, pos }) {
    return list
      .create({ title, pos, boardId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 리스트 수정
  UPDATE_LIST({ state, dispatch }, { id, pos, title }) {
    return list
      .update(id, { pos, title })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 리스트 삭제
  DELETE_LIST({ state, dispatch }, { id, pos, title }) {
    return list
      .destroy(id, { pos, title })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 카드 조회 : 데이터를 받으면 상태를 추가하기 위해 변이 함수에 데이터 전달
  FETCH_CARD({ commit }, id) {
    return card.fetch(id).then(({ item }) => commit("SET_CARD", item));
  },
  // 카드 생성 : 생성 후 결과 화면 출력
  ADD_CARD({ state, dispatch }, { title, pos, listId }) {
    return card
      .create({ title, pos, listId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 카드 수정 : 수정 후 결과 화면 출력
  UPDATE_CARD({ state, dispatch }, { id, pos, title, description, listId }) {
    return card
      .update(id, { pos, title, description, listId })
      .then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
  // 카드 삭제 : 삭제 후 결과 화면 출력
  DELETE_CARD({ state, dispatch }, id) {
    return card.destroy(id).then(_ => dispatch("FETCH_BOARD", state.board.id));
  },
};

export default actions;
