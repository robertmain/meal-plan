import App from './App.vue';
import {
  shallowMount,
  createLocalVue,
  VueClass,
} from '@vue/test-utils';
import { RouteConfig } from 'vue-router';

const localVue = createLocalVue();

const shallowRender = (
  component: VueClass<Vue>,
  $route: RouteConfig = { path: '/' }
) => shallowMount(
  component,
  {
    localVue,
    stubs: [
      'router-link',
      'router-view',
    ],
    mocks: {
      $route,
    },
  }
);

describe('App component', () => {
  describe('page title', () => {
    it('is copied from the route name', () => {
      const routeName = 'home';
      const appComponent = shallowRender(App, {
        path: '/home',
        name: routeName,
      });
      expect(appComponent.find('h1').text().toLowerCase())
        .toBe(routeName.toLowerCase());
    });

    it('is in title case', () => {
      const routeName = 'My Page';
      const appComponent = shallowRender(App, {
        path: '/home',
        name: routeName.toLowerCase(),
      });
      expect(appComponent.find('h1').text()).toBe(routeName);
    });

    it('defaults to empty string', () => {
      const appComponent = shallowRender(App, {
        path: '/home',
        name: undefined
      });
      expect(appComponent.find('h1').text()).toBe('');
    });
  });
});
