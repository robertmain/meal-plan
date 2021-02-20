<template>
  <nav>
    <el-menu
      mode="horizontal"
      :default-active="$route.name"
      router
    >
      <el-menu-item>
        <img
          src="@/assets/logo.png"
          alt="Application logo"
        >
      </el-menu-item>
      <el-menu-item
        v-for="(route, index) in routes"
        :key="index"
        :index="route.routerConfig.name"
        :route="route.routerConfig"
      >
        <i :class="route.icon" /> {{ route.title }}
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<style lang="scss" scoped>
.el-menu-item img{
  height: 50px;
  width: 30px;
  object-fit: contain;
}
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
