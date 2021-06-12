import Vuex from "vuex";
import Vue from "vue";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

// vuex의 store 객체를 생성
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

const { accessToken } = localStorage;
store.commit("LOGIN", { accessToken });

export default store;
