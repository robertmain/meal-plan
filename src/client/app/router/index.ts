import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
      icon: 'el-icon-house',
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/recipes',
    name: 'recipes',
    meta: {
      title: 'Recipes',
      icon: 'el-icon-fork-spoon',
    },
    component: () => import('@/views/Recipes.vue'),
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

export default router;
