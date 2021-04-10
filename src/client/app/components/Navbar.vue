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
    <slot name="toggle-button" />
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/breakpoints.scss';
header{
  padding: 0 var(--spacing-md);
  border-bottom: 1px solid var(--light-grey);
  min-height: 73px;
  display: grid;
  align-items: center;
  grid-template-columns: 30px max-content auto;
  @include for-tablet-landscape-up {
    grid-template-columns: 30px max-content max-content auto;
  }
  column-gap: var(--spacing-xs);
}
img{
  object-fit: contain;
  max-width: 100%;
}
.primary{
  color: var(--app-primary);
}
h1{
  font-size: var(--heading3-size);
  font-family: var(--heading-font-family);
  font-weight: bold;
  margin-right: var(--spacing-md);
}
button{
  justify-self: right;
  font-size: var(--paragraph-text-size-large);
  padding: var(--spacing-sm);
  display: initial;
  @include for-tablet-landscape-up { display: none;}
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Navbar extends Vue { }
</script>
