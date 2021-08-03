import { REQUEST_STATUS } from '@/store/types';
import { MUTATIONS, mutations } from './mutations';
import { State } from './state';

const {
  [MUTATIONS.GET_RECIPES_START]: getRecipesStart,
  [MUTATIONS.GET_RECIPES_FAILED]: getRecipesError,
} = mutations;

describe('Mutations', () => {
  describe(MUTATIONS.GET_RECIPES_START, () => {
    it('clears any previously raised errors', () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: REQUEST_STATUS.IDLE,
          errors: [new Error()],
        },
      };

      getRecipesStart(state);

      expect(state.getRecipes.errors.length).toBe(0);
    });
    it('sets the request status to ' + REQUEST_STATUS.LOADING, () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: REQUEST_STATUS.IDLE,
          errors: [],
        },
      };

      getRecipesStart(state);

      expect(state.getRecipes.status).toBe(REQUEST_STATUS.LOADING);
    });
  });
  describe(MUTATIONS.GET_RECIPES_FAILED, () => {
    it('sets the request status to ' + REQUEST_STATUS.FAILED, () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: REQUEST_STATUS.IDLE,
          errors: [],
        },
      };

      getRecipesError(state, [new Error('An error occurred')]);

      expect(state.getRecipes.status).toBe(REQUEST_STATUS.FAILED);
    });
    it('sets the errors recieved in state', () => {
      const state: State = {
        recipes: [],
        getRecipes: {
          status: REQUEST_STATUS.IDLE,
          errors: [],
        },
      };

      const errors = [
        new Error('An error occurred'),
        new Error('Another error'),
      ];

      getRecipesError(state, errors);

      expect(state.getRecipes.errors).toBe(errors);
    });
  });
});
