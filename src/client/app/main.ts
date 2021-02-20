import Vue from 'vue';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Main,
  Menu,
  MenuItem,
  Submenu,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'reset.css';
import 'element-ui/lib/theme-chalk/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

[
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Main,
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
