import { Store, Action } from 'vuex';
import { shallowRender } from '../jest-helpers';
import App from './App.vue';

describe('App component', () => {
  describe('menu toggle', () => {
    it('closes an open menu', () => {
      const appComponent = shallowRender(App, undefined, {
        data: () => ({
          menuOpen: true,
        }),
      });

      appComponent.find('button').trigger('click');

      expect(appComponent.vm['menuOpen']).toBe(false);
    });
    it('opens a closed menu', () => {
      const appComponent = shallowRender(App, undefined, {
        data: () => ({
          menuOpen: false,
        }),
      });

      appComponent.find('button').trigger('click');

      expect(appComponent.vm['menuOpen']).toBe(true);
    });
  });
});
