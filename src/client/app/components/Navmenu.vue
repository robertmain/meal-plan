<template>
  <ul>
    <li v-for="link in links" :key="link.name">
      <router-link :to="{ name: link.name }" exact="exact" tag="a">
        <i v-if="link.meta && link.meta.icon" :class="link.meta.icon"/>
        <span v-if="link.meta && link.meta.title">
          {{ link.meta.title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li{
  a{
    text-decoration: none;
    padding: var(--spacing-md);
    display: inline-block;
    width: 100%;
    font-size: var(--paragraph-text-size-normal);
    color: var(--text-dark-muted);
    border-bottom: 1px solid var(--light-grey);
    &.router-link-exact-active{
      color: var(--text-dark);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component({})
export default class Navmenu extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  public links: RouteConfig[];
}
</script>
