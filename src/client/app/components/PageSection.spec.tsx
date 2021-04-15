import PageSection from './PageSection.vue';
import { shallowRender } from '../../jest-helpers';

describe('Page Section', () => {
  describe('title', () => {
    it('contains the section title', () => {
      const pageSection = shallowRender(PageSection, { title: 'Hello World' });

      expect(pageSection.find('h2').exists()).toBeTruthy();
      expect(pageSection.find('h2').text()).toBe('Hello World');
    });
    it('is hidden if no title is supplied', () => {
      const pageSection = shallowRender(PageSection);

      expect(pageSection.find('h2').exists()).toBeFalsy();
    });
  });
  it('renders any content provided', () => {
    const pageSection = shallowRender(PageSection, undefined, {
      slots: {
        default: '<div />',
      },
    });

    expect(pageSection.find('div').exists()).toBeTruthy();
  });
  it('allows the background color to be changed', () => {
    const pageSection = shallowRender(PageSection, {
      backgroundColor: 'red',
    });

    expect(pageSection.attributes('style')).toBe('background-color: red;');
  });
});
