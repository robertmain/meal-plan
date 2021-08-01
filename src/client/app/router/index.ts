import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import { MUTATIONS } from '@/store/modules/ui/mutations';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      icon: 'el-icon-house',
    },
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Recipes',
      icon: 'el-icon-user',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

router.afterEach(() => {
  store.commit(MUTATIONS.CLOSE_NAVBAR);
});

export default router;
