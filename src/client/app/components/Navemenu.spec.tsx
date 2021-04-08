import Navmenu from './Navmenu.vue';
import { shallowRender } from '../../jest-helpers';
import { RouteConfig } from 'vue-router';

describe('Navmenu', () => {
  it('displays the links provided', () => {
    const links = [
      { name: 'home', path: '/' },
      { name: 'recipes', path: '/recipes' },
    ] as RouteConfig[];

    const navmenu = shallowRender(Navmenu, { links });

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
    });

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
    });

    const icon = navmenu.findAll('i');

    expect(icon.at(0).attributes()).toMatchObject({ class: home.meta.icon });
    expect(icon.at(1).attributes()).toMatchObject({ class: recipes.meta.icon });
  });
  describe('vertical orientation', () => {
    it('is collapsable', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'vertical',
        open: false,
      });
      expect(navmenu.classes()).not.toContain('open');
    });
    it('defaults to collapsed', () => {
      const navmenu = shallowRender(Navmenu);
      expect(navmenu.classes()).not.toContain('open');
    });
    it('can be opened', () => {
      const navmenu = shallowRender(Navmenu, {
        open: true,
      });
      expect(navmenu.classes()).toContain('open');
    });
  });
  describe('horizontal orientation', () => {
    it('is open by default', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'horizontal',
      });
      expect(navmenu.classes()).toContain('open');
    });
    it('cannot be collapsed', () => {
      const navmenu = shallowRender(Navmenu, {
        orientation: 'horizontal',
        open: false,
      });
      expect(navmenu.classes()).toContain('open');
    });
  });
});
