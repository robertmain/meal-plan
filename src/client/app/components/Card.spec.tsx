import Card from './Card.vue';
import { shallowRender } from '../../jest-helpers';

describe('Card', () => {
  it('renders any content provided', () => {
    const card = shallowRender(Card, undefined, undefined, {
      slots: {
        default: '<p>Hello world</p>',
      },
    });

    expect(card.find('p').exists()).toBeTruthy();
    expect(card.find('p').html()).toBe('<p>Hello world</p>');
  });
});
