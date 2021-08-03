import { RootState } from '@/store/state';
import { MutationTree, Store } from 'vuex';
import * as RecipeApi from '../../../api/Recipe';
import { createFakeStore } from '../../../../jest-helpers';
import { actions, ACTIONS as ACTION_TYPES } from './actions';
import { State } from './state';
import { MUTATIONS, mutations } from './mutations';

describe('Actions', () => {
  let fakeStore: Store<RootState>;
  let fakeMutations: MutationTree<State>;
  beforeEach(() => {
    fakeMutations = Object.keys(mutations)
      .reduce((acc, name) => {
        acc[name] = jest.fn();
        return acc;
      }, {} as MutationTree<State>);

    fakeStore = createFakeStore({
      mutations: fakeMutations,
      actions,
    });
  });
  describe('getRecipes', () => {
    it('commits a mutation to indicate the start of a request', () => {
      fakeStore.dispatch(ACTION_TYPES.GET_RECIPES);

      expect(fakeMutations[MUTATIONS.GET_RECIPES_START])
        .toHaveBeenCalledTimes(1);
    });
    it('commits a mutation to indicate the success of the request', async () => {
      jest.spyOn(RecipeApi, 'getRecipes')
        .mockImplementationOnce(() => Promise.resolve({
          config: {},
          data: [],
          headers: [],
          status: 200,
          statusText: 'OK',
        }));

      await fakeStore.dispatch(ACTION_TYPES.GET_RECIPES);

      expect(fakeMutations[MUTATIONS.GET_RECIPES_SUCCEEDED])
        .toHaveBeenCalledTimes(1);
    });
    it('commits a mutation to indicate the failure of the request', async () => {
      const fakeError = new Error('This broke');
      jest.spyOn(RecipeApi, 'getRecipes')
        .mockImplementationOnce(() => Promise.reject(fakeError));

      await fakeStore.dispatch(ACTION_TYPES.GET_RECIPES);

      expect(fakeMutations[MUTATIONS.GET_RECIPES_FAILED])
        .toHaveBeenCalledTimes(1);
      expect(fakeMutations[MUTATIONS.GET_RECIPES_FAILED])
        .toHaveBeenCalledWith({}, [fakeError]);
    });
    it('commits the recipes returned to the store', async () => {
      const recipes = [
        {
          id: 'e585b67c-cb09-47e6-bb39-a8d5494fc986',
          name: 'My Recipe',
          description: '',
          ingredients: [],
        },
      ];

      jest.spyOn(RecipeApi, 'getRecipes')
        .mockImplementationOnce(() => Promise.resolve({
          config: {},
          headers: [],
          status: 200,
          statusText: 'OK',
          data: recipes,
        }));

      await fakeStore.dispatch(ACTION_TYPES.GET_RECIPES);

      expect(fakeMutations[MUTATIONS.GET_RECIPES_SUCCEEDED])
        .toHaveBeenCalledWith({}, recipes);
    });
  });
});
