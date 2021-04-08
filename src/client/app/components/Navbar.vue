<template>
  <header>
    <slot name="logo" />
    <h2>
      <span class="primary">
        <slot name="primary" />
      </span>
      <span class="secondary">
        <slot name="secondary" />
      </span>
    </h2>
    <slot name="navmenu" />
  </header>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Navbar extends Vue { }
</script>
