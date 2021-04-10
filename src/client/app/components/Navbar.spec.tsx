import Navbar from './Navbar.vue';
import Navmenu from './Navmenu.vue';
import { shallowRender } from '../../jest-helpers';

describe('Navbar', () => {
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
    expect(title.text()).toBe('Primary Secondary');
  });
  it('can display the navmenu', () => {
    const navbar = shallowRender(Navbar, undefined, {
      slots: {
        navmenu: Navmenu,
      }
    });

    expect(navbar.findComponent(Navmenu).exists()).toBeTruthy();
  });
});
