import Navbar from './Navbar.vue';
import { createFakeStore, shallowRender } from '../../jest-helpers';
import { getters } from '@/store/modules/ui/getters';
import { mutations } from '@/store/modules/ui/mutations';
import { MutationTree, Store } from 'vuex';
import { RootState } from '@/store/state';
import { State } from '@/store/modules/ui/state';
import { shallowMount } from '@vue/test-utils';


describe('Navbar', () => {
  let fakeStore: Store<RootState>;
  let fakeGetters;
  let fakeMutations: MutationTree<State>;

  beforeEach(() => {
    fakeMutations = Object.keys(mutations)
    .reduce((acc, val) => {
      acc[val] = jest.fn();
      return acc;
    }, {});
    fakeGetters = Object.keys(getters)
    .reduce((acc, val) => {
      acc[val] = jest.fn();
      return acc;
    }, {})

    fakeStore = createFakeStore({
      getters: fakeGetters,
      mutations: fakeMutations,
    });
  })
  it('can display the application logo', () => {
    const navbar = shallowRender(Navbar, undefined, {
      slots: {
        logo: '<img src="" />',
      }
    });
    expect(navbar.find('img').exists()).toBeTruthy();
  });
  it('can display the application title', () => {
    const navbar = shallowRender(Navbar, undefined, {
      slots: {
        primary: 'Primary',
        secondary: 'Secondary',
      }
    });
    const title = navbar.find('h1');

    expect(title.exists()).toBeTruthy();
    expect(title.text()).toBe('PrimarySecondary');
  });
  it('can display the navmenu', () => {
    /**
     * @todo refactor this test
     */
    const navbar = shallowMount(Navbar, {
      slots: {
        navmenu: { template: '<ul></ul>' },
      },
      store: fakeStore,
    });
    expect(navbar.find('ul')).toBeTruthy();
  });
});
