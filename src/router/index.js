import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Login from "../components/user/Login.vue";
import Register from "../components/user/Register.vue";
import Board from "../components/Board";
import Card from "../components/Card";
import NotFound from "../components/NotFound";
import store from "../store";

// 0. VueRouter 라이브러리 사용
Vue.use(VueRouter);

// 인가된 사용자인지 확인
const requireAuth = () => (from, to, next) => {
  !!store.state.accessToken
    ? next()
    : next(`/login?returnPath=${encodeURIComponent(from.path)}`);
};

// 1. 라우터를 정의하고 import한 라우트 컴포넌트를 각 라우터와 매핑
// component는 Vue.extend()를 통해 만들어진 실제 컴포넌트 생성자나 컴포넌트 옵션 객체
const routes = [
  // 요청 주소가 바뀔 때마다 beforeEnter 훅 실행
  { path: "/", component: Home, beforeEnter: requireAuth() },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/board/:id",
    component: Board,
    // 요청 주소가 바뀔 때마다 beforeEnter 훅 실행
    beforeEnter: requireAuth(),
    children: [{ path: "card/:cid", component: Card }],
  },
  { path: "*", component: NotFound },
];

// 2. routes 옵션과 함께 router 인스턴스 생성
export default new VueRouter({
  // `routes: routes`의 줄임
  routes,
});
