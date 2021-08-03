import { REQUEST_STATUS } from '@/store/types';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MUTATIONS {
  GET_RECIPES_START = 'GET_RECIPES_START',
  GET_RECIPES_FAILED = 'GET_RECIPES_FAILED',
  GET_RECIPES_SUCCEEDED = 'GET_RECIPES_SUCCEEDED',
}

export const mutations: MutationTree<State> = {
  [MUTATIONS.GET_RECIPES_START]: (state) => {
    state.getRecipes.errors = [];
    state.getRecipes.status = REQUEST_STATUS.LOADING;
  },
  [MUTATIONS.GET_RECIPES_FAILED]: (state, errors: Error[]) => {
    state.getRecipes.status = REQUEST_STATUS.FAILED;
    state.getRecipes.errors = errors;
  },
  [MUTATIONS.GET_RECIPES_SUCCEEDED]: (state) => {
    state.getRecipes.status = REQUEST_STATUS.SUCCEEDED;
    state.getRecipes.errors = [];
  },
};
