<template>
  <header>
    <slot name="logo" />
    <h1>
      <span class="primary">
        <slot name="primary" />
      </span>
      <span class="secondary">
        <slot name="secondary" />
      </span>
    </h1>
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
