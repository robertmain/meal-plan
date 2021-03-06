import {
  shallowMount,
  createLocalVue,
  VueClass,
  Wrapper,
} from '@vue/test-utils';
import { RouteConfig } from 'vue-router';

const localVue = createLocalVue();

export const shallowRender = (
  component: VueClass<Vue>,
  props: Record<string, unknown> = {},
  $route: RouteConfig = { path: '/' }
): Wrapper<Vue> => shallowMount(
  component,
  {
    propsData: props,
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
