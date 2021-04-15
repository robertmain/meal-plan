<template>
  <div>
    <navbar>
      <img
        :src="require('@/assets/logo.png')"
        :alt="primary + secondary + ' logo'"
        slot="logo"
      >
      <template #primary>{{ primary }}</template>
      <template #secondary>{{ secondary }}</template>
      <navmenu
        orientation="horizontal"
        :links="links"
        slot="navmenu"
        id="horizontal-menu"
      />
      <button
        slot="toggle-button"
        class="el-button"
        @click="toggleMenu"
      >
        <i class="el-icon-menu" />
      </button>
    </navbar>
    <navmenu
      :links="links"
      id="vertical-menu"
      :open="menuOpen"
    />
    <router-view />
  </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navmenu from '@/components/Navmenu.vue';
import Navbar from '@/components/Navbar.vue';
import { routes } from '@/router/index';
import { RouteConfig } from 'vue-router';

@Component({
  components: {
    Navmenu,
    Navbar,
  },
})
export default class App extends Vue {
  private menuOpen = false;

  private primary = '';

  private secondary = '';

  private get links(): RouteConfig[] {
    return routes;
  }

  private toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  private mounted() {
    const [primary, secondary] = process.env.APP_NAME.split(' ');

    this.primary = primary;
    this.secondary = secondary;
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@500;900&display=swap');
@import '@/assets/scss/breakpoints.scss';
*{ box-sizing: border-box; }

#horizontal-menu{
  display: none;
  @include for-tablet-landscape-up { display: grid;}
}

#vertical-menu{
  display: grid;
  @include for-tablet-landscape-up { display: none;}
}

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
