import Vue from 'vue';
import {
  Menu, MenuItem, Submenu, Icon,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'reset.css';
import 'element-ui/lib/theme-chalk/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

[
  Icon,
  Menu,
  MenuItem,
  Submenu,
].forEach((component) => {
  Vue.component(component.name, component);
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
