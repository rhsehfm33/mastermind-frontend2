import axios from "axios";
import router from "../router";

const domain = "http://localhost:3000";
const Unauthorized = 401;
const onUnauthorized = () => {
  router.push(`/users/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

const request = {
  get(path) {
    return axios.get(`${domain + path}`).catch(({ response }) => {
      const { status } = response;
      if (status === Unauthorized) return onUnauthorized();
      throw Error(response);
    });
  },
  post(path, data) {
    return axios.post(`${domain + path}`, data);
  },
  delete(path) {
    return axios.delete(`${domain + path}`);
  },
  put(path, data) {
    return axios.put(`${domain + path}`, data);
  },
};
// 인증 API
export const setAuthInHeader = token => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};
// 로그인 & 회원가입 API
export const auth = {
  login(email, password) {
    return request.post("/users/login", { email, password }).then(({ data }) => data);
  },
  // 이메일 중복 체크
  check_email(email) {
    return request.post("/users/check_email", { email }).then(({ data }) => data);
  },
  // 회원 가입
  register(name, email, password) {
    return request.post("/users/register", { name, email, password });
  },
};
// 보드 API
export const board = {
  fetch(id) {
    // id가 있는 경우 보드 상세 조회
    if (id) {
      return request.get(`/boards/${id}`).then(({ data }) => data);
    }
    // id가 없는 경우 보드 목록 조회
    return request.get("/boards").then(({ data }) => data);
  },
  // 보드 생성
  create(title) {
    return request.post("/boards", { title }).then(({ data }) => data);
  },
  // 보드 수정 : 색상 변경 api 요청
  update(id, data) {
    return request.put(`/boards/${id}`, data).then(({ data }) => data);
  },
  // 보드 삭제
  destroy(id) {
    return request.delete(`/boards/${id}`);
  },
};
// 리스트 API
export const list = {
  // 리스트 생성
  create(data) {
    return request.post(`/lists`, data);
  },
  // 리스트 수정
  update(id, data) {
    return request.put(`/lists/${id}`, data).then(({ data }) => data);
  },
  // 리스트 삭제
  destroy(id) {
    return request.delete(`/lists/${id}`).then(({ data }) => data);
  },
};
// 카드 API
export const card = {
  // 카드 상세 조회
  fetch(id) {
    return request.get(`/cards/${id}`).then(({ data }) => data);
  },
  // 카드 생성 : 제목, id, 위치 정보 전달
  create({ title, listId, pos }) {
    return request
      .post(`/cards`, { title, listId, pos })
      .then(({ data }) => data);
  },
  // 카드 수정 : 카드로 data 전달
  update(id, data) {
    return request.put(`/cards/${id}`, data).then(({ data }) => data);
  },
  // 카드 삭제
  destroy(id) {
    return request.delete(`/cards/${id}`);
  },
};
