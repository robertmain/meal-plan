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
});
