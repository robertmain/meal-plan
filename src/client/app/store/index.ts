import Vue from 'vue';
import Vuex from 'vuex';
import { UserInterface } from './modules/ui';
import { Recipe } from './modules/recipe';
import { RootState } from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: new RootState(),
  modules: {
    UserInterface,
    Recipe,
  },
});
