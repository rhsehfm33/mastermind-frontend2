const state = {
  accessToken: null,
  boardList: [],
  // 보드 객체
  board: {
    lists: [],
  },
  // 카드 객체
  card: {},
  isAddBoard: false,
  isShowBoardMenu: false,
  // 상단 색깔 state : 기본값은 검은색
  navbarColor: "rgb(0,0,0)",
  // 배경화면 색깔 state : 기본값은 하얀색
  bodyColor: "rgb(255,255,255)",
};

export default state;
