import { shallowRender, createFakeStore } from '../jest-helpers';
import App from './App.vue';
import { getters } from '@/store/modules/ui/getters';
import { MUTATIONS, mutations } from './store/modules/ui/mutations';
import { GetterTree, MutationTree, Store } from 'vuex';
import { State } from './store/modules/ui/state';
import { RootState } from './store/state';

describe('App component', () => {
  let fakeStore: Store<RootState>;
  let fakeGetters;
  let fakeMutations: MutationTree<State>;

  beforeEach(() => {
    fakeMutations = Object.keys(mutations)
    .reduce((acc, actionName) => {
      acc[actionName] = jest.fn();
      return acc;
    }, {} as MutationTree<State>);
    fakeGetters = Object.keys(getters)
    .reduce((acc, getterName) => {
      acc[getterName] = jest.fn();
      return acc;
    }, {})

    fakeStore = createFakeStore({
      getters: fakeGetters,
      mutations: fakeMutations,
    });
  });
  describe('menu toggle', () => {
    it('closes an open menu', () => {
      fakeGetters.isOpen.mockReturnValueOnce(true);

      const appComponent = shallowRender(App, undefined, {
        store: fakeStore,
      });

      appComponent.find('button').trigger('click');

      expect(fakeMutations[MUTATIONS.CLOSE_NAVBAR]).toHaveBeenCalled();
    });
    it('opens a closed menu', () => {
      fakeGetters.isOpen.mockReturnValueOnce(false);

      const appComponent = shallowRender(App, undefined, {
        store: fakeStore,
      });

      appComponent.find('button').trigger('click');

      expect(fakeMutations[MUTATIONS.OPEN_NAVBAR]).toHaveBeenCalled();
    });
  });
});
