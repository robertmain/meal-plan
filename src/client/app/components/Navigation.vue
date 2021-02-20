<template>
  <nav>
    <el-menu default-active="1" mode="horizontal">
      <el-menu-item>
        <img
          src="@/assets/logo.png"
          alt="Application logo"
        >
      </el-menu-item>
      <router-link
        v-for="(route, index) in routes"
        class="el-menu-item"
        :key="index"
        :to="route.routerConfig"
        exact-active-class="is-active"
      >
        <i :class="route.icon" /> {{ route.title }}
      </router-link>
    </el-menu>
  </nav>
</template>

<style lang="scss" scoped>
img { max-height: 50px }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { },
})
export default class MyRecipes extends Vue {
  private routes = [
    {
      title: 'Home',
      icon: 'el-icon-house',
      routerConfig: { name: 'home' },
    },
    {
      title: 'Recipes',
      icon: 'el-icon-fork-spoon',
      routerConfig: { name: 'recipes' },
    },
  ];
}
</script>
