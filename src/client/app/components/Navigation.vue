<template>
  <nav>
    <Brand
      :logo="require('@/assets/logo.png')"
      :primary="primary"
      :secondary="secondary"
      class="brand"
    />
    <el-button
      icon="el-icon-menu"
      type="default"
      plain
    />
    <ul>
      <li v-for="route in routes" :key="route.name">
        <router-link :to="{ name: route.name }" exact="exact">
          <i :class="route.meta.icon" /> {{ route.meta.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/breakpoints.scss';
nav{
  display: grid;
  grid-template-columns: max-content auto;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  .brand {
    margin: var(--spacing-md) 0px var(--spacing-md) var(--spacing-md);
    @include for-tablet-landscape-up {
      margin: var(--spacing-md) 0px var(--spacing-md) var(--spacing-md);
    }
  }
  button{
    justify-self: right;
    padding: var(--spacing-xs) var(--spacing-sm);
    margin-right: var(--spacing-md);
    font-size: var(--paragraph-text-size-large);
    @include for-tablet-landscape-up {
      display: none;
    }
  }
  ul{
    display: none;
    margin-left: var(--spacing-lg);
    grid-auto-columns: max-content;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--spacing-lg);
    height: 100%;
    align-items: stretch;
    @include for-tablet-landscape-up {
      display: grid;
    }
    li{
      a{
        height: 100%;
        font-family: 'Open Sans';
        text-decoration: none;
        color: var(--text-dark);
        height: 100%;
        text-align: center;
        display: grid;
        align-content: center;
        color: #999;
        font-size: var(--paragraph-text-size-nprmal);
        &.router-link-active{
          color: var(--app-secondary);
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Button } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import Brand from '@/components/Brand.vue';
import { RouteConfig } from 'vue-router';
import { routes } from '../router/index';

@Component({
  components: {
    'el-button': Button,
    Brand,
  },
})
export default class MyRecipes extends Vue {
  private primary: string;

  private secondary: string;

  public constructor() {
    super();
    ([
      this.primary,
      this.secondary,
    ] = process.env.APP_NAME.split(' '));
  }

  private get routes(): RouteConfig[] {
    return routes;
  }
}
</script>
