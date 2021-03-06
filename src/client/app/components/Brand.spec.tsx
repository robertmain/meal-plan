import Brand from './Brand.vue';
import { shallowRender } from '../../jest-helpers';

describe('Brand', () => {
  describe('logo', () => {
    it('hides the logo if one is not supplied', () => {
      const brand = shallowRender(Brand);

      expect(brand.find('img').exists()).toBeFalsy();
    })
    it('displays the app logo if one was supplied', () => {
      const brand = shallowRender(Brand, { logo: 'images/logo.png' });

      expect(brand.find('img').exists()).toBeTruthy();
      expect(brand.find('img').attributes('src')).toBe('images/logo.png');
    });
    describe('alt text', () => {
      it('describes the purpose of the logo', () => {
        const brand = shallowRender(Brand, {
          logo: 'images/logo.png',
          primary: 'Meal',
          secondary: 'Planner'
        });

        expect(brand.find('img').attributes('alt')).toBe('MealPlanner Logo');
      })
    })
  });
  describe('name', () => {
    it('contains the application name', () => {
      const brand = shallowRender(Brand, {
        primary: 'Meal',
        secondary: 'Planner'
      });

      expect(brand.find('h1').text()).toBe('MealPlanner');
    })
  });
});
