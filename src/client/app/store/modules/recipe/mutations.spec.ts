import { AJAX_STATUS } from '@/store/types';
import { MUTATIONS, mutations } from './mutations';
import { State } from './state';

const {
  [MUTATIONS.GET_RECIPES_START]: ajaxStart,
  [MUTATIONS.GET_RECIPES_FAILED]: ajaxError,
} = mutations;

describe('Mutations', () => {
  describe(MUTATIONS.GET_RECIPES_START, () => {
    it('clears any previously raised errors', () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: AJAX_STATUS.IDLE,
          errors: [new Error()],
        },
      };

      ajaxStart(state);

      expect(state.getRecipes.errors.length).toBe(0);
    });
    it('sets the ajax status to ' + AJAX_STATUS.LOADING, () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: AJAX_STATUS.IDLE,
          errors: [],
        },
      };

      ajaxStart(state);

      expect(state.getRecipes.status).toBe(AJAX_STATUS.LOADING);
    });
  });
  describe(MUTATIONS.GET_RECIPES_FAILED, () => {
    it('sets the ajax status to ' + AJAX_STATUS.FAILED, () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: AJAX_STATUS.IDLE,
          errors: [],
        },
      };

      ajaxError(state, [new Error('An error occurred')]);

      expect(state.getRecipes.status).toBe(AJAX_STATUS.FAILED);
    });
    it('sets the errors recieved in state', () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: AJAX_STATUS.IDLE,
          errors: [],
        },
      };

      const errors = [
        new Error('An error occurred'),
        new Error('Another error'),
      ];

      ajaxError(state, errors);

      expect(state.getRecipes.errors).toBe(errors);
    });
  });
});
