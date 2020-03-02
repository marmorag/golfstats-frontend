import Vue from 'vue';
import router from './plugins/router';
import map from './plugins/map';
import vuetify from './plugins/vuetify';
import store from './plugins/store/store';
import './plugins/cookies';
import './plugins/sentry';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  vuetify,
  store,
  map,
  render: (h) => h(App)
}).$mount('#app');

if (window.Cypress) {
  window.app = app;
}