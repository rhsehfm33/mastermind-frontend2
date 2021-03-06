import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
});
