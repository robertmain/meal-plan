import { getRecipes } from '@/api/Recipe';
import { RootState } from '@/store/state';
import { ActionTree } from 'vuex';
import { MUTATIONS } from './mutations';
import { State } from './state';

export enum ACTIONS {
  GET_RECIPES = 'GET_RECIPES',
}

export const actions: ActionTree<State, RootState> = {
  [ACTIONS.GET_RECIPES]: async ({ commit }) => {
    commit(MUTATIONS.GET_RECIPES_START);
    try {
      const {
        data,
      } = await getRecipes();
      commit(MUTATIONS.GET_RECIPES_SUCCEEDED, data);
    } catch (e) {
      commit(MUTATIONS.GET_RECIPES_FAILED, [e]);
    }
  },
};
