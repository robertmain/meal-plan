import {
  shallowMount,
  createLocalVue,
  VueClass,
  Wrapper,
  MountOptions,
} from '@vue/test-utils';
import VueX, { Store, StoreOptions } from 'vuex';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VueX);

export const createFakeStore = (
  opts: StoreOptions<unknown>
): Store<unknown> => new VueX.Store({
  ...opts,
});

export const shallowRender = (
  component: VueClass<Vue>,
  props: Record<string, unknown> = {},
  mountOptions: Partial<MountOptions<Vue>> = {}
// eslint-disable-next-line max-params
): Wrapper<Vue> => shallowMount(component, {
  propsData: props,
  localVue,
  stubs: ['router-link', 'router-view'],
  ...mountOptions,
});
