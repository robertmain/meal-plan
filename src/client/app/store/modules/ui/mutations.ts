import { MutationTree } from 'vuex';
import { State } from './state';

export enum MUTATIONS {
  OPEN_NAVBAR = 'OPEN_NAVBAR',
  CLOSE_NAVBAR = 'CLOSE_NAVBAR',
}

export const mutations: MutationTree<State> = {
  [MUTATIONS.OPEN_NAVBAR]: (state) => {
    state.navbarOpen = true;
  },
  [MUTATIONS.CLOSE_NAVBAR]: (state) => {
    state.navbarOpen = false;
  },
};
