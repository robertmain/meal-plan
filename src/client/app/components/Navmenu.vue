<template>
  <ul
    :class="{
      horizontal: isHorizontal,
      open: isOpen,
    }"
  >
    <li
      v-for="link in links"
      :key="link.name"
    >
      <router-link
        :to="{ name: link.name }"
        exact="exact"
        tag="a"
      >
        <i
          v-if="link.meta && link.meta.icon"
          :class="link.meta.icon"
        />
        <span v-if="link.meta && link.meta.title">
          {{ link.meta.title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul{
  display: grid;
  grid-auto-flow: row;
  overflow: hidden;
  animation-duration: 3s;
  max-height: 0px;
  transition: max-height 0.5s ease-in-out;
  background-color: var(--dirty-white);
  li{
    a{
      width: 100%;
      text-decoration: none;
      padding: var(--spacing-md);
      float: left;
      font-size: var(--paragraph-text-size-normal);
      color: var(--text-dark-muted);
      border-bottom: 1px solid var(--light-grey);
      &.router-link-exact-active{
        color: var(--text-dark);
      }
    }
  }
  &.open{
    max-height: 114px;
  }
  &.horizontal{
    grid-auto-flow: column;
    background-color: white;
    li{
      a{
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        text-align: center;
        border-bottom: none;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

export enum ORIENTATION {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

@Component({})
export default class Navmenu extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  public links: RouteConfig[];

  @Prop({
    type: String,
    validator: (val) => Object.values(ORIENTATION).includes(val),
    default: ORIENTATION.VERTICAL,
  })
  public orientation: ORIENTATION;

  private get isHorizontal(): boolean {
    return this.orientation === ORIENTATION.HORIZONTAL;
  }

  private get isOpen(): boolean {
    return (this.isHorizontal) ? true : this.$store.getters.isOpen;
  }
}
</script>
