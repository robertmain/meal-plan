import Navmenu from './Navmenu.vue';
import { shallowRender, createFakeStore } from '../../jest-helpers';
import { RouteConfig } from 'vue-router';
import { getters } from '@/store/modules/ui/getters';
import { actions } from '@/store/modules/ui/actions';
import { MutationTree, Store } from 'vuex';
import { RootState } from '@/store/state';
import { State } from '@/store/modules/ui/state';

describe('Navmenu', () => {
  let fakeStore: Store<RootState>;
  let fakeGetters: any;
  let fakeMutations: MutationTree<State>;

  beforeEach(() => {
    fakeMutations = Object.keys(actions)
    .reduce((acc, actionName) => {
      acc[actionName] = jest.fn();
      return acc;
    }, {});
    fakeGetters = Object.keys(getters)
    .reduce((acc, getterName) => {
      acc[getterName] = jest.fn();
      return acc;
    }, {});

    fakeStore = createFakeStore({
      getters: fakeGetters,
      mutations: fakeMutations,
    });
  });
  it('displays the links provided', () => {
    const links = [
      { name: 'home', path: '/' },
      { name: 'recipes', path: '/recipes' },
    ] as RouteConfig[];

    const navmenu = shallowRender(Navmenu, { links }, { store: fakeStore });

    expect(navmenu.findAll('li router-link-stub')).toHaveLength(links.length);
  });
  it('displays the link title if supplied', () => {
    const [
      home,
      recipes,
    ] = [
      {
        name: 'home',
        path: '/',
        meta: {
          title: 'Home'
        },
      },
      {
        name: 'recipes',
        path: '/recipes',
        meta: {
          title: 'Recipes'
        },
      },
    ] as RouteConfig[];

    const navmenu = shallowRender(Navmenu, {
      links: [home, recipes],
    }, { store: fakeStore });

    expect(navmenu.text()).toContain(home.meta.title);
    expect(navmenu.text()).toContain(recipes.meta.title);
  });
  it('displays the link icon if supplied', () => {
    const [
      home,
      recipes,
    ] = [
      {
        name: 'home',
        path: '/',
        meta: {
          icon: 'house-icon',
        },
      },
      {
        name: 'recipes',
        path: '/recipes',
        meta: {
          icon: 'recipe-icon',
        },
      },
    ] as RouteConfig[];

    const navmenu = shallowRender(Navmenu, {
      links: [home, recipes],
    }, { store: fakeStore });

    const icon = navmenu.findAll('i');

    expect(icon.at(0).attributes()).toMatchObject({ class: home.meta.icon });
    expect(icon.at(1).attributes()).toMatchObject({ class: recipes.meta.icon });
  });
  describe('vertical orientation', () => {
    it('is collapsable', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'vertical',
        open: false,
      }, { store: fakeStore });
      expect(navmenu.classes()).not.toContain('open');
    });
    it('defaults to collapsed', () => {
      const navmenu = shallowRender(Navmenu, undefined, {
        store: fakeStore,
      });
      expect(navmenu.classes()).not.toContain('open');
    });
    it('can be opened', () => {
      fakeGetters.isOpen.mockReturnValueOnce(true);
      const navmenu = shallowRender(Navmenu, undefined, {
        store: fakeStore,
      });
      expect(navmenu.classes()).toContain('open');
    });
  });
  describe('horizontal orientation', () => {
    it('is open by default', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'horizontal',
      }, { store: fakeStore });
      expect(navmenu.classes()).toContain('open');
    });
    it('cannot be collapsed', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'horizontal',
        open: false,
      }, { store: fakeStore });
      expect(navmenu.classes()).toContain('open');
    });
  });
});
