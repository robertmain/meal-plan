<template>
  <div id="app">
    <nav>
      <navmenu :links="links" />
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navmenu from '@/components/Navmenu.vue';
import { routes } from '@/router/index';
import { RouteConfig } from 'vue-router';

@Component({
  components: {
    Navmenu,
  },
})
export default class App extends Vue {
  private get links(): RouteConfig[] {
    return routes;
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500;900&display=swap');
*{ box-sizing: border-box; }

body {
  p, li, h1, h2, h3, h4, h5, h6{
    color: var(--text-dark);
  }
  p, li{
    font-family: var(--body-font-family);
    font-size: var(--paragraph-text-size-normal);
  }
  h1, h2, h3, h4, h5, h6{
    font-family: var(--heading-font-family);
  }
  p{
    &:last-of-type{
      margin-bottom: 0px;
    }
  }
}

</style>
